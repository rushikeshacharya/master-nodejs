import { getUser } from "../service/auth.service.js";

const checkAuthentication = (req, res, next) => {
  console.log("req", req);
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();
  const user = getUser(tokenCookie);
  req.user = user;
  return next();
};
const restrictTo = (roles = []) => {
  return function (req, res, next) {
    if (!req.user) return res.redirect("/login");
    if (!roles.includes(req.user.role)) return res.end("UnAuthorized");
    return next();
  };
};

export { checkAuthentication, restrictTo };
