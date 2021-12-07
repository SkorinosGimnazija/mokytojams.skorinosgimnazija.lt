import { Link, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  useDeleteMenuMutation,
  useDeletePostMutation,
  usePatchPostMutation,
} from '../../services/api';
import { MenuDto, PostDto, PostPatchDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { FeatureButton } from '../buttons/FeatureButton';
import { PublishButton } from '../buttons/PublishButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends DefaultTableProps {
  data?: MenuDto[];
}

export const MenusList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const [deleteMenu, { isLoading: deleteLoading }] = useDeleteMenuMutation();

  const handleDelete = (id: number) => {
    deleteMenu({ id });
  };

  return (
    <>
      <DefaultTable {...props} isLoading={isLoading || deleteLoading}>
        <TableHead>
          <TableRow>
            <TableCell width="60px"></TableCell>
            <TableCell>Title</TableCell>
            <TableCell width="200px" align="right">
              Language
            </TableCell>
            <TableCell width="200px" align="center">
              Position
            </TableCell>
            <TableCell width="100px" align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((menu) => (
            <TableRow hover key={menu.id}>
              <TableCell>
                <PublishButton active={menu.isPublished} onClick={() => {}} />
              </TableCell>
              <TableCell>
                <Link component={RouterLink} to={`/menus/edit/${menu.id}`}>
                  <Typography>{menu.title}</Typography>
                </Link>
                <Typography variant="caption">{menu.path}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography> {menu.language?.name}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{menu.menuLocation.name}</Typography>
                <Typography variant="caption">{menu.order}</Typography>
              </TableCell>
              <TableCell align="right">
                <DeleteButton onConfirm={() => handleDelete(menu.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </>
  );
};
