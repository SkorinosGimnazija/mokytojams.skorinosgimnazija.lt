import React from 'react';

interface Props {
  error: { code: string; message: string };
}

export const Error: React.FC<Props> = ({ error }) => {
  console.error(error.message);

  return (
    <>
      <div className="flex items-center justify-center h-full divide-x-4 divide-accent">
        <h2 className="pr-4 text-3xl">{error.code}</h2>
        <span className="pl-4">
          {error.code === '404' ? 'Page not found' : 'Something went wrong...'}
        </span>
      </div>
    </>
  );
};
