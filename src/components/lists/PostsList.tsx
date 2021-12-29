import { Link, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { toLocalDate } from '../../lib/dateFormat';
import { useDeletePostMutation, usePatchPostMutation } from '../../services/api';
import { PostDto, PostPatchDto } from '../../services/generatedApi';
import { DeleteButton } from '../buttons/DeleteButton';
import { FeatureButton } from '../buttons/FeatureButton';
import { PublishButton } from '../buttons/PublishButton';
import { DefaultTable, DefaultTableProps } from '../table/DefaultTable';

interface Props extends DefaultTableProps {
  data?: PostDto[];
}

export const PostsList: React.FC<Props> = ({ data, isLoading, ...props }) => {
  const [patchPost, { isLoading: patchLoading }] = usePatchPostMutation();
  const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation();

  const handlePatch = (id: number, postPatchDto: PostPatchDto) => {
    patchPost({ id, postPatchDto });
  };

  const handleDelete = (id: number) => {
    deletePost({ id });
  };

  return (
    <>
      <DefaultTable {...props} isLoading={isLoading || patchLoading || deleteLoading}>
        <TableHead>
          <TableRow>
            <TableCell width="120px"></TableCell>
            <TableCell>Title</TableCell>
            <TableCell width="200px" align="right">
              Language
            </TableCell>
            <TableCell width="200px" align="center">
              Date
            </TableCell>
            <TableCell width="100px" align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((post) => (
            <TableRow hover key={post.id}>
              <TableCell>
                <PublishButton
                  active={post.isPublished}
                  onClick={() => handlePatch(post.id, { isPublished: !post.isPublished })}
                />
                <FeatureButton
                  active={post.isFeatured}
                  onClick={() => handlePatch(post.id, { isFeatured: !post.isFeatured })}
                />
              </TableCell>
              <TableCell>
                <Link component={RouterLink} to={`${post.id}`}>
                  <Typography>{post.title}</Typography>
                </Link>
                <Typography variant="caption">{post.slug}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography> {post.language?.name}</Typography>
                <Typography variant="caption">{post.showInFeed && <>In feed</>}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography>{toLocalDate(post.publishedAt)}</Typography>
                <Typography variant="caption">{toLocalDate(post.modifiedAt)}</Typography>
              </TableCell>
              <TableCell align="right">
                <DeleteButton onConfirm={() => handleDelete(post.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </DefaultTable>
    </>
  );
};
