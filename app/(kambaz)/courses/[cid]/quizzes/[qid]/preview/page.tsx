"use client";
import { useEffect, useState } from "react";
import { findQuizById } from "../../client";
import { useParams, useRouter } from "next/navigation";
import { Button, Form, FormCheck, FormControl } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";
import { FaBan } from "react-icons/fa6";
import GreenCheckmark from "../../../modules/GreenCheckmark";

export default function QuizPreview() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<{ questionId: string; response: any }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!qid || Array.isArray(qid)) return;
    findQuizById(qid).then((fetchedQuiz: any) => setQuiz(fetchedQuiz));
  }, [qid]);

  if (!quiz) return null;

  const questions = quiz.questions ?? [];
  const currentQuestion = questions[currentIndex];

  const getResponse = (questionId: string) => {
    return answers.find((answer) => answer.questionId === questionId)?.response;
  };

  const setAnswer = (questionId: string, response: any) => {
    setAnswers((prev) => {
      const existing = prev.find((answer) => answer.questionId === questionId);
      if (existing) return prev.map((answer) => answer.questionId === questionId ? { ...answer, response } : answer);
      return [...prev, { questionId, response }];
    });
  };

  const isCorrect = (question: any) => {
    const response = getResponse(question._id);
    if (response === undefined || response === null) return false;
    switch (question.type) {
      case "MULTIPLE_CHOICE": {
        const chosenChoice = question.choices?.find((choice: any) => choice._id === response);
        return !!chosenChoice?.isCorrect;
      }
      case "TRUE_OR_FALSE":
        return question.correctAnswer === response;
      case "FILL_IN_THE_BLANK":
        return question.correctResponses
          ?.map((correctResponse: string) => correctResponse.toLowerCase())
          .includes(response.toLowerCase());
      default:
        return false;
    }
  };

  const computeScore = () =>
    questions.reduce(
      (score: { earned: number; total: number }, question: any) => ({
        earned: score.earned + (isCorrect(question) ? question.points : 0),
        total: score.total + question.points,
      }),
      { earned: 0, total: 0 },
    );

  const handleSubmit = () => setSubmitted(true);

  const handleRetake = () => {
    setAnswers([]);
    setCurrentIndex(0);
    setSubmitted(false);
  };

  if (questions.length === 0) {
    return (
      <div>
        <h3>Quiz Preview - {quiz.title}</h3>
        <p className="text-muted">This quiz has no questions.</p>
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
          <BiPencil /> Edit Quiz
        </Button>
      </div>
    );
  }

  if (submitted) {
    const { earned, total } = computeScore();
    return (
      <div>
        <h3>Quiz Preview - {quiz.title}</h3>
        <h4 className="mb-4">
          Score: {earned} / {total}
        </h4>
        {questions.map((question: any, index: number) => {
          const correct = isCorrect(question);
          return (
            <div key={question._id} className="mb-3 p-3 border rounded">
              <h5 className="d-flex align-items-center gap-2">
                {correct ? <GreenCheckmark /> : <FaBan className="text-danger" />}
                {question.title} - {question.points} pts
              </h5>
              <p>{question.question}</p>
              {question.type === "MULTIPLE_CHOICE" &&
                question.choices?.map((choice: any) => {
                  const selected = getResponse(question._id) === choice._id;
                  return (
                    <div key={choice._id} className="ps-3 d-flex align-items-center gap-1">
                      {selected && correct ? <GreenCheckmark /> : selected && !correct ? <FaBan className="text-danger" /> : !selected && choice.isCorrect && !correct ? <GreenCheckmark /> : <span className="me-3" />}
                      {selected ? <><strong>{choice.text}</strong> (your choice)</> : choice.text}
                    </div>
                  );
                })}
              {question.type === "TRUE_OR_FALSE" && (
                <div className="ps-3">
                  Your answer: <strong>{getResponse(question._id) === true ? "True" : getResponse(question._id) === false ? "False" : "No answer"}</strong>
                  {" | "}Correct: <strong>{question.correctAnswer ? "True" : "False"}</strong>
                </div>
              )}
              {question.type === "FILL_IN_THE_BLANK" && (
                <div className="ps-3">
                  Your answer: <strong>{getResponse(question._id) || "(blank)"}</strong>
                  {" | "}Accepted: <strong>{question.correctResponses?.join(", ")}</strong>
                </div>
              )}
            </div>
          );
        })}
        <div className="d-flex gap-2 mt-3">
          <Button variant="secondary" onClick={handleRetake}>
            Retake
          </Button>
          <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}>
            <BiPencil /> Edit Quiz
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h3>Quiz Preview - {quiz.title}</h3>
      <p className="text-muted">
        Question {currentIndex + 1} of {questions.length}
      </p>

      <div key={currentQuestion._id} className="p-3 border rounded mb-3">
        <h5>{currentQuestion.title} - {currentQuestion.points} pts</h5>
        <p>{currentQuestion.question}</p>

        {currentQuestion.type === "MULTIPLE_CHOICE" && (
          <Form>
            {currentQuestion.choices?.map((choice: any) => (
              <FormCheck
                key={choice._id}
                type="radio"
                name={`q-${currentQuestion._id}`}
                label={choice.text}
                checked={getResponse(currentQuestion._id) === choice._id}
                onChange={() => setAnswer(currentQuestion._id, choice._id)}
              />
            ))}
          </Form>
        )}

        {currentQuestion.type === "TRUE_OR_FALSE" && (
          <Form>
            <FormCheck
              type="radio"
              name={`q-${currentQuestion._id}`}
              label="True"
              checked={getResponse(currentQuestion._id) === true}
              onChange={() => setAnswer(currentQuestion._id, true)}
            />
            <FormCheck
              type="radio"
              name={`q-${currentQuestion._id}`}
              label="False"
              checked={getResponse(currentQuestion._id) === false}
              onChange={() => setAnswer(currentQuestion._id, false)}
            />
          </Form>
        )}

        {currentQuestion.type === "FILL_IN_THE_BLANK" && (
          <FormControl
            value={getResponse(currentQuestion._id) ?? ""}
            onChange={(event) => setAnswer(currentQuestion._id, event.target.value)}
            placeholder="Type your answer"
          />
        )}
      </div>

      <div className="d-flex justify-content-between">
        <Button
          variant="secondary"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((prev) => prev - 1)}
        >
          Back
        </Button>
        {currentIndex < questions.length - 1 ? (
          <Button
            variant="secondary"
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          >
            Next
          </Button>
        ) : (
          <Button variant="danger" onClick={handleSubmit}>
            Submit
          </Button>
        )}
      </div>

      <Button
        variant="secondary"
        className="mt-3"
        onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/edit`)}
      >
        <BiPencil /> Edit Quiz
      </Button>
    </div>
  );
}
