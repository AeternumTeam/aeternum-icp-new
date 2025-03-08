import pkg from 'pg';
import configs from "./config.js";

const { Pool } = pkg;

const db = new Pool ({
    host: configs.pg_host,
    port: configs.pg_port,
    database: configs.pg_database,
    user: configs.pg_user,
    password: configs.pg_password,
    // ssl: process.env.PG_SSL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export default db;