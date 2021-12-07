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
          objectFit: 'contain',
        },
        '& img[src^="{"]': {
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiPgogIDxwYXRoIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIyIiBkPSJNNCAxNmw0LjU4Ni00LjU4NmEyIDIgMCAwMTIuODI4IDBMMTYgMTZtLTItMmwxLjU4Ni0xLjU4NmEyIDIgMCAwMTIuODI4IDBMMjAgMTRtLTYtNmguMDFNNiAyMGgxMmEyIDIgMCAwMDItMlY2YTIgMiAwIDAwLTItMkg2YTIgMiAwIDAwLTIgMnYxMmEyIDIgMCAwMDIgMnoiIC8+Cjwvc3ZnPg==")',
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
