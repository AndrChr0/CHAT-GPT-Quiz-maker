import { config } from "dotenv";
config();

import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.API_KEY });

async function askTheRobot(nr, topic) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Create a ${nr}-questioned quiz where the topic is ${topic}.
        Each question should have three answer alternatives structured like this:
        The question
        a) Alternative a
        b) Alternative b
        c) Alternative c
        Answer: answer (answer shoul be either 'a', 'b' or 'c')

        Only one question can be correct
        `,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const response = completion.choices[0].message.content;
  console.log(response);

  // Split the response by double line breaks to separate questions
  const questions = response.split("\n\n");

  // Array to hold the quiz objects
  const quiz = [];

  questions.forEach((questionBlock) => {
    // Split each question block by line
    const lines = questionBlock.split("\n");

    // Temporary object to hold the current question data
    let currentQuestion = {};

    lines.forEach((line) => {
      if (line.match(/^\d+\./)) {
        // Extract the question
        currentQuestion.question = line.replace(/^\d+\.\s*/, "").trim();
      } else if (line.startsWith("a)")) {
        currentQuestion.a = line.slice(3).trim();
      } else if (line.startsWith("b)")) {
        currentQuestion.b = line.slice(3).trim();
      } else if (line.startsWith("c)")) {
        currentQuestion.c = line.slice(3).trim();
      } else if (line.startsWith("Answer:")) {
        currentQuestion.answer = line.slice(8).trim();
      }
    });

    // Add the current question to the quiz array
    if (currentQuestion.question) {
      quiz.push(currentQuestion);
    }
  });

  console.log(quiz);
  return quiz;
}

export default askTheRobot;
