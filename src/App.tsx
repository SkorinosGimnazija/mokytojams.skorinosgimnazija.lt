import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import React from 'react';
import { Counter } from './features/counter/Counter';
import Markdown from 'markdown-to-jsx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Avatar } from '@mui/material';

const mdString = `
**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

<custom prop="C"/>

It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

[external link](https://www.google.com)

[intenral link](/link)

`;

interface Props {
  href: string;
  children: React.ReactNode;
}

const Link1: React.FC<Props> = ({ children, href }) => {
  if (href.startsWith('/')) {
    return <Link to={href}>{children}</Link>;
  } else {
    return (
      <>
        <span>
          <DescriptionOutlinedIcon style={{ marginBottom: '-5px' }} />
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        </span>
      </>
    );
  }
};

interface CustomProps {
  prop: string;
}

const Custom1: React.FC<CustomProps> = ({ prop }) => {
  return (
    <>
      <Avatar>{prop}</Avatar>
    </>
  );
};

export default function App() {
  return (
    <Container maxWidth="sm">
      <Router>
        <Box sx={{ my: 4 }}>
          <Counter />
          <Markdown
            options={{
              wrapper: 'article',
              forceWrapper: true,
              overrides: {
                a: {
                  component: Link1,
                },
                custom: {
                  component: Custom1,
                },
              },
            }}
          >
            {mdString}
          </Markdown>
        </Box>
      </Router>
    </Container>
  );
}
