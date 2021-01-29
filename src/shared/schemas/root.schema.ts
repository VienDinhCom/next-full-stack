import { createRootSchema } from 'soki';

import { FileSchema } from './file.schema';
import { MessageSchema } from './message.schema';

export const RootSchema = createRootSchema({
  file: FileSchema,
  message: MessageSchema,
});
