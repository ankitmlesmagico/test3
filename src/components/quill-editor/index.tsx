import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

import 'react-quill-new/dist/quill.snow.css';

type QuillEditorProps = {
  value: string;
  onChange: (content: string) => void;
};

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange }) => {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true); // Ensure editor is loaded only on the client
  }, []);

  if (!editorLoaded) {
    return <div>Loading editor...</div>;
  }

  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
};

export default QuillEditor;
