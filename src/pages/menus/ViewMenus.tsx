import React from 'react';
import { CircularSpinner } from '../../components/loadingSpinners/CircularSpinner';
import { useGetMenusQuery } from '../../services/api';

export default function ViewMenus() {
  const menusQuery = useGetMenusQuery(undefined, { refetchOnMountOrArgChange: true });

  if (menusQuery.isLoading) {
    return <CircularSpinner />;
  }

  return (
    <div>
      {menusQuery.data
        ?.filter((x) => !x.parentMenuId)
        ?.map((x) => {
          return (
            <li key={x.id}>
              {x.title} {x.order}
            </li>
          );
        })}
    </div>
  );
}
