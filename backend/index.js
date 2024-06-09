import express from "express";
import { config } from "dotenv";
import askTheRobot from "./ai.js";
config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.post("/ask", async (req, res) => {
  //   const { prompt } = req.query;
  console.log(req.body);
  const response = req.body.prompt;
  res.send(response);
});

console.log(askTheRobot("What is the capital of France"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
