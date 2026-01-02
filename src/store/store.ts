import { generatedApi } from '@/services/generatedApi.ts'
import { authSlice, resetAuthState, setAuthState } from '@/store/authSlice.ts'
import { rtkQueryErrorLogger } from '@/store/middleware/errorLogger.ts'
import { getFromLocalStorage, removeFromLocalStorage, saveToLocalStorage } from '@/utils/storage.ts'
import { configureStore, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

const listenerMiddleware = createListenerMiddleware()

export const store = configureStore({
  reducer: {
    [authSlice.name]: authSlice.reducer,
    [generatedApi.reducerPath]: generatedApi.reducer,
  },
  preloadedState: {
    [authSlice.name]: getFromLocalStorage(authSlice.name),
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(generatedApi.middleware)
      .concat(rtkQueryErrorLogger)
  },
})

setupListeners(store.dispatch)

listenerMiddleware.startListening({
  matcher: isAnyOf(
    generatedApi.endpoints.login.matchFulfilled,
    authSlice.actions.setAuthState.match),
  effect: (_action, listenerApi) => {
    const state = listenerApi.getState() as RootState
    saveToLocalStorage(authSlice.name, state[authSlice.name])
  }
})

listenerMiddleware.startListening({
  matcher: isAnyOf(
    generatedApi.endpoints.logout.matchFulfilled,
    authSlice.actions.resetAuthState.match),
  effect: () => {
    removeFromLocalStorage(authSlice.name)
  }
})

window.addEventListener('storage', ({ key, newValue }) => {
  if (key !== authSlice.name) {
    return
  }

  if (!newValue) {
    store.dispatch(resetAuthState())
    return
  }

  try {
    const auth = JSON.parse(newValue) as RootState[typeof authSlice.name]
    store.dispatch(setAuthState(auth))
  } catch {
    store.dispatch(resetAuthState())
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// todo delete later
removeFromLocalStorage('persist:user')