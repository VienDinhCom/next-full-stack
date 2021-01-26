import { Context, createRootResolver } from '@backend/core';
import { RootSchema } from '@shared/schemas/root.schema';

import { MessageResolver } from './message.resolver';

export const RootResolver = createRootResolver({
  RootSchema,
  resolvers: {
    message: MessageResolver,
  },
  context: async (req, res): Promise<Context> => {
    return {};
  },
});
