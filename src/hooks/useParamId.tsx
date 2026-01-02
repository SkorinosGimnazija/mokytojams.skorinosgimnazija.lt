import { useParams } from 'react-router'

export function useParamId() {
  const { id } = useParams<{ id: any }>()
  return { id, isEdit: id != null }
}