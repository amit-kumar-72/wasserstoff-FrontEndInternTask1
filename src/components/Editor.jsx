import { UserEditMark } from '../extensions/UserEditMark';

import { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebrtcProvider } from 'y-webrtc';
import { getUser } from '../utils/user';

const doc = new Y.Doc();
const provider = new WebrtcProvider('collab-room-1', doc);

const colors = ['#F87171', '#60A5FA', '#34D399', '#FBBF24'];
const getColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash += name.charCodeAt(i);
  return colors[hash % colors.length];
};

export default function Editor() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(getUser());
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: false, // Disable default history to avoid conflict with Yjs
      }),
      UserEditMark, 
      Collaboration.configure({ document: doc }),
      CollaborationCursor.configure({
        provider,
        user: {
          name: username,
          color: getColor(username),
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      //  Apply the mark on every update (text insertion)
      editor.commands.setMark('userEdit', {
        user: username,
        color: getColor(username),
      });
    },
  });

  return (
    <div>
      <div className="mb-4 text-sm text-gray-600">
        Logged in as: <span className="font-semibold">{username}</span>
      </div>
      <div className="border rounded bg-white p-4 shadow">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
