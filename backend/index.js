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
  const NR = req.body.nr;
  const TOPIC = req.body.topic;
  const DIFFICULTY = req.body.difficulty;
  const aIres = await askTheRobot(NR, TOPIC);
  res.send(aIres);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
