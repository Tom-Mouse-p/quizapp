import { useState, useEffect } from "react";
import "../assets/styles/quiz.css";
import party from "party-js";

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

    const totalQuestions: number = response.questions.length;
    const [quizTopic, setQuizTopic] = useState<string>("");
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
    const [currentQuestion, setCurrentQuestion] = useState<Question>(
        response.questions[0]
    );
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [userAnswers, setUserAnswers] = useState<string[]>(
        Array(totalQuestions).fill("")
    );

    useEffect(() => {
        setQuizTopic(response.topic);
        handleDisable(true);
    }, []);

    useEffect(() => {
        setCurrentQuestion(response.questions[currentQuizIndex]);
        console.log("updated index", currentQuizIndex);
    }, [currentQuizIndex]);

    const populateBoard = (next: boolean) => {
        if (currentQuizIndex < totalQuestions - 1) {
            if (next) {
                setCurrentQuizIndex(currentQuizIndex + 1);
            } else setCurrentQuizIndex(currentQuizIndex - 1);
        }
    };

    const handleDisable = (toggle: boolean) => {
        const nextButton = document.getElementById(
            "nextButton"
        ) as HTMLButtonElement;

        if (nextButton) nextButton.disabled = toggle;
    };

    const handleSubmit = (next: boolean) => {
        if (currentQuizIndex == totalQuestions - 1) {
            declareResults();
        } else {
            populateBoard(next);
            handleDisable(true);
        }
    };

    const handleSelect = (option: string) => {
        setSelectedOption(option);
        setUserAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[currentQuizIndex] = option;
            return newAnswers;
        });
        handleDisable(false);
    };

    const calculateScore = () => {
        let score = 0;
        for (let i = 0; i < totalQuestions; i++) {
            if (userAnswers[i] === response.questions[i].answer) {
                score++;
            }
        }
        return score;
    };

    const declareResults = () => {
        const resultPage = document.getElementById("quizResult");
        if (resultPage) resultPage.style.display = "flex";

        const score = document.getElementById("score");
        if (score) {
            let count = 0;
            while (count < 3) {
                setTimeout(() => {
                    party.confetti(score);
                }, 2000 * count);
                count++;
            }
        }
    };

    // const reset = () => {
    //     setCurrentQuizIndex(0);
    //     setSelectedOption(null);
    // };

    return (
        <main className="hero">
            <div className="quizTitle">
                <h3>{quizTopic}</h3>
                <span className="questionCounter">
                    {currentQuizIndex + 1}/{totalQuestions}
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
                            onClick={() => handleSelect(option)}
                            key={index}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                <div className="quizNav">
                    <button
                        type="button"
                        id="nextButton"
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
                <div className="quizResult" id="quizResult">
                    <div></div>
                    <p id="score">
                        Your score: {calculateScore()} out of {totalQuestions}
                    </p>
                    <div className="bottomDesign"></div>
                </div>
            </div>
        </main>
    );
}

export default Quiz;
