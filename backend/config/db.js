import { neon } from "@neondatabase/serverless";
import "dotenv/config";

// Create SQL connection using DATABASE_URL
export const sql = neon(process.env.DATABASE_URL);