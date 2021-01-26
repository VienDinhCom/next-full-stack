import { Resolvers, createResolver } from '@backend/core';

export const MessageResolver = createResolver<Resolvers['message']>({
  hello: async ({ name }, context) => {
    return `Hello ${name}!`;
  },
});
