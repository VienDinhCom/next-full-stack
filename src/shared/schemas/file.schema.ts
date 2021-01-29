import { createSchema, fn, z } from 'soki';

export const FileSchema = createSchema({
  upload: fn({
    input: {
      file: z.file(),
    },
    output: z.string(),
  }),
});
