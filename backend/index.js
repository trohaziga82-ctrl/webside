import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { pool } from "./db.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

// REGISTER
app.post("/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Manjkajo podatki" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2)",
      [email, hashedPassword]
    )

    res.json({ message: "Uporabnik uspešno ustvarjen" })
  } catch (err) {
    res.status(500).json({ message: "Napaka pri registraciji" })
  }
})

// LOGIN
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Napačni podatki" })
    }

    const user = result.rows[0]
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
      return res.status(401).json({ message: "Napačni podatki" })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET
    )

    res.json({ token })
  } catch (err) {
    res.status(500).json({ message: "Napaka pri prijavi" })
  }
  const token = jwt.sign(
  { userId: user.id, role: user.role }, 
  process.env.JWT_SECRET
)

})

// READ PRODUCTS (CRUD)
app.get("/products", async (req, res) => {
  const result = await pool.query("SELECT * FROM products")
  res.json(result.rows)
})


// SERVER START

app.listen(process.env.PORT, () => {
  console.log("Backend teče na portu", process.env.PORT)
})
