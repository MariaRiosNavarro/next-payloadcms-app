# Learning Payload CMS

1- Create App (Next.js is Included)

To create a new application, you can use the following command:

```bash
npx create-next-app@latest
```

However, since I use pnpm, I used:

```bash
pnpm create-payload-app
```

2- Add a Frontend Folder -> src/app/(frontend)

3- Add page.tsx inside (frontend). The layout.tsx file will be automatically created.

### Payload Hooks:

- beforeOperation

- beforeValidate

- beforeChange

- afterChange

- beforeDelete

- afterDelete

- afterRead

- afterError

Use Examples

```js

hooks: {
  beforeOperation: [
    async ({ operation, data }) => {
      console.log(`Operation: ${operation}`);
      return data;
    },
  ],
},

hooks: {
  beforeValidate: [
    async ({ data }) => {
      if (!data.slug) {
        data.slug = data.title?.toLowerCase().replace(/ /g, '-');
      }
      return data;
    },
  ],
},


hooks: {
  beforeChange: [
    async ({ data, operation }) => {
      if (operation === 'update') {
        data.updatedAt = new Date();
      }
      return data;
    },
  ],
},

hooks: {
  afterChange: [
    async ({ doc, operation }) => {
      if (operation === 'create') {
        console.log('New document created:', doc);
      }
    },
  ],
},


hooks: {
  beforeDelete: [
    async ({ id }) => {
      console.log(`Document with ID ${id} is about to be deleted.`);
    },
  ],
},


hooks: {
  afterDelete: [
    async ({ id }) => {
      console.log(`Document with ID ${id} was deleted.`);
    },
  ],
},

hooks: {
  afterRead: [
    async ({ doc }) => {
      doc.isRead = true;
      return doc;
    },
  ],
},


hooks: {
  afterError: [
    async ({ error, operation }) => {
      console.error(`Error during ${operation}:`, error.message);
    },
  ],
},
```

# Some Tutorials I used:

https://www.youtube.com/watch?v=j78HfUMIkBQ
