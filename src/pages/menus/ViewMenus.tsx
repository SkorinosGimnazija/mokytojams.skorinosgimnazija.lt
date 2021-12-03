import React from 'react';
import { SquareLoader } from '../../components/loadingSpinners/SquareLoader';
import { useGetMenusQuery } from '../../services/api';

export default function ViewMenus() {
  const menusQuery = useGetMenusQuery(undefined, { refetchOnMountOrArgChange: true });

  if (menusQuery.isLoading) {
    return <SquareLoader />;
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
