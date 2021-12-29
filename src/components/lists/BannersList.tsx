import { Link, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDeleteBannerMutation } from '../../services/api';
import { BannerDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { PublishButton } from '../buttons/PublishButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends DefaultTableProps {
  data?: BannerDto[];
}

export const BannersList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const [deleteBanner, { isLoading: deleteLoading }] = useDeleteBannerMutation();

  const handleDelete = (id: number) => {
    deleteBanner({ id });
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
          {data?.map((banner) => (
            <TableRow hover key={banner.id}>
              <TableCell>
                <PublishButton active={banner.isPublished} onClick={() => {}} />
              </TableCell>
              <TableCell>
                <Link component={RouterLink} to={`${banner.id}`}>
                  <Typography>{banner.title}</Typography>
                </Link>
                <Typography variant="caption">{banner.url}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography> {banner.language.name}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{banner.order}</Typography>
              </TableCell>
              <TableCell align="right">
                <DeleteButton onConfirm={() => handleDelete(banner.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </>
  );
};
