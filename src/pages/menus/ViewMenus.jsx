import React from 'react';
import { SquareLoader } from '../../components/loadingSpinners/SquareLoader';
import { useGetMenusQuery } from '../../services/generated.api';

export const ViewMenus = () => {
  const menusQuery = useGetMenusQuery({}, { refetchOnMountOrArgChange: true });

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
              {x.name} {x.order}
            </li>
          );
        })}
    </div>
  );
};
