import { config } from "dotenv";
config();

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.API_KEY });

async function main(prompt) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content;
}

main();

export default main;