import authServices from "../services/authServices";

const register = async (req, res, next) => {
  try {
    const user = await authServices.register(req.body);

    res.status(201).json({ data: user });
  } catch (e) {
    next(e);
  }
};

const login = (req, res) => {
  console.info("Login");
};

const logout = (req, res) => {
  console.info("Logout");
};

export { register, login, logout };
