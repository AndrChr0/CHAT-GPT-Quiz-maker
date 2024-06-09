import { useState } from "react";
import "./App.css";
import axios from "axios";
import QuestionBlock from "./components/QuestionBlock";

function App() {
  const [nr, setNr] = useState(0);
  const [topic, setTopic] = useState("");
  const [apiRes, setApiRes] = useState("");
  const [error, setError] = useState("");

  function clear() {
    setApiRes("");
    setError("");
    setTopic("");
    setNr(0);
  }

  function handleSubmission(event) {
    event.preventDefault();
    if (nr === 0) {
      setError("Please select amount of questions");
      return;
    } else if (nr < 0) {
      setError("Number can not be under 0");
      return;
    }

    if (topic === "") {
      setError("Please select a topic");
      return;
    }

    axios
      .post("http://localhost:1010/ask", { nr: nr, topic: topic })
      .then((res) => {
        console.log(res);
        setApiRes(res.data);
        setError("");
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
        <label htmlFor="nr">Number of questions</label>
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
          clear();
        }}
      >
        CLEAR
      </button>
      {apiRes &&
        apiRes.map((qb) => (
          <QuestionBlock
            key={qb.question}
            q={qb.question}
            a1={qb.a}
            a2={qb.b}
            a3={qb.c}
            answer={qb.answer}
          />
        ))}
      {error && <div>{error}</div>}
    </>
  );
}

export default App;
