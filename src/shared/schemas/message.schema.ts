import { createSchema, fn, z } from 'soki';

export const MessageSchema = createSchema({
  hello: fn({
    input: {
      name: z.string(),
    },
    output: z.string(),
  }),
});
