import * as UserModel from '../models/userModel.js';

export const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users); 
    } catch (err) {
      res.status(500).json({ message: "Error fetching users", error: err.message });
    }
  }
};
