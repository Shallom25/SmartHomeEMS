import { pool } from "../config/db/pool.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { error } from "node:console";

const createUser = async (
  fullName: string,
  email: string,
  password: string,
) => {
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING *`,
    [fullName, email, passwordHash],
  );

  return result.rows[0];
};

const loginUser = async (
  email : string,
  password : string,
) => {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  const user = result.rows[0];

  if(!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.password_hash);

  if (!validPassword) {
    throw new Error ("invalid credentials")
  }

  const token = jwt.sign(
    {
      userId : user.id,
      email : user.id
    },
    process.env.JWT_SECRET!,
    {
      expiresIn : "7d"
    }
  );

  return {
    token,
    id : user.id,
    fullName : user.full_name,
    email : user.email,
  }
}

const getUsers = async () => {
  const result = await pool.query(
    `SELECT * FROM users ORDER BY created_at DESC`,
  );
  return result.rows;
};

const getUserById = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);

  return result.rows[0];
};

const updateUser = async (id: string, fullName: string, email: string) => {
  const result = await pool.query(
    `UPDATE users
     SET full_name = $1, email = $2
     WHERE id = $3
     RETURNING *`,
    [fullName, email, id],
  );

  return result.rows[0];
};

const deleteUser = async (id: string) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);

  return;
};

export { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser};
