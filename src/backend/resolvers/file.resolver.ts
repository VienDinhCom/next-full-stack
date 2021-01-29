import { Resolvers, createResolver } from '@backend/core';

export const FileResolver = createResolver<Resolvers['file']>({
  upload: async ({ file }, context) => {
    return file.name;
  },
});
