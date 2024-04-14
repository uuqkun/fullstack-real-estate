import { ResponseError } from "../error/error.js";
import userService from "../services/user-service.js";

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();

    res.status(200).json(users);
  } catch (e) {
    res.status(500).json("An error from server occured");
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userService.getUser(id);

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json("An error from server occured");
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const body = req.body;

    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const user = await userService.updateUser(id, body);

    res.status(200).json(user);
  } catch (e) {
    res.status(500).json("An error from server occured");
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const tokenUserId = req.userId;

    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await userService.deleteUser(id);

    res.status(200).json({ message: "Succeed" });
  } catch (e) {
    res.status(500).json("An error from server occured");
  }
};

export { getUsers, getUser, updateUser, deleteUser };
