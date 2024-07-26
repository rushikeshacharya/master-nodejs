const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUsersById,
  handleCreateNewUser,
  handleUpdateUsersById,
  handleDeleteUsersById,
} = require("../controllers/user.controller.js");

// REST API's

/**
 * REST API for get & create users
 */
router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUsersById)
  .patch(handleUpdateUsersById)
  .delete(handleDeleteUsersById);

module.exports = router;
