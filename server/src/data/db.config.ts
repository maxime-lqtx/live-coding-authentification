import { createPool } from "mysql2/promise";
import type { PoolOptions, Pool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const config: PoolOptions= {
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    host: process.env.DB_HOST ||"localhost",
    database: process.env.DB_NAME || "auth",
    user: process.env.DB_USER || "livecodes",
    password: process.env.DB_PASSWORD || "Root2026!",
} 
export const db : Pool = createPool(
    config
);