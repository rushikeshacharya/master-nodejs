import express from "express";
import { users } from "./MOCK_DATA.js";
const app = express();

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  return res.json(user);
});

app.post("/api/users", (req, res) => {
  return res.json({ status: pending });
});

app.patch("/api/users/:id", (req, res) => {
  return res.json({ status: pending });
});

app.listen(8000, () => {
  console.log("Server started on 8000");
});
