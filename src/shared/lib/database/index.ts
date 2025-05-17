import { DATABASE_URL } from 'astro:env/server'
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema'

export const database = drizzle(DATABASE_URL, { schema })
