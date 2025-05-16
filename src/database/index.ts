import { DATABASE_URL } from 'astro:env/server'
import { drizzle } from 'drizzle-orm/node-postgres'

export const database = drizzle(DATABASE_URL)
