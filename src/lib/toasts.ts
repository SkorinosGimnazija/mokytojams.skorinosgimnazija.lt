import toast from 'react-hot-toast';

export const itemSavedToast = () => {
  successToast('Išsaugota');
};

export const errorToast = (text?: string | null) => {
  toast.error(text ?? 'Klaida');
};

export const successToast = (text: string) => {
  toast.success(text);
};
