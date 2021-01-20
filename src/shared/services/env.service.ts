export namespace EnvService {
  export function get(key: string) {
    return process.env[key]!;
  }

  export function isNode() {
    return !process.browser;
  }

  export function isBrowser() {
    return process.browser;
  }

  export function isDev() {
    return process.env.NODE_ENV === 'development';
  }

  export function isProd() {
    return process.env.NODE_ENV === 'production';
  }

  export function isTest() {
    return process.env.NODE_ENV === 'test';
  }
}
