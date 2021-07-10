import React from 'react';
import { Error } from '../components/Error';

const NotFound = () => {
  return <Error error={{ code: '404', message: 'Page not found' }} />;
};

export default NotFound;
