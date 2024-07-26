const express = require("express");
const userRouter = require("./routes/user.route.js");
const connectMongoDb = require("./utils/connection.js");
const app = express();
const { logReqRes } = require("./middlewares/index.js");

connectMongoDb("mongodb://localhost:27017/master-nodejs");

app.use(logReqRes('log.txt'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: true }));
app.use("/api/users", userRouter);

app.listen(8000, () => {
  console.log("Server started on 8000");
});
