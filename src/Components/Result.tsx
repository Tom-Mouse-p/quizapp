import ResultTable from "./ResultTable";
import { quizInfo } from "../Pages/quiz";
import "../assets/componentStyles/result.css";
import { Link } from "react-router-dom";

interface Reset {
    reset: () => void;
}

function result(reset: Reset) {
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
                <div className="endResultNav">
                    <nav>
                        <Link className="buttonPrimary" to="/">
                            Home
                        </Link>
                        <a
                            className="buttonPrimary"
                            onClick={() => {
                                console.log("ok");

                                reset.reset();
                            }}
                        >
                            Restart
                        </a>
                    </nav>
                </div>
            </div>
            <div className="bottomDesign"></div>
            <div className="gradient"></div>
            <div className="gradient2"></div>
        </div>
    );
}

export default result;
