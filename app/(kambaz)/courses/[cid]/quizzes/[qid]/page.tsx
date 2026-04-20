"use client";
import { RootState } from "@/app/(kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findQuizAttempts, findQuizById, updateQuiz } from "../client";
import { Button, Col, Row } from "react-bootstrap";
import { BiPencil } from "react-icons/bi";

export default function QuizView() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty = ["ADMIN", "FACULTY"].includes((currentUser as any)?.role);

  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>();
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    if (!qid || Array.isArray(qid)) return;
    findQuizById(qid).then((quiz) => setQuiz(quiz));
    findQuizAttempts(qid).then((attempts) => setAttempts(attempts));
  }, [qid]);

  const numPoints = () => {
    if (!quiz) return;
    return quiz.questions.reduce((acc, question) => acc + question.points, 0);
  };

  const router = useRouter();

  const canTake = () => {
    return quiz.howManyAttempts > attempts.length;
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
            {quiz.timeLimit} minutes
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
          <Row className="justify-content-center mt-4">
            <Col xs="auto">
              <Button
                variant="danger"
                disabled={!canTake()}
                onClick={() => router.push(`${qid}/take`)}
              >
                Start
              </Button>
            </Col>
          </Row>
        )}
      </div>
    )
  );
}
