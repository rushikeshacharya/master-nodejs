const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  if (!allUsers) return res.status(404).json({ err: "User not found" });
  return res.json(allUsers);
};
const handleGetUsersById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ err: "User not found" });
  return res.json(user);
};
const handleUpdateUsersById = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { ...req.body });
  if (!user) return res.status(404).json({ err: "User not found" });
  return res.json(user);
};
const handleDeleteUsersById = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  //   if (!user) return res.status(404).json({ err: "User not found" });
  return res.json({ status: "Success" });
};
const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  console.log(body);
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  console.log("Result", result);
  return res.status(201).json({ msg: "Success", id: result._id });
};

module.exports = {
  handleGetAllUsers,
  handleGetUsersById,
  handleUpdateUsersById,
  handleDeleteUsersById,
  handleCreateNewUser,
};
