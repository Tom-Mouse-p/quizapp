import React from "react";

interface Response {
    topic: string;
    questions: Question[];
}
interface Question {
    question: string;
    options: string[];
    answer: string;
}
interface ResultTableProps {
    index: number;
    answer: string;
    response: Response;
}

function ResultTable({ index, answer, response }: ResultTableProps) {
    const tableContainers = document.getElementsByClassName("tableContainer");
    // const tableQuestion = document.getElementsByClassName("tableContainer");

    Array.from(tableContainers).forEach((element) => {
        element.addEventListener("mouseenter", () => {
            const key = element.getAttribute("data-key");
            const questionElement = document.getElementById(
                "tableQuestion" + key
            );
            if (questionElement) {
                // console.log(questionElement.style.display);

                questionElement.style.display = "inline";
                // questionElement.style.backgroundColor = "red";
            }
        });

        element.addEventListener("mouseleave", () => {
            const key = element.getAttribute("data-key");
            const questionElement = document.getElementById(
                "tableQuestion" + key
            );
            if (questionElement) {
                questionElement.style.display = "none"; // or your preferred style to hide the element
                // questionElement.style.backgroundColor = "white"; // or your preferred style to hide the element
            }
        });
    });
    return (
        <React.Fragment key={index}>
            <tr
                className="tableContainer"
                id={"tableContainer" + index}
                data-key={index}
            >
                <td>{index + 1}</td>
                <td
                    className={
                        answer === response.questions[index].answer
                            ? "correct"
                            : "incorrect"
                    }
                >
                    {answer}
                </td>
                <td>{response.questions[index].answer}</td>
            </tr>
            <tr className="tableQuestion" id={"tableQuestion" + index}>
                <td colSpan={3}>
                    Q.{index + 1} {response.questions[index].question}
                </td>
            </tr>
        </React.Fragment>
    );
}

export default ResultTable;
