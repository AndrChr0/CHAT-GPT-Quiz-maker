import { useState } from "react";

function QuestionBlock({
  q = "question",
  a1 = "alternative 1",
  a2 = "alternative 2",
  a3 = "alternative 3",
  answer = "answer",
  userDidVote,
}) {
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
      userDidVote();
    }
  }

  return (
    <div className="question__container">
      <p tabIndex={0} className="question">
        {q}
      </p>
      <ul className="qb-list">
        <button tabIndex={0} onClick={() => handleVote("a")}>
          {a1}
        </button>
        <button tabIndex={0} onClick={() => handleVote("b")}>
          {a2}
        </button>
        <button tabIndex={0} onClick={() => handleVote("c")}>
          {a3}
        </button>
        {isCorrect === "false" && (
          <div className="answer_result--wrong">
            Wrong! Correct answer was {answer.toUpperCase()}
          </div>
        )}
        {isCorrect === "true" && (
          <div className="answer_result--correct">Correct!</div>
        )}
      </ul>
    </div>
  );
}

export default QuestionBlock;
