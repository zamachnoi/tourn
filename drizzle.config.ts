import type { Config } from 'drizzle-kit'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

export default {
    schema: './src/schema.ts',
    out: './drizzle',
    dbCredentials: {
        connectionString: process.env.DATABASE_URL as string,
        database: process.env.DATABASE_NAME as string,
    },
    driver: 'pg',
} satisfies Config
