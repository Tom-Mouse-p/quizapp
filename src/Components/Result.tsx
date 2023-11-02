import React from "react";
import ResultTable from "./ResultTable";
import { quizInfo } from "../Pages/quiz";
import "../assets/componentStyles/result.css";

// interface Question {
//     question: string;
//     options: string[];
//     answer: string;
// }

// interface Response {
//     topic: string;
//     questions: Question[];
// }

function result() {
    const calculateScore = () => {
        let score = 0;
        for (let i = 0; i < quizInfo.value.total; i++) {
            if (
                quizInfo.value.userAnswers[i] ===
                quizInfo.value.response.questions[i].answer
            ) {
                score++;
            }
        }
        return score;
    };
    return (
        <div className="quizResult" id="quizResult">
            <div className="quizTitleCard"></div>
            <div id="score">
                <p>
                    Your score: {calculateScore()} out of {quizInfo.value.total}
                </p>
                <div>
                    <table id="quizResultBoard">
                        <thead>
                            <tr>
                                <th>Q no.</th>
                                <th>Your Selection</th>
                                <th>Correct Answer</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quizInfo.value.userAnswers.map((answer, index) => (
                                <ResultTable
                                    key={index}
                                    index={index}
                                    answer={answer}
                                    response={quizInfo.value.response}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bottomDesign"></div>
            <div className="gradient"></div>
        </div>
    );
}

export default result;
