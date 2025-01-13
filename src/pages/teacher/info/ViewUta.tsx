import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useGetPublicPostByMenuLanguageAndPathQuery } from '../../../services/api';
import { Markdown } from '../../../components/markdown/Markdown';

export default function ViewUta() {
  const pageQuery = useGetPublicPostByMenuLanguageAndPathQuery({
    language: 'lt',
    path: 'uta-bankas-mokytojams',
  });

  return (
    <Box>
      <Box mt={4}>
        <Markdown>{pageQuery.data?.text}</Markdown>
      </Box>
    </Box>
  );
}
