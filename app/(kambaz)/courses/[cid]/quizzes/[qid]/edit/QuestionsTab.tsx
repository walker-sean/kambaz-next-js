import { PiPlus } from "react-icons/pi";
import { FaPencil, FaTrash } from "react-icons/fa6";
import GreenCheckmark from "../../../modules/GreenCheckmark";
import QuestionEditor from "./QuestionEditor";

export default function QuestionsTab({quiz, setQuiz}: {quiz: any; setQuiz: (q: any) => void}) {
    console.log(JSON.stringify(quiz.questions, null, 2));

    const enumPipe = (enumString: string) => {
        return enumString
            .split("_")
            .map(word => word.charAt(0) + word.slice(1).toLowerCase())
            .join(" ");
    }

    const handleEditButtonClick = (index: number) => {
        setQuiz((prevQuiz: any) => {
            const updatedQuestions = [...prevQuiz.questions];
            updatedQuestions[index].editing = true;
            return { ...prevQuiz, questions: updatedQuestions };
        });
    };

    return <div>
        {quiz.questions.map((question: any, index: number) => question.editing ? <QuestionEditor key={index} question={question} setQuestion={(updatedQuestion: any) => {
            setQuiz((prevQuiz: any) => {
                const updatedQuestions = [...prevQuiz.questions];
                updatedQuestions[index] = updatedQuestion;
                return { ...prevQuiz, questions: updatedQuestions };
            });
        }} /> : (
            <div key={index} className="mb-4 p-3 border rounded">
                <h4 className="d-flex align-items-center">
                    <span className="flex-grow-1">{question.title} - {question.points} pts</span>
                    <FaPencil
                        role="button"
                        title="Edit"
                        aria-label="Edit question"
                        className="text-primary me-3"
                        onClick={() => handleEditButtonClick(index)}
                    />
                    <FaTrash
                        role="button"
                        title="Delete"
                        aria-label="Delete question"
                        className="text-danger me-2"
                        onClick={() => {
                            setQuiz((prevQuiz: any) => {
                                const updatedQuestions = prevQuiz.questions.filter((_: any, i: number) => i !== index);
                                return { ...prevQuiz, questions: updatedQuestions };
                            });
                        }}
                    />
                </h4>
                <h5>{enumPipe(question.type)}</h5>
                <p>{question.question}</p>
                <ul>
                    {question.choices?.map((option: any, optionIndex: number) => (
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
                {question.correctResponses?.length > 0 && (
                    <div>
                        <p>Correct Responses:</p>
                        <ul>
                            {question.correctResponses.map((response: any, responseIndex: number) => (
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
                    choices: [{ text: "Choice 1", isCorrect: true }, { text: "Choice 2", isCorrect: false }],
                    correctAnswer: null,
                    correctResponses: [],
                    editing: true
                };
                setQuiz((prevQuiz: any) => ({
                    ...prevQuiz,
                    questions: [...prevQuiz.questions, newQuestion]
                }));
            }}>
                <PiPlus /> Add Question
            </button>
        </div>
    </div>
}