import { itemSavedNotification } from '@/utils/notifications.ts'
import type { BaseQueryFn, TypedMutationTrigger } from '@reduxjs/toolkit/query/react'
import { useNavigate } from 'react-router'

const defaultOptions = {
  redirect: true,
  redirectPath: '..',
  notification: true,
}

type RequestParams<TData, TResponse> = {
  createRecord?: TypedMutationTrigger<TResponse, Omit<TData, 'id'>, BaseQueryFn>
  updateRecord?: TData extends { id: unknown }
    ? TypedMutationTrigger<TResponse, TData, BaseQueryFn>
    : never
  data: TData
}

export function useRequestHandler(options?: Partial<typeof defaultOptions>) {
  const navigate = useNavigate()

  return async <TData, TResponse>(
    { createRecord, updateRecord, data }: RequestParams<TData, TResponse>
  ): Promise<TResponse | null> => {
    const mergedOptions = { ...defaultOptions, ...options }
    const { id, ...dataWithoutId } = data as TData & { id?: unknown }
    const response = id != null ? await updateRecord!(data) : await createRecord!(Array.isArray(data) ? data : dataWithoutId)

    if ('error' in response) {
      console.warn(response.error)
      return null
    }

    if (mergedOptions.notification) {
      itemSavedNotification()
    }

    if (mergedOptions.redirect) {
      navigate(
        { pathname: mergedOptions.redirectPath },
        { relative: 'path', viewTransition: true, preventScrollReset: true })
    }

    return response.data
  }
}