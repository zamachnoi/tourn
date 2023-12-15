import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

// Define the type for the drizzle database instance
type PostgresJsDatabase = ReturnType<typeof drizzle> & {
    // Include the types or methods that drizzle provides, based on your schema
}

// Initialize the database connection
function initialize(): PostgresJsDatabase {
    if (!process.env.SUPABASE_CONN_POOL_URL) {
        throw new Error('DATABASE_URL not set')
    }

    const connectionString = process.env.SUPABASE_CONN_POOL_URL
    const sql = postgres(connectionString)
    return drizzle(sql, { schema }) as PostgresJsDatabase
}

// Singleton instance
let dbInstance: PostgresJsDatabase | null = null

// Singleton accessor function
function singleton(): PostgresJsDatabase {
    if (!dbInstance) {
        dbInstance = initialize()
    }
    return dbInstance
}

// Use the singleton pattern for both development and production
const db = singleton()

export default db
