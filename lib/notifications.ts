import toast from 'react-hot-toast';

export const error = (message: string, exception?: unknown) => {
  toast.error(message, { duration: 8000 });

  if (exception) {
    console.error(exception);
  }
};

export const success = (message: string) => {
  toast.success(message);
};
