import { useState } from "react";
import "./App.css";
import axios from "axios";
import QuestionBlock from "./components/QuestionBlock";

function App() {
  const [nr, setNr] = useState(0);
  const [topic, setTopic] = useState("");

  const [apiRes, setApiRes] = useState("");
  const [er, setEr] = useState("");

  function handleSubmission(event) {
    event.preventDefault();
    if (!prompt) {
      setEr("a prompt cannot be empty");
      return;
    }
    axios
      .post("http://localhost:1010/ask", { nr: nr, topic: topic })
      .then((res) => {
        console.log(res);
        setApiRes(res.data);
        setEr("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(apiRes);
  return (
    <>
      <h1>Quiz creator</h1>
      <form onSubmit={handleSubmission}>
        <label htmlFor="nr">Nr of questions</label>
        <input
          id="nr"
          type="number"
          value={nr}
          onChange={(e) => setNr(e.target.value)}
        />

        <label htmlFor="topic">Topic</label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <button type="submit">POST</button>
      </form>

      <button
        type="button"
        onClick={() => {
          setApiRes("");
          setEr("");
        }}
      >
        CLEAR
      </button>
      {apiRes &&
        apiRes.map((qb) => (
          <QuestionBlock
            key={qb.question} // Assuming 'question' is unique. If not, use a unique key.
            q={qb.question}
            a1={qb.a}
            a2={qb.b}
            a3={qb.c}
            answer={qb.answer}
          />
        ))}
      {er && <div>{er}</div>}
    </>
  );
}

export default App;
