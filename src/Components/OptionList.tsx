interface Question {
    question: string;
    options: string[];
    answer: string;
}
function OptionList(
    question: Question,
    selectedOption: string,
    handleSelect: Function
) {
    const currentQuestion: Question = question;
    return (
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
    );
}

export default OptionList;
