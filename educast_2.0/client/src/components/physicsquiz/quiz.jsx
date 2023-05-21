import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { questionsphysics } from "/Users/shadmansakib/Desktop/SOFTWARE_PROJECT_LAB/client/src/components/physicsquiz/questions.js";

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const navigate = useNavigate();

  const handleClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsphysics.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRedirect = () => {
    if (score > 1) {
      navigate("/tutor");
    }
  };

  return (
    <div className="app" style={{
      textAlign: "center",
      width: "450px",
      minHeight: "200px",
      height: "min-content",
      transform: "translate(-50%, 50%)",
      borderRadius: "15px",
      padding: "20px",
      boxShadow: "10px 10px 42px 0px rgba(0, 0, 0, 0.75)",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "whitesmoke",
      position: "relative",
      top: "5%",
      left: "50%"
    }}>
      {showScore ? (
        <section className="showScore-section" style={{
          fontSize: "35px",
          textAlign: "center",
          position: "absolute",
          top: "40%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
          <p>Your score is {score} out of {questions.length}.</p>
          {score >= 3 ? (
            <>
              <p>You can proceed forward.</p>
              {handleRedirect()}
            </>
          ) : (
            <p>You are not suitable to go forward.</p>
          )}
        </section>
      ) : (
        <>
          <section className="question-section" style={{ marginBottom: "20px" }}>
            <h1 style={{ fontSize: "35px" }}>Question {currentQuestion + 1}/{questions.length}</h1>
            <p style={{ fontSize: "30px" }}>{questions[currentQuestion].questionText}</p>
          </section>

          <section className="answer-section" style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            position: "relative",
            margin: "20px auto",
            maxWidth: "300px",
            rowGap: "30px",
            padding: "20px 40px",
            columnGap: "15px"
          }}>
            {questions[currentQuestion].answerOptions.map((item) => (
              <button
                key={item.answerText}
                onClick={() => handleClick(item.isCorrect)}
                style={{
                  position: "relative",
                  width: "100px",
                  fontSize: "16px",
                  color: "#ffffff",
                  backgroundColor: "#2b3868",
                  borderRadius: "3px",
                  padding: "5px",
                  alignItems: "center",
                  cursor: "pointer",
                  border: "none",
                  textAlign: "center"
                }}
              >
                {item.answerText}
              </button>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
