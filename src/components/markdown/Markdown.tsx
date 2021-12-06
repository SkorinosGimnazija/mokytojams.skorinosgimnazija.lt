import React from 'react';
import MarkdownJsx from 'markdown-to-jsx';
import { Box } from '@mui/material';

interface Props {
  children?: string | null;
}

export const Markdown: React.FC<Props> = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <Box
      sx={{
        '& p': {
          textAlign: 'justify',
        },
        '& img': {
          maxWidth: '100%',
        },
      }}
    >
      <MarkdownJsx
        options={
          {
            // overrides: {
            //   img: {
            //     component: MyImage,
            //     props: {
            //       // props: 'foo',
            //     },
            //   },
            // },
          }
        }
      >
        {children}
      </MarkdownJsx>
    </Box>
  );
};
