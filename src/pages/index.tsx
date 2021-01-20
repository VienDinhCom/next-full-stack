import { EnvService } from '@shared/services/env.service';

export default function Page() {
  console.log('isBrowser:', EnvService.isBrowser());
  console.log('isNode:', EnvService.isNode());
  console.log('isProd:', EnvService.isProd());
  console.log('isDev:', EnvService.isDev());
  console.log('isTest:', EnvService.isTest());
  console.log('get:', EnvService.get('NEXT_PUBLIC_VARIABLE'));

  return <h1>Hello World!</h1>;
}
