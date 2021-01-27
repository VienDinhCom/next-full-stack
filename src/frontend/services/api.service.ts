import { createClient } from 'soki/client';
import { RootSchema } from '@shared/schemas/root.schema';
import { EnvService } from '@shared/services/env.service';

export { useQuery, useMuation, getFiles } from 'soki/client';

export const ApiService = createClient({
  RootSchema,
  endpoint: '/api',
  options: {
    onRequest: async () => {
      return {
        headers: {},
        retries: EnvService.isProd() ? 3 : 0,
      };
    },
  },
});
