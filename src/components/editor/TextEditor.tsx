import { Button, ButtonGroup, Divider, TextField } from '@mui/material';
import { Field } from 'formik';
import { Markdown } from '../markdown/Markdown';
import React, { useEffect, useState, useRef } from 'react';
import { htmlToMarkdown, normalizeHtml } from '../../lib/parser';
import { InsertFile } from './buttons/InsertFile';
import { InsertLink } from './buttons/InsertLink';
import { InsertImage } from './buttons/InsertImage';

interface Props {
  previewMode: boolean;
  values: {
    introText: string;
    text: string;
    meta: string;
    files?: string[] | null;
    newFiles?: File[] | null;
  };
  setFieldValue: (field: string, value: any) => void;
}

export const TextEditor: React.FC<Props> = ({ previewMode, values, setFieldValue }) => {
  const textRef = useRef<HTMLTextAreaElement>();

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
    const input = textRef.current;
    if (!input) {
      return;
    }

    const startText = input.value.slice(0, input.selectionStart);
    const endText = input.value.slice(input.selectionEnd);

    setFieldValue('text', startText + value + endText);
  };

  return (
    <>
      <Field
        id="introText"
        label="Intro"
        autoComplete="off"
        multiline
        rows={3}
        value={values.introText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFieldValue('introText', e.target.value);
        }}
        component={TextField}
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

      <Field
        inputRef={textRef}
        id="text"
        label="Full article"
        autoComplete="off"
        multiline
        rows={10}
        value={values.text}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFieldValue('text', e.target.value);
        }}
        component={TextField}
        sx={{
          '& .MuiInputBase-root': {
            padding: '15px 5px',
          },
          '& .MuiInputBase-input': {
            padding: '0px 20px',
          },
        }}
        onPaste={(e: React.ClipboardEvent<HTMLTextAreaElement>) => {
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
            setFieldValue('introText', htmlToMarkdown(firstParagraph.innerHTML));
          }

          if (!values.meta && firstParagraph) {
            setFieldValue('meta', firstParagraph.textContent);
          }

          e.preventDefault();
        }}
      />

      <Field
        id="meta"
        label="Meta description"
        autoComplete="off"
        multiline
        rows={3}
        value={values.meta}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFieldValue('meta', e.target.value);
        }}
        component={TextField}
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
