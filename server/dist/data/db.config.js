import { createPool } from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const config = {
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "auth",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "undefined",
};
const db = createPool(config);
//# sourceMappingURL=db.config.js.map