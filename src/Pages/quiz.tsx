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
                options: ["London", "Berlin", "Paris"],
                answer: "Paris",
            },
            {
                question: "Which city is the capital of Japan?",
                options: ["Beijing", "Seoul", "Tokyo"],
                answer: "Tokyo",
            },
            {
                question: "Canberra is the capital of which country?",
                options: ["Australia", "New Zealand", "Canada"],
                answer: "Australia",
            },
            {
                question: "What is the capital of Brazil?",
                options: ["Buenos Aires", "Sao Paulo", "Brasilia"],
                answer: "Brasilia",
            },
        ],
    };

    const [quizTopic, setQuizTopic] = useState<string>("");
    const [currentQuestion, setCurrentQuestion] = useState<Question>(
        response.questions[0] // Initial question
    );
    const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(3);
    const totalQuestions: number = response.questions.length;

    useEffect(() => {
        setQuizTopic(response.topic);
        populateBoard(response);
    }, []);

    function populateBoard(response: Response) {
        if (currentQuizIndex < totalQuestions) {
            setCurrentQuizIndex(currentQuizIndex + 1);
            setCurrentQuestion(response.questions[currentQuizIndex]);
        }
    }

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
                        <button type="button" value={option} key={index}>
                            {option}
                        </button>
                    ))}
                </div>
                <div className="quizNav">
                    {currentQuizIndex < totalQuestions ? (
                        <button className="nextButton">Next</button>
                    ) : (
                        <button className="nextButton">Submit</button>
                    )}
                    {currentQuizIndex > 1 && (
                        <button className="backButton">Back</button>
                    )}
                </div>
            </div>
        </main>
    );
}

export default Quiz;
