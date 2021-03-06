import toast from 'react-hot-toast';

const loadImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.addEventListener('load', () => resolve(img));
    img.addEventListener('error', (err) => toast.error(err.message));
    img.src = url;
  });
};

export const useImageInfo = () => {
  const getImageDimensions = async (image: string | File) => {
    if (typeof image === 'string') {
      return loadImage(`${process.env.REACT_APP_STATIC_URL}/${image}`).then((x) => {
        return { width: x.naturalWidth, height: x.naturalHeight };
      });
    } else {
      return loadImage(URL.createObjectURL(image)).then((x) => {
        URL.revokeObjectURL(x.src);
        return { width: x.naturalWidth, height: x.naturalHeight };
      });
    }
  };

  return { getImageDimensions };
};
