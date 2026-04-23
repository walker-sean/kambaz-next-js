"use client";
import { RootState } from "@/app/(kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findQuizAttempts, findLastQuizAttempt, findQuizById, updateQuiz } from "../client";
import { Button, Col, Row } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";

export default function QuizView() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty = ["ADMIN", "FACULTY"].includes((currentUser as any)?.role);

  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>();
  const [attempts, setAttempts] = useState<any[]>([]);
  const [lastAttempt, setLastAttempt] = useState<any>(null);

  useEffect(() => {
    if (!qid || Array.isArray(qid)) return;
    findQuizById(qid).then((quiz) => setQuiz(quiz));
    findQuizAttempts(qid).then((attempts) => setAttempts(attempts));
    findLastQuizAttempt(qid).then((attempt) => setLastAttempt(attempt));
  }, [qid]);

  const numPoints = () => {
    if (!quiz) return;
    return quiz.questions.reduce((acc: number, question: any) => acc + question.points, 0);
  };

  const router = useRouter();

  const cantTakeReason = (): string | null => {
    if (!quiz.published) return "Quiz is not published.";
    if (new Date() < new Date(quiz.availableDate)) return "Quiz is not yet available.";
    if (new Date() > new Date(quiz.untilDate)) return "Quiz is no longer available.";
    if (!quiz.multipleAttempts && attempts.length >= 1)
      return `You have used all 1 attempt.`;
    if (attempts.length >= quiz.howManyAttempts)
      return `You have used all ${quiz.howManyAttempts} attempt${quiz.howManyAttempts !== 1 ? "s" : ""}.`;
    return null;
  };

  return (
    quiz && (
      <div>
        <h2 className="mb-3">Quiz - {quiz.title}</h2>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Quiz Type
          </Col>
          <Col xs={6} className="text-start">
            {quiz.quizType}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Points
          </Col>
          <Col xs={6} className="text-start">
            {numPoints()}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Assignment Group
          </Col>
          <Col xs={6} className="text-start">
            {quiz.assignmentGroup}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Shuffle Answers
          </Col>
          <Col xs={6} className="text-start">
            {quiz.shuffleAnswers ? "Yes" : "No"}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Time Limit
          </Col>
          <Col xs={6} className="text-start">
            {quiz.timeLimit > 0
              ? `${quiz.timeLimit} minutes`
              : "No Time Limit"}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Multiple Attempts
          </Col>
          <Col xs={6} className="text-start">
            {quiz.multipleAttempts ? "Yes" : "No"}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            How Many Attempts
          </Col>
          <Col xs={6} className="text-start">
            {quiz.howManyAttempts}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Show Correct Answers
          </Col>
          <Col xs={6} className="text-start">
            {quiz.showAnswers ? "Immediately" : "Never"}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Access Code
          </Col>
          <Col xs={6} className="text-start">
            {quiz.accessCode}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            One Question at a Time
          </Col>
          <Col xs={6} className="text-start">
            {quiz.oneQuestionAtATime ? "Yes" : "No"}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Webcam Required
          </Col>
          <Col xs={6} className="text-start">
            {quiz.webcamRequired ? "Yes" : "No"}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Lock Questions After Answering
          </Col>
          <Col xs={6} className="text-start">
            {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Due Date
          </Col>
          <Col xs={6} className="text-start">
            {new Date(quiz.dueDate).toDateString()}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Available Date
          </Col>
          <Col xs={6} className="text-start">
            {new Date(quiz.availableDate).toDateString()}
          </Col>
        </Row>
        <Row className="justify-content-between">
          <Col xs={6} className="fw-bold text-dark text-end">
            Until Date
          </Col>
          <Col xs={6} className="text-start">
            {new Date(quiz.untilDate).toDateString()}
          </Col>
        </Row>
        {isFaculty ? (
          <Row className="justify-content-center mt-4 g-2">
            <Col xs="auto">
              <Button
                variant="secondary"
                onClick={() => router.push(`${qid}/preview`)}
              >
                Preview
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant="secondary"
                onClick={() => router.push(`${qid}/edit`)}
              >
                <BiPencil /> Edit
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                variant={quiz.published ? "danger" : "success"}
                onClick={async () => {
                  const updated = { ...quiz, published: !quiz.published };
                  await updateQuiz(qid, updated);
                  setQuiz(updated);
                }}
              >
                {quiz.published ? "Unpublish" : "Publish"}
              </Button>
            </Col>
          </Row>
        ) : (
          <div className="mt-4">
            {lastAttempt && (
              <div className="mb-3 p-3 border rounded">
                <h5 className="mb-2">Your Last Attempt</h5>
                <p className="mb-1">Score: {lastAttempt.score} / {numPoints()}</p>
                <p className="mb-1">Attempt {lastAttempt.attemptNumber} of {quiz.howManyAttempts}</p>
                <p className="mb-2">{new Date(lastAttempt.submittedAt).toLocaleString()}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/results`)}
                >
                  View Answers
                </Button>
              </div>
            )}
            <Row className="justify-content-center">
              <Col xs="auto">
                {cantTakeReason() ? (
                  <p className="text-muted fw-bold">{cantTakeReason()}</p>
                ) : (
                  <Button
                    variant="danger"
                    onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/take`)}
                  >
                    {lastAttempt ? "Retake Quiz" : "Start Quiz"}
                  </Button>
                )}
              </Col>
            </Row>
          </div>
        )}
      </div>
    )
  );
}
