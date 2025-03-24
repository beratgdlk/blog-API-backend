import knex from 'knex';
import dotenv from 'dotenv';
import { hostname } from 'os';

dotenv.config();

const db = {
    client: "pg",
    connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
}