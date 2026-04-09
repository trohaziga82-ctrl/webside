import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  user: "ziga",
  password: "ziga123",
  host: "localhost",
  port: 5432,
  database: "webshop", 
});

