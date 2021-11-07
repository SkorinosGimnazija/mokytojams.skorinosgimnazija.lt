import axios from 'axios';
import Markdown, { compiler } from 'markdown-to-jsx';
import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../context/authContext';

const Index: React.FC = () => {
  const [fromData, setFormData] = useState({ text: '' });
  const divRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const auth = useAuth();

  useEffect(() => {
    console.warn(auth);
  }, [auth]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || !inputRef.current.files) {
      return;
    }

    const formData = new FormData();

    Array.from(inputRef.current.files).forEach((file) => {
      formData.append('files', file);
    });

    Array.from(inputRef.current.files).forEach((file) => {
      formData.append('gallery', file);
    });

    const response = await axios.post('/api/hello', formData, {
      headers: { 'content-type': 'multipart/form-data' },
    });

    console.log(response.data);
  };

  const MyParagraph: React.FC = ({ children }) => {
    return <div className="bg-green-300">{children}</div>;
  };

  const MyParagraph2: React.FC = ({ children }) => {
    return <div className="bg-blue-300">{children}</div>;
  };

  const handleBold = () => {
    if (!divRef.current) {
      return;
    }

    const { text } = fromData;

    const newText = `${text.substring(0, divRef.current.selectionStart)}<div>${text.substring(
      divRef.current.selectionStart,
      divRef.current.selectionEnd
    )}</div>${text.substring(divRef.current.selectionEnd)}`;

    setFormData((x) => ({ ...x, text: newText }));
  };

  return (
    <>
      <div className="p-5">
        <form onSubmit={onSubmit}>
          <div>
            <input ref={inputRef} type="file" id="files" name="files" multiple />
          </div>
          <textarea
            ref={divRef}
            id="text"
            name="text"
            value={fromData.text}
            onChange={(e) => setFormData({ text: e.target.value })}
          />
          <button type="submit">Submut</button>
          <button onClick={handleBold} type="button">
            Bold
          </button>
        </form>
      </div>

      <div className="p-5 border border-red-400">
        {/* {post?.body && (
          <Markdown
            options={{
              overrides: {
                h1: {
                  component: MyParagraph,
                },
                hh: {
                  component: MyParagraph2,
                },
              },
            }}
          >
            {post.body}
          </Markdown>
        )} */}
      </div>
      <div
        style={{
          border: '1px black solid',
          height: 200,
          resize: 'both',
          margin: '20px',
          overflow: 'auto',
        }}
        contentEditable
      />
    </>
  );
};

export default Index;
