import React from "react";
import { useNavigate } from "react-router-dom";

function QuizError() {
  const navigate = useNavigate();
  return (
    <>
      <div className="error-container">
        <h2>No Quiz Data Found</h2>
        <button onClick={() => navigate("/")}>Go Back Home</button>
      </div>
    </>
  );
}

export default QuizError;
