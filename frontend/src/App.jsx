import { useState } from "react";
import "./App.css";
import axios from "axios";
import QuestionBlock from "./components/QuestionBlock";
import Footer from "./components/Footer";

function App() {
  const [nr, setNr] = useState(5);
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");

  const [apiRes, setApiRes] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  function userDidVote() {
    setCorrectCount((prevCount) => prevCount + 1);
  }

  function clear() {
    setApiRes("");
    setError("");
    setTopic("");
    setNr(5);
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

    setIsLoading(true);

    const makeRequest = () => {
      axios
        .post("http://localhost:1010/ask", {
          nr: nr,
          topic: topic,
          difficulty: difficulty,
        })
        .then((res) => {
          const data = res.data;
          if (Object.keys(data[0]).length === 1) {
            setError("Generated quiz failed, retrying...");
            makeRequest();
          } else {
            setApiRes(data);
            setError("");
            setIsLoading(false);
            setCorrectCount(0);
          }
        })
        .catch((err) => {
          console.log(err);
          setError("An error occurred. Please try again.");
        });
    };

    makeRequest();
  }

  return (
    <div className="quiz__container">
      <h1>&#128161; Quiz Creator </h1>
      <form className="config__form" onSubmit={handleSubmission}>
        <label htmlFor="nr">Number of questions</label>

        <select id="nr" name="nr" onChange={(e) => setNr(e.target.value)}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>

        <label htmlFor="topic">Topic</label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <label htmlFor="difficulty">Difficulty</label>
        <select
          id="difficulty"
          name="difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button type="submit">Generate</button>

        {isLoading && <span className="loading">Loading...</span>}
      </form>

      <button
        className="button__clear"
        type="button"
        onClick={() => {
          clear();
        }}
      >
        CLEAR
      </button>
      {apiRes && apiRes.length > 1 && (
        <div className="correct__count">
          Correct answers: {correctCount}/{apiRes.length}
        </div>
      )}

      {apiRes &&
        apiRes.map((qb) => (
          <QuestionBlock
            key={qb.question}
            q={qb.question}
            a1={qb.a}
            a2={qb.b}
            a3={qb.c}
            answer={qb.answer}
            userDidVote={userDidVote}
          />
        ))}
      {error && <div>{error}</div>}
      <Footer />
    </div>
  );
}

export default App;
