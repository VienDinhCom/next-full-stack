import { createRootSchema } from 'soki';

import { MessageSchema } from './message.schema';

export const RootSchema = createRootSchema({
  message: MessageSchema,
});
