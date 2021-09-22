import { Link, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  GetPostsApiResponse,
  PostDto,
  PostPatchDto,
  useDeletePostMutation,
  usePatchPostMutation,
} from '../../../services/generated.api';
import { DeleteButton } from '../../buttons/DeleteButton';
import { FeatureButton } from '../../buttons/FeatureButton';
import { PublishButton } from '../../buttons/PublishButton';

interface Props {
  data?: PostDto[];
}

export const PostsList: React.FC<Props> = ({ data }) => {
  const [patchPost] = usePatchPostMutation();
  const [deletePost] = useDeletePostMutation();

  const handlePatch = (id: number, postPatchDto: PostPatchDto) => {
    patchPost({ id, postPatchDto });
  };

  const handleDelete = (id: number) => {
    deletePost({ id });
  };

  return (
    <TableContainer component={Paper} elevation={4}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell width="120px"></TableCell>
            <TableCell>Title</TableCell>
            <TableCell width="200px" align="right">
              Category
            </TableCell>
            <TableCell width="200px" align="center">
              Publish date
            </TableCell>
            <TableCell width="100px" align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((post) => (
            <TableRow
              key={post.id}
              sx={{ ':hover': { backgroundColor: (theme) => theme.palette.grey[200] } }}
            >
              <TableCell>
                <PublishButton
                  active={post.isPublished}
                  onClick={() => handlePatch(post.id!, { isPublished: !post.isPublished })}
                />
                <FeatureButton
                  active={post.isFeatured}
                  onClick={() => handlePatch(post.id!, { isFeatured: !post.isFeatured })}
                />
              </TableCell>
              <TableCell>
                <Link underline="none" component={RouterLink} to={`/posts/edit/${post.id}`}>
                  <Typography>{post.title}</Typography>
                </Link>
                <Typography variant="caption">{post.slug}</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography> {post.category?.name}</Typography>
                <Typography variant="caption">{post.category?.language?.name}</Typography>
              </TableCell>
              <TableCell align="center">
                {new Date(post.publishDate!).toLocaleDateString('lt')}
              </TableCell>
              <TableCell align="right">
                <DeleteButton icon onConfirm={() => handleDelete(post.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
