import { PiPlus } from "react-icons/pi";
import GreenCheckmark from "../../../modules/GreenCheckmark";

export default function QuestionsTab({quiz, setQuiz}) {
    console.log(JSON.stringify(quiz.questions, null, 2));

    const enumPipe = (enumString) => {
        return enumString
            .split("_")
            .map(word => word.charAt(0) + word.slice(1).toLowerCase())
            .join(" ");
    }

    return <div>
        {quiz.questions.map((question, index) => (
            <div key={index} className="mb-4 p-3 border rounded">
                <h4>{question.title} - {question.points} pts</h4>
                <h5>{enumPipe(question.type)}</h5>
                <p>{question.question}</p>
                <ul>
                    {question.choices?.map((option, optionIndex) => (
                        <li key={optionIndex}>
                            {option.text} {option.isCorrect && <GreenCheckmark />}
                        </li>
                    ))}
                </ul>
                {question.correctAnswer !== null && (
                    <p>
                        Correct Answer:{" "}
                        {question.correctAnswer ? 'True' : 'False'}
                    </p>
                )}
                {question.correctResponses.length > 0 && (
                    <div>
                        <p>Correct Responses:</p>
                        <ul>
                            {question.correctResponses.map((response, responseIndex) => (
                                <li key={responseIndex}>{response}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        ))}
        <div className="d-flex justify-content-center">
            <button className="btn btn-secondary" onClick={() => {
                const newQuestion = {
                    title: "New Question",
                    question: "",
                    type: "MULTIPLE_CHOICE",
                    points: 1,
                    choices: [],
                    correctAnswer: null,
                    correctResponses: []
                };
                setQuiz(prevQuiz => ({
                    ...prevQuiz,
                    questions: [...prevQuiz.questions, newQuestion]
                }));
            }}>
                <PiPlus /> Add Question
            </button>
        </div>
    </div>
}