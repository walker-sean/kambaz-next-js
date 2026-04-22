import { useState } from "react";
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa6";
import { PiPlus } from "react-icons/pi";

const typeDefaults = (type: string) => {
  switch (type) {
    case "MULTIPLE_CHOICE":
      return {
        choices: [{ text: "", isCorrect: true }, { text: "", isCorrect: false }],
        correctAnswer: null,
        correctResponses: null,
      };
    case "TRUE_OR_FALSE":
      return { choices: null, correctAnswer: true, correctResponses: null };
    case "FILL_IN_THE_BLANK":
      return { choices: null, correctAnswer: null, correctResponses: [""] };
    default:
      return {};
  }
};

export default function QuestionEditor({ question, setQuestion }: { question: any; setQuestion: (q: any) => void }) {
  const [currentQuestion, setCurrentQuestion] = useState(question);

  const isValid = () => {
    if (!currentQuestion.title?.trim() || !currentQuestion.question?.trim()) return false;
    if (!currentQuestion.points || currentQuestion.points <= 0) return false;
    if (currentQuestion.type === "MULTIPLE_CHOICE") {
      if (currentQuestion.choices.length < 2) return false;
      if (currentQuestion.choices.some((c: any) => !c.text.trim())) return false;
      if (!currentQuestion.choices.some((c: any) => c.isCorrect)) return false;
    }
    if (currentQuestion.type === "FILL_IN_THE_BLANK") {
      if (currentQuestion.correctResponses.length < 1) return false;
      if (currentQuestion.correctResponses.some((r: any) => !r.trim())) return false;
    }
    return true;
  };

  return (
    <Form className="mb-4 p-3 border rounded">
      <FormLabel>Title</FormLabel>
      <FormControl
        className="mb-3"
        value={currentQuestion.title}
        onChange={(e) => setCurrentQuestion({ ...currentQuestion, title: e.target.value })}
        placeholder="Question Title"
      />

      <Row className="mb-3">
        <Col>
          <FormLabel>Question Type</FormLabel>
          <FormSelect
            value={currentQuestion.type}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, type: e.target.value, ...typeDefaults(e.target.value) })}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_OR_FALSE">True/False</option>
            <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
          </FormSelect>
        </Col>
        <Col>
          <FormLabel>Points</FormLabel>
          <FormControl
            type="number"
            value={currentQuestion.points}
            onChange={(e) => setCurrentQuestion({ ...currentQuestion, points: parseInt(e.target.value) || 0 })}
          />
        </Col>
      </Row>

      <FormLabel>Question</FormLabel>
      <FormControl
        as="textarea"
        className="mb-3"
        rows={3}
        value={currentQuestion.question ?? ""}
        onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
        placeholder="Question Text"
      />

      {currentQuestion.type === "MULTIPLE_CHOICE" && (
        <div className="mb-3">
          <FormLabel>Choices</FormLabel>
          {currentQuestion.choices.map((choice: any, i: number) => (
            <Row key={i} className="mb-2 align-items-center">
              <Col xs="auto">
                <FormCheck
                  type="radio"
                  name="correct-choice"
                  checked={!!choice.isCorrect}
                  onChange={() => setCurrentQuestion({
                    ...currentQuestion,
                    choices: currentQuestion.choices.map((c: any, j: number) => ({ ...c, isCorrect: j === i })),
                  })}
                />
              </Col>
              <Col>
                <FormControl
                  value={choice.text}
                  onChange={(e) => setCurrentQuestion({
                    ...currentQuestion,
                    choices: currentQuestion.choices.map((c: any, j: number) => j === i ? { ...c, text: e.target.value } : c),
                  })}
                  placeholder={`Choice ${i + 1}`}
                />
              </Col>
              <Col xs="auto">
                <FaTrash
                  role="button"
                  className={`text-danger me-2${currentQuestion.choices.length <= 2 ? " opacity-25 pe-none" : ""}`}
                  onClick={() => setCurrentQuestion({
                    ...currentQuestion,
                    choices: currentQuestion.choices.filter((_: any, j: number) => j !== i),
                  })}
                />
              </Col>
            </Row>
          ))}
          <button type="button" className="btn btn-secondary" onClick={() => setCurrentQuestion({
            ...currentQuestion,
            choices: [...currentQuestion.choices, { text: "", isCorrect: false }],
          })}>
            <PiPlus /> Add Choice
          </button>
        </div>
      )}

      {currentQuestion.type === "TRUE_OR_FALSE" && (
        <div className="mb-3">
          <FormLabel>Correct Answer</FormLabel>
          <FormCheck type="radio" name="tf" label="True"
            checked={currentQuestion.correctAnswer === true}
            onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: true })} />
          <FormCheck type="radio" name="tf" label="False"
            checked={currentQuestion.correctAnswer === false}
            onChange={() => setCurrentQuestion({ ...currentQuestion, correctAnswer: false })} />
        </div>
      )}

      {currentQuestion.type === "FILL_IN_THE_BLANK" && (
        <div className="mb-3">
          <FormLabel>Possible Correct Answers</FormLabel>
          {currentQuestion.correctResponses.map((response: any, i: number) => (
            <Row key={i} className="mb-2 align-items-center">
              <Col>
                <FormControl
                  value={response}
                  onChange={(e) => setCurrentQuestion({
                    ...currentQuestion,
                    correctResponses: currentQuestion.correctResponses.map((r: any, j: number) => j === i ? e.target.value : r),
                  })}
                  placeholder={`Answer ${i + 1}`}
                />
              </Col>
              <Col xs="auto">
                <FaTrash
                  role="button"
                  className={`text-danger me-2${currentQuestion.correctResponses.length <= 1 ? " opacity-25 pe-none" : ""}`}
                  onClick={() => setCurrentQuestion({
                    ...currentQuestion,
                    correctResponses: currentQuestion.correctResponses.filter((_: any, j: number) => j !== i),
                  })}
                />
              </Col>
            </Row>
          ))}
          <button type="button" className="btn btn-secondary" onClick={() => setCurrentQuestion({
            ...currentQuestion,
            correctResponses: [...currentQuestion.correctResponses, ""],
          })}>
            <PiPlus /> Add Answer
          </button>
        </div>
      )}

      <div className="d-flex gap-2 mt-3">
        <Button variant="danger" onClick={() => setQuestion({ ...currentQuestion, editing: false })} disabled={!isValid()}>
          Save
        </Button>
        <Button variant="secondary" onClick={() => setQuestion({ ...question, editing: false })}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
