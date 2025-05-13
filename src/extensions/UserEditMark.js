import { Mark } from '@tiptap/core';

export const UserEditMark = Mark.create({
  name: 'userEdit',

  addAttributes() {
    return {
      user: { default: null },
      color: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-user-edit]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      {
        ...HTMLAttributes,
        'data-user-edit': '',
        style: ` cursor: pointer;`,
        title: `Edited by: ${HTMLAttributes.user}`,
      },
      0,
    ];
  },
});
