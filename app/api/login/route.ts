import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json(
        { error: "Email in geslo sta obvezna" },
        { status: 400 }
      );

    // poišči uporabnika
    const res = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = res.rows[0];
    if (!user) return NextResponse.json({ error: "Uporabnik ne obstaja" }, { status: 400 });

    // primerjaj geslo
    const match = await bcrypt.compare(password, user.password);
    if (!match) return NextResponse.json({ error: "Napačno geslo" }, { status: 400 });

    // uspešna prijava
    return NextResponse.json({
      message: "Prijava uspešna!",
      role: user.role,
      email: user.email,
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: "Napaka pri prijavi" }, { status: 500 });
  }
}
