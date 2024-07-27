import { User } from "../models/user.schema.js";
import { getUser, setUser } from "../service/auth.service.js";
const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
};
const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });

  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
};

export { handleUserSignup, handleUserLogin };
