import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function test() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Povezava OK:", res.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error("Napaka pri povezavi:", err);
    process.exit(1);
  }
}

test();
