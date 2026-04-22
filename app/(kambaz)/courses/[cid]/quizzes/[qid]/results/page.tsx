"use client";
import { useEffect, useState } from "react";
import { findQuizById, findLastQuizAttempt, findQuizAttempts } from "../../client";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { FaBan } from "react-icons/fa6";
import GreenCheckmark from "../../../modules/GreenCheckmark";

export default function QuizResults() {
  const { cid, qid } = useParams();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [attempt, setAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);

  useEffect(() => {
    if (!qid || Array.isArray(qid)) return;
    findQuizById(qid).then((q: any) => setQuiz(q));
    findLastQuizAttempt(qid).then((a: any) => setAttempt(a));
    findQuizAttempts(qid).then((attempts: any) => setAttemptCount(attempts?.length ?? 0));
  }, [qid]);

  if (!quiz || !attempt) return null;

  const questions = quiz.questions ?? [];

  const getResponse = (questionId: string) => {
    return attempt.answers?.find((a: any) => a.questionId === questionId)?.response;
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
          ?.map((cr: string) => cr.toLowerCase())
          .includes((response as string).toLowerCase());
      default:
        return false;
    }
  };

  const totalPoints = questions.reduce((sum: number, q: any) => sum + q.points, 0);
  const canRetake = quiz.multipleAttempts
    ? attemptCount < quiz.howManyAttempts
    : attemptCount < 1;

  return (
    <div>
      <h3>{quiz.title} - Results</h3>
      <h4 className="mb-4">
        Score: {attempt.score} / {totalPoints}
      </h4>
      <p className="text-muted">
        Attempt {attempt.attemptNumber} of {quiz.howManyAttempts}
        {" | "}Submitted: {new Date(attempt.submittedAt).toLocaleString()}
      </p>
      {questions.map((question: any) => {
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
        {canRetake && (
          <Button variant="danger" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}>
            Retake Quiz
          </Button>
        )}
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
          Back to Quiz
        </Button>
      </div>
    </div>
  );
}
