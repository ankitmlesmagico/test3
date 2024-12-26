'use client';
// pages/editor.tsx
import React, { useState } from 'react';
import QuillEditor from '@/components/quill-editor';

const EditorPage = () => {
  const [content, setContent] = useState('');

  const handleContentChange = (content: string) => {
    setContent(content);
    console.log('Editor content:', content);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Quill Editor with react-quill-new in Next.js</h1>
      <QuillEditor value={content} onChange={handleContentChange} />
      <div>
        <h2>Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default EditorPage;
