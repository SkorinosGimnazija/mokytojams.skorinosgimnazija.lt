import { LinearProgress } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import React from 'react';

export interface DefaultTableProps {
  isLoading?: boolean;
  totalCount?: number;
  pageNumber?: number;
  itemsPerPage?: number;
  onPageChange?: (value: number) => void;
  onRowsPerPageChange?: (value: number) => void;
}

export const DefaultTable: React.FC<DefaultTableProps> = ({
  children,
  isLoading,
  totalCount,
  itemsPerPage,
  pageNumber,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const Pagination = () => {
    if (!onPageChange || !onRowsPerPageChange) {
      return null;
    }

    return (
      <TablePagination
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} iš ${count}`}
        labelRowsPerPage={'Įrašų per puslapį:'}
        rowsPerPageOptions={[5, 10, 20]}
        component="div"
        count={totalCount ?? 0}
        rowsPerPage={itemsPerPage ?? 0}
        page={pageNumber ?? 0}
        onPageChange={(_, page) => {
          window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
          onPageChange(page);
        }}
        onRowsPerPageChange={(e) => onRowsPerPageChange(Number(e.target.value))}
      />
    );
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ position: 'relative' }}>
        {isLoading && (
          <LinearProgress
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              borderTopLeftRadius: 3,
              borderTopRightRadius: 3,
            }}
          />
        )}
        <Table sx={{ 'td > a': { textDecoration: 'none' } }}>{children}</Table>
      </TableContainer>
      <Pagination />
    </>
  );
};
