import { getUser } from "../service/auth.service.js";
const restrictToLoggedinUserOnly = async (req, res, next) => {
  const userId = req.headers?.["authorization"];
  const token = userId?.split("Bearer ")[1];
  if (!userId) return res.redirect("/login");
  const user = getUser(token);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
};

const checkAuth = async (req, res, next) => {
  const userId = req.headers?.["authorization"];
  const token = userId?.split("Bearer ")[1];
  const user = getUser(token);
  req.user = user;
  next();
};

export { restrictToLoggedinUserOnly, checkAuth };
