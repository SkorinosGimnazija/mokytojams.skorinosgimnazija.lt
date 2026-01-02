import type { authSlice } from '@/store/authSlice.ts'
import { resetAuthState, setAuthState } from '@/store/authSlice.ts'
import type { RootState } from '@/store/store.ts'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs } from '@reduxjs/toolkit/query/react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_APP_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, api) => {
    const token = (api.getState() as RootState).auth.token
    headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})

const refreshTokenArgs: FetchArgs = {
  url: '/auth/refresh-token',
  method: 'POST'
} as const

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error?.status === 401) {
    await navigator.locks.request(refreshTokenArgs.url, { ifAvailable: true }, async (lock) => {
      if (!lock) {
        // just retry the original request since token refresh should be done
        return navigator.locks.request(refreshTokenArgs.url, async () => {
          result = await baseQuery(args, api, extraOptions)
        })
      }

      const refreshResult = await baseQuery(refreshTokenArgs, api, extraOptions)

      if (refreshResult.data) {
        api.dispatch(setAuthState(refreshResult.data as RootState[typeof authSlice.name]))
        result = await baseQuery(args, api, extraOptions)
      } else {
        api.dispatch(resetAuthState())
      }
    })
  }

  return result
}

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 10 * 60, // 10 min
  endpoints: () => ({}),
})