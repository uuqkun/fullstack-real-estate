import authServices from "../services/authServices.js";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  try {
    const user = await authServices.register(req.body);

    res.status(201).json({ message: "User created successfully" });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await authServices.login(req.body);
    const age = 1000 * 60 * 60 * 24 * 7; // 7 days

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });

    // GENERATE COOKIE TOKEN AND SEND TO THE USER
    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: age,
        // secure: true,
      })
      .status(200)
      .json(user);
  } catch (e) {
    next(e);
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({ message: "Logout success" });
  } catch (e) {
    next(e);
  }
};

export { register, login, logout };
