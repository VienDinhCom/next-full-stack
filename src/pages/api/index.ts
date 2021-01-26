import { createNextHandler } from 'soki/server/next';
import { EnvService } from '@shared/services/env.service';
import { RootResolver } from '@backend/resolvers/root.resolver';

export const config = { api: { bodyParser: false } };

export default createNextHandler({
  RootResolver,
  options: {
    debug: EnvService.isDev(),
  },
});
