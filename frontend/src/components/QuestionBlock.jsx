import { useState } from "react";

function QuestionBlock({ q, a1, a2, a3, answer }) {
  const [isCorrect, setIsCorrect] = useState("");
  const [canVote, setCanVote] = useState(true);

  function handleVote(x) {
    if (canVote === false) {
      return;
    }

    if (x != answer) {
      setIsCorrect("false");
      setCanVote(false);
    }

    if (x === answer) {
      setIsCorrect("true");
      setCanVote(false);
    }
  }

  return (
    <div>
      <p>{q}</p>
      <ul className="qb-list">
        <li onClick={() => handleVote("a")}>{a1}</li>
        <li onClick={() => handleVote("b")}>{a2}</li>
        <li onClick={() => handleVote("c")}>{a3}</li>
        {isCorrect === "false" && (
          <div>Wrong! Correct answer was: {answer.toUpperCase()}</div>
        )}
        {isCorrect === "true" && <div>Correct!</div>}
      </ul>
    </div>
  );
}

export default QuestionBlock;
