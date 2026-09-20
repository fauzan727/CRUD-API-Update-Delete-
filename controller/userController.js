import * as UserModel from '../models/userModel.js';

export const UserController = {
  getUsers: async (req, res) => {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json({ success: true, message: "Data users berhasil diambil", data: users });
    } catch (err) {
      res.status(500).json({ success: false, message: "Gagal mengambil data users", error: err.message });
    }
  }
};
