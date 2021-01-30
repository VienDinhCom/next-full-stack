import { createClient } from 'soki/client';
import { RootSchema } from '@shared/schemas/root.schema';
import { EnvService } from '@shared/services/env.service';

export type { File } from 'soki/client';
export { useQuery, useMuation, getFiles } from 'soki/client';

const clientEndpoint = '/api';
const serverEndpoint = `http${EnvService.isProd() ? 's' : ''}://${EnvService.get('HOST')}/api`;

export const ApiService = createClient({
  RootSchema,
  endpoint: EnvService.isBrowser() ? clientEndpoint : serverEndpoint,
  options: {
    onRequest: async () => {
      return {
        headers: {},
        retries: EnvService.isProd() ? 3 : 0,
      };
    },
  },
});
