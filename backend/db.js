const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "123",
  host: process.env.POSTGRES_HOST || "localhost",
  port: 5432,
  database: process.env.POSTGRES_DATABASE || "my_todo",
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
