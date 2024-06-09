import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [apiRes, setApiRes] = useState("");
  const [er, setEr] = useState("");

  function handleSubmission(event) {
    event.preventDefault();
    if (!prompt) {
      setEr("a prompt cannot be empty");
      return;
    }
    axios
      .post("http://localhost:1010/ask", { prompt: prompt })
      .then((res) => {
        console.log(res);
        setApiRes(res.data);
        setPrompt("");
        setEr("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1>ChatGPT at Home</h1>
      <form onSubmit={handleSubmission}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button type="submit">POST</button>
      </form>

      <button
        type="button"
        onClick={() => {
          setApiRes("");
          setPrompt("");
          setEr("");
        }}
      >
        CLEAR
      </button>
      {apiRes && <div className="api-res">{apiRes}</div>}
      {er && <div>{er}</div>}
    </>
  );
}

export default App;
