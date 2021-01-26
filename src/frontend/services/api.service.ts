import { createReactClient } from 'soki/client/react';
import { RootSchema } from '@shared/schemas/root.schema';
import { EnvService } from '@shared/services/env.service';

export const ApiService = createReactClient({
  RootSchema,
  endpoint: '/api',
  onRequest: async () => {
    return {
      headers: {},
      retries: EnvService.isProd() ? 3 : 1,
    };
  },
});
