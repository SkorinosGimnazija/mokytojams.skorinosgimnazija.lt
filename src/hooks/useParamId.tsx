import { useParams } from 'react-router-dom';

export const useParamId = () => {
  const { id } = useParams();
  return Number(id);
};
