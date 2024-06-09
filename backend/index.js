import express from "express";
import { config } from "dotenv";
import askTheRobot from "./ai.js";
import cors from "cors";

config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/ask", async (req, res) => {
  console.log(req.body);
  const response = req.body.prompt;
  const aIres = await askTheRobot(response);
  res.send(aIres);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
