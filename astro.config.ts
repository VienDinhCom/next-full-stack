import react from '@astrojs/react'

import { defineConfig, envField } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  server: { port: 3000 },
  integrations: [react()],
  env: {
    schema: {
      DATABASE_URL: envField.string({ context: 'server', access: 'secret' }),
      BETTER_AUTH_SECRET: envField.string({ context: 'server', access: 'secret' }),
      BETTER_AUTH_URL: envField.string({ context: 'server', access: 'secret' }),
    },
  },

})
