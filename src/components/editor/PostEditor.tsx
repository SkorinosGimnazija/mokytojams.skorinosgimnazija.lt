import { ButtonGroup, Divider, TextField } from '@mui/material';
import React, { useRef } from 'react';
import { htmlToMarkdown, normalizeHtml } from '../../lib/parser';
import { Markdown } from '../markdown/Markdown';
import { InsertFile } from './buttons/InsertFile';
import { InsertImage } from './buttons/InsertImage';
import { InsertLink } from './buttons/InsertLink';

interface Props {
  previewMode: boolean;
  values: {
    introText: string;
    text: string;
    meta: string;
    files?: string[] | null;
    newFiles?: File[] | null;
  };
  setValues: React.Dispatch<React.SetStateAction<any>>;
}

export const PostEditor: React.FC<Props> = ({ previewMode, values, setValues }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();

  if (previewMode) {
    return (
      <>
        <Markdown>{values.introText}</Markdown>
        <Divider />
        <Markdown>{values.text}</Markdown>
      </>
    );
  }

  const handleInsert = (value: string) => {
    const textArea = textAreaRef.current;
    if (!textArea) {
      return;
    }

    const startText = textArea.value.slice(0, textArea.selectionStart);
    const endText = textArea.value.slice(textArea.selectionEnd);

    setValues((x: any) => ({ ...x, text: startText + value + endText }));
  };

  return (
    <>
      <TextField
        id="introText"
        label="Intro"
        autoComplete="off"
        multiline
        rows={3}
        value={values.introText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValues((x: any) => ({ ...x, introText: e.target.value }));
        }}
        sx={{
          '& .MuiInputBase-root': {
            padding: '15px 5px',
          },
          '& .MuiInputBase-input': {
            padding: '0px 20px',
          },
        }}
      />

      <ButtonGroup variant="outlined">
        <InsertFile values={values} onInsert={handleInsert} />
        <InsertImage values={values} onInsert={handleInsert} />
        <InsertLink onInsert={handleInsert} />
      </ButtonGroup>

      <TextField
        inputRef={textAreaRef}
        id="text"
        label="Full article"
        autoComplete="off"
        multiline
        rows={10}
        value={values.text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValues((x: any) => ({ ...x, text: e.target.value }));
        }}
        sx={{
          '& .MuiInputBase-root': {
            padding: '15px 5px',
          },
          '& .MuiInputBase-input': {
            padding: '0px 20px',
          },
        }}
        onPaste={(e: React.ClipboardEvent<HTMLDivElement>) => {
          const html = e.clipboardData.getData('text/html');
          if (!html) {
            return;
          }

          const markdownText = htmlToMarkdown(html);
          if (!markdownText) {
            return;
          }

          const normalizedHtml = normalizeHtml(html);
          const firstParagraph = normalizedHtml.querySelector('p');
          const markdown = htmlToMarkdown(normalizedHtml.innerHTML);

          handleInsert(markdown);

          if (!values.introText && firstParagraph) {
            setValues((x: any) => ({ ...x, introText: htmlToMarkdown(firstParagraph.innerHTML) }));
          }

          if (!values.meta && firstParagraph) {
            setValues((x: any) => ({ ...x, meta: firstParagraph.textContent }));
          }

          e.preventDefault();
        }}
      />

      <TextField
        id="meta"
        label="Meta description"
        autoComplete="off"
        multiline
        rows={3}
        value={values.meta}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValues((x: any) => ({ ...x, meta: e.target.value }));
        }}
        sx={{
          '& .MuiInputBase-root': {
            padding: '15px 5px',
          },
          '& .MuiInputBase-input': {
            padding: '0px 20px',
          },
        }}
      />
    </>
  );
};
