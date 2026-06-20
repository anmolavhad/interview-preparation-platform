import { useLocation } from "react-router-dom";

function Result() {
  const location = useLocation();

  const { attempt } = location.state || {};

  return (
    <div>
      <h1>Result</h1>

      <p>
        Score:{attempt?.score}
      </p>

      <p>
        Correct Answers:{attempt?.correctAnswers}
      </p>

      <p>
        Accuracy:{attempt?.accuracy}%
      </p>
    </div>
  );
}

export default Result; 