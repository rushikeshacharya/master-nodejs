const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();

/**
 * Database Connection
 */
mongoose
  .connect("mongodb://localhost:27017/master-nodejs")
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.log("Err", err);
  });

/**
 * Mongo Schema for User Collection
 */
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: true }));

/**
 * HTML Response for get all users -
 * @dev its a Server side rendering
 */
app.get("/users", async (req, res) => {
  const allUsers = await User.find({});
  const html = `
    <ul>
    ${allUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}
    </ul>
    `;
  res.send(html);
});

/**
 * Middleware to log the requests
 */
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()}: ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// REST API's

/**
 * REST API for get & create users
 */
app
  .route("/api/users")
  .get(async (req, res) => {
    return res.json(await User.find({}));
  })
  .post(async (req, res) => {
    const body = req.body;
    if (
      !body ||
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender
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
    return res.status(201).json({ msg: "Success" });
  });

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    return res.json(await User.findById(req.params.id));
  })
  .patch(async(req, res) => {
    const body = req.body;
    const id = Number(req.params.id);
    return res.json(await User.findByIdAndUpdate(req.params.id, {...body}));
  })
  .delete(async (req, res) => {
    return res.json(await User.findOneAndDelete(req.params.id));
  });

app.listen(8000, () => {
  console.log("Server started on 8000");
});
