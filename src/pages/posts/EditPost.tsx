import React from 'react';
import { useLocation, useParams } from 'react-router';
import { useAuth } from '../../hooks/useAuth';

export const EditPost = () => {
  const params = useParams<{ id: string }>();

  return <div>Edit post {params.id}</div>;
};
