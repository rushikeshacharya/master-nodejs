import jwt from "jsonwebtoken";
const secret = "flash";

const setUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
    secret
  );
};
const getUser = (token) => {
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};

export { setUser, getUser };
