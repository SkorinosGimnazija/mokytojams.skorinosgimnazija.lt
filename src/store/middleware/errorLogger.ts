import type { ProblemDetails } from '@/services/generatedApi.ts'
import { errorNotification } from '@/utils/notifications.ts'
import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { isRejectedWithValue } from '@reduxjs/toolkit'

type Payload = {
  status: string | number
  data?: ProblemDetails
}

const defaultStatusMessages: Record<number, string> = {
  404: 'Puslapis nerastas',
  500: 'Serverio klaida',
}

export const rtkQueryErrorLogger: Middleware =
  (_api: MiddlewareAPI) => (next) => (action) => {

    if (isRejectedWithValue(action)) {
      const payload = action.payload as Payload
      const status = Number(payload.status) || 500
      const details = payload.data

      errorNotification({
        title: `Klaida! (${status})`,
        message: defaultStatusMessages[status] ?? details?.title
      })

      if (details?.errors) {
        for (const error of details.errors) {
          errorNotification({ message: error.reason })
        }
      }
    }

    return next(action)
  }