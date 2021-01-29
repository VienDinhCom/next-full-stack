import { Context, createRootResolver } from '@backend/core';
import { RootSchema } from '@shared/schemas/root.schema';

import { FileResolver } from './file.resolver';
import { MessageResolver } from './message.resolver';

export const RootResolver = createRootResolver({
  RootSchema,
  resolvers: {
    file: FileResolver,
    message: MessageResolver,
  },
  context: async (req, res): Promise<Context> => {
    return {};
  },
});
