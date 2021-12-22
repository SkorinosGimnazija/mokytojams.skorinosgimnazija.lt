import toast from 'react-hot-toast';

export const itemSavedToast = () => {
  toast.success('Išsaugota');
};

export const errorToast = (text?: string | null) => {
  toast.error(text ?? 'Klaida');
};
