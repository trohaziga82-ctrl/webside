import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
});

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email in geslo sta obvezna" }, { status: 400 });
    }

    // preveri, ali uporabnik že obstaja
    const existing = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (existing.rows.length > 0) {
      return NextResponse.json({ error: "Uporabnik že obstaja" }, { status: 400 });
    }

    // hash gesla
    const hashedPassword = await bcrypt.hash(password, 10);

    // vstavi uporabnika
    await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
      [email, hashedPassword, "user"]
    );

    return NextResponse.json({ message: "Uspešno registriran!" });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Napaka pri registraciji" }, { status: 500 });
  }
}
