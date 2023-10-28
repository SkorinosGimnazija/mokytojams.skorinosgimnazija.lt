import { Button, Link, Stack, Typography } from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';
import { DeleteButton } from '../../../../components/buttons/DeleteButton';
import { CreateItemButton } from '../../../../components/links/CreateItemButton';
import { DefaultTable } from '../../../../components/table/DefaultTable';
import { useDeleteClasstimeMutation, useGetClasstimesQuery } from '../../../../services/api';

export default function ViewClasstimes() {
  const [deleteClasstime, { isLoading: deleteLoading }] = useDeleteClasstimeMutation();
  const classtimeQuery = useGetClasstimesQuery();

  const handleDelete = (id: number) => {
    deleteClasstime({ id });
  };

  return (
    <Box>
      <Stack direction="row" gap={4}>
        <CreateItemButton />
        <Button color="info" component={RouterLink} to="shortdays" variant="contained">
          Sutrumpintų pamokų dienos
        </Button>
      </Stack>
      <Box mt={4}>
        <DefaultTable isLoading={classtimeQuery.isFetching || deleteLoading}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Pamokos</TableCell>
              <TableCell>Sutrumpintos pamokos</TableCell>
              <TableCell width="100px" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classtimeQuery.data?.map((classtime) => (
              <TableRow hover key={classtime.id}>
                <TableCell>
                  <Link component={RouterLink} to={`${classtime.id}`}>
                    <Typography>{classtime.number}</Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link component={RouterLink} to={`${classtime.id}`}>
                    <Typography>
                      {classtime.startTime.slice(0, -3)} - {classtime.endTime.slice(0, -3)}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link component={RouterLink} to={`${classtime.id}`}>
                    <Typography>
                      {classtime.startTimeShort.slice(0, -3)} - {classtime.endTimeShort.slice(0, -3)}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <DeleteButton onConfirm={() => handleDelete(classtime.id)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </DefaultTable>
      </Box>
    </Box>
  );
}
