import { useState, useEffect } from "react";
import "../assets/styles/quiz.css";

interface Question {
    question: string;
    options: string[];
    answer: string;
}

interface Response {
    topic: string;
    questions: Question[];
}

function Quiz() {
    const response: Response = {
        topic: "World Capitals",
        questions: [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                answer: "Paris",
            },
            {
                question: "Which city is the capital of Japan?",
                options: ["Beijing", "Seoul", "Tokyo", "Osaka"],
                answer: "Tokyo",
            },
            {
                question: "Canberra is the capital of which country?",
                options: ["Australia", "New Zealand", "Canada", "Fiji"],
                answer: "Australia",
            },
        ],
    };

    const [quizTopic, setQuizTopic] = useState<string>("");

    const [currentQuestion, setCurrentQuestion] = useState<Question>(
        response.questions[0]
    );
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const totalQuestions: number = response.questions.length;

    useEffect(() => {
        setQuizTopic(response.topic);
        populateBoard(response, true);
    }, []);

    const populateBoard = (response: Response, next: boolean) => {
        if (currentQuizIndex < totalQuestions) {
            if (next) {
                setCurrentQuizIndex(currentQuizIndex + 1);
            } else setCurrentQuizIndex(currentQuizIndex - 1);
            setCurrentQuestion(response.questions[currentQuizIndex]);
        }
    };

    const handleSubmit = (next: boolean) => {
        populateBoard(response, next);
    };

    return (
        <main className="hero">
            <div className="quizTitle">
                <h3>{quizTopic}</h3>
                <span className="questionCounter">
                    {currentQuizIndex}/{totalQuestions}
                </span>
            </div>
            <div className="quizContainer">
                <p>{currentQuestion.question}</p>
                <div className="optionList">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            type="button"
                            className={`quiz-button ${
                                selectedOption === option ? "selected" : ""
                            }`}
                            onClick={() => setSelectedOption(option)}
                            key={index}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="quizNav">
                    <button
                        type="button"
                        className="nextButton"
                        onClick={() => handleSubmit(true)}
                    >
                        {currentQuizIndex < totalQuestions ? "Next" : "Submit"}
                    </button>
                    {/* {currentQuizIndex > 1 && (
                        <button
                            type="button"
                            className="backButton"
                            onClick={() => handleSubmit(false)}
                        >
                            Back
                        </button>
                    )} */}
                </div>
            </div>
        </main>
    );
}

export default Quiz;
