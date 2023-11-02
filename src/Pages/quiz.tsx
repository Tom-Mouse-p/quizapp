import { useState, useEffect } from "react";
import "../assets/pageStyles/quiz.css";
import party from "party-js";
import { signal } from "@preact/signals-react";
import Result from "../Components/Result";

interface Question {
    question: string;
    options: string[];
    answer: string;
}

interface Response {
    topic: string;
    questions: Question[];
}

interface QuizInfo {
    title: string;
    currentIndex: number;
    total: number;
    userAnswers: string[];
    response: Response;
}

export const quizInfo = signal<QuizInfo>({
    title: "",
    currentIndex: 0,
    total: 0,
    userAnswers: [],
    response: {
        topic: "Your Quiz Topic",
        questions: [],
    },
});

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

    quizInfo.value = {
        title: quizTopic,
        total: totalQuestions,
        currentIndex: currentQuizIndex,
        userAnswers: userAnswers,
        response: response,
    };

    useEffect(() => {
        setQuizTopic(response.topic);
        handleDisable(true);
    }, []);

    useEffect(() => {
        setCurrentQuestion(response.questions[currentQuizIndex]);
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

    const declareResults = () => {
        const resultPage = document.getElementById("quizResult");
        if (resultPage) {
            resultPage.style.display = "flex";
        }

        const score = document.getElementById("score");
        if (score) {
            let count = 0;
            while (count < 4) {
                setTimeout(() => {
                    party.confetti(score);
                }, 2000 * count);
                count++;
            }
        }
    };

    const reset = () => {
        setCurrentQuizIndex(0);
        setSelectedOption(null);
        handleDisable(true);

        const resultPage = document.getElementById("quizResult");
        if (resultPage) {
            resultPage.style.display = "none";
        }
    };

    // declareResults();

    return (
        <>
            <main className="hero">
                <div className="quizContainer">
                    <p>
                        <span>Q. {currentQuizIndex + 1}</span>{" "}
                        {currentQuestion.question}
                    </p>
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
                            {currentQuizIndex < totalQuestions
                                ? "Proceed"
                                : "Submit"}
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
                <Result reset={reset} />
            </main>
        </>
    );
}

export default Quiz;
