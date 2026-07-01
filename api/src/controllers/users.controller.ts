import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
  loginUser
} from "../services/users.service.js";
import { Request, Response } from "express";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    // later you will hash password with bcrypt
    const user = await createUser(fullName, email, password);

    res.status(201).json(user);
  } catch (error) {
      console.error("CREATE USER ERROR:", error);

  return res.status(500).json({
    error: "User creation failed",
    details: error instanceof Error ? error.message : error,
  });
  }
};


const signInUser = async ( req : Request, res : Response ) => {
  try {
    const { email , password } = req.body;

    const user = await loginUser(email, password);

    return res.status(201).json(user)
  } catch (error) {
          console.error("Login ERROR:", error);

  return res.status(500).json({
    error: "User creation failed",
    details: error instanceof Error ? error.message : error,
  });
  }
}

const fetchUsers = async (req: Request, res: Response) => {
  const users = await getUsers();
  res.json(users);
};

const fetchUserById = async (req: Request<{id : string}>, res: Response) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      error: "Error getting user",
    });
  }
};


const deleteUserData = async (
  req: Request<{id : string}>,
  res: Response
) => {
  const { id } = req.params;

  await deleteUser(id);

  res.status(200).json({
    message: "User deleted",
  });
};

const updateUserData = async (req: Request<{id : string}>, res: Response) => {
  try {
    const { id } = req.params;
    const { fullName, email } = req.body;

    const user = await updateUser(id, fullName, email);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error: "Error updating user data",
    });
  }
};


const getProfile = async (req: Request, res: Response) => {
  const { userId } = req.user;

  const user = await getUserById(userId);

  res.json({
    user,
  });
};


export { registerUser, deleteUserData, fetchUserById, fetchUsers,  updateUserData, signInUser, getProfile} 