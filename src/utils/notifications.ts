import { showNotification } from '@mantine/notifications'

type TitleOrMessage = { title: string; message?: string } | { title?: string; message: string };

export function successNotification({ title, message }: TitleOrMessage) {
  showNotification({
    // color: 'var(--mantine-color-green-filled)',
    title,
    message,
    autoClose: 3000
  })
}

export function errorNotification({ title, message }: TitleOrMessage) {
  showNotification({
    color: 'var(--mantine-color-red-filled)',
    title,
    message,
    autoClose: 5000
  })
}

export function itemSavedNotification() {
  successNotification({ title: 'Išsaugota' })
}

export function validationErrorNotification() {
  errorNotification({ title: 'Klaida', message: 'Neteisingai įvesti duomenys' })
}