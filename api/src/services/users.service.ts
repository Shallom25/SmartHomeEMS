import { json } from "node:stream/consumers";
import { pool } from "../config/db/pool.js";

const createUser = async (
  fullName: string,
  email: string,
  passwordHash: string,
) => {
  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash)
        VALUES ($1, $2, $3)
        RETURNING *`,
    [fullName, email, passwordHash],
  );

  return result.rows[0];
};

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

const updateUser = async (
  id: string,
  fullName: string,
  email: string
) => {
  const result = await pool.query(
    `UPDATE users
     SET full_name = $1, email = $2
     WHERE id = $3
     RETURNING *`,
    [fullName, email, id]
  );

  return result.rows[0];
};

const deleteUser = async (id: string) => {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);

  return 
};

export { createUser, getUsers,getUserById, updateUser, deleteUser };
