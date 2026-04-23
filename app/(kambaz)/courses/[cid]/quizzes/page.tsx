"use client";

import { RootState } from "@/app/(kambaz)/store";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  createQuiz,
  deleteQuiz,
  findCourseQuizAttempts,
  findQuizzesForCourse,
  updateQuiz,
} from "./client";
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Modal,
  Row,
} from "react-bootstrap";
import Link from "next/link";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FaBan, FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { LuRocket } from "react-icons/lu";
import AssignmentHeaderControlButtons from "../assignments/AssignmentHeaderControlButtons";
import QuizControlButtons from "./QuizControlButtons";
import GreenCheckmark from "../modules/GreenCheckmark";

export default function QuizList() {
  const router = useRouter();
  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [quizToDelete, setQuizToDelete] = useState<any>();

  const fetchQuizzes = useCallback(async () => {
    if (!cid || Array.isArray(cid)) return;
    findQuizzesForCourse(cid).then((quizzes) => {
      setQuizzes(quizzes.sort((a: any, b: any) => new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime()));
    });
  }, [cid]);

  useEffect(() => {
    fetchQuizzes();
  }, [fetchQuizzes]);

  useEffect(() => {
    const fetchAttempts = async () => {
      if (!cid || Array.isArray(cid)) return;
      const attempts = await findCourseQuizAttempts(cid);
      setAttempts(attempts);
      console.log(attempts);
    };
    fetchAttempts();
  }, [cid]);

  const lastQuizAttemptScore = (quizId: string) => {
    const quizAttempts = attempts.filter((attempt: any) => attempt.quiz === quizId);
    if (quizAttempts.length === 0) return;
    const latestAttempt = quizAttempts.reduce(
      (acc: any, current: any) => (current.attemptNumber > acc.attemptNumber ? current : acc),
      quizAttempts[0],
    );
    return latestAttempt.score;
  };

  const isFaculty = ["ADMIN", "FACULTY"].includes((currentUser as any)?.role);

  const handleConfirm = async () => {
    if (!quizToDelete) return;
    await deleteQuiz(quizToDelete._id);
    setQuizToDelete(undefined);
    await fetchQuizzes();
  };

  const handleCreateQuiz = async () => {
    if (!cid || Array.isArray(cid)) return;
    const newQuiz = await createQuiz({ course: cid, title: "Unnamed Quiz" });
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/edit`);
  };

  const quizAvailability = (quiz: any) => {
    const now = new Date();
    const untilDate = new Date(quiz.untilDate);
    const availableDate = new Date(quiz.availableDate);
    if (now > untilDate) {
      return "Closed";
    }
    if (now >= availableDate && now <= untilDate) {
      return "Available";
    }
    return `Not available until ${availableDate.toLocaleString()}`;
  };

  const quizTotalPoints = (quiz: any) => {
    return quiz.questions.reduce((acc: number, question: any) => acc + question.points, 0);
  };

  const togglePublished = async (quiz: any) => {
    await updateQuiz(quiz._id, { ...quiz, published: !quiz.published });
    await fetchQuizzes();
  };

  return (
    <div id="wd-quizzes">
      <Modal show={!!quizToDelete} onHide={() => setQuizToDelete(undefined)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove {quizToDelete?.title}?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setQuizToDelete(undefined)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm}>
            Yes, Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup className="w-50">
          <InputGroupText>
            <FaMagnifyingGlass />
          </InputGroupText>
          <FormControl placeholder="Search..." />
        </InputGroup>
        <div className="d-flex">
          {isFaculty && (
            <Button
              variant="danger"
              id="wd-add-quiz"
              onClick={handleCreateQuiz}
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />{" "}
              Quiz
            </Button>
          )}
        </div>
      </div>
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            QUIZZES <AssignmentHeaderControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {isFaculty && quizzes.length === 0 ? (
              <div className="fw-bold text-dark">
                No quizzes yet.{" "}
                {isFaculty && 'Use the "+ Quiz" button above to create one.'}
              </div>
            ) : (
              quizzes.map((quiz: any) => (
                <ListGroupItem key={quiz._id} className="wd-lesson p-3 ps-1">
                  <Row className="align-items-center">
                    <Col xs="auto">
                      <BsGripVertical className="me-2 fs-3" />
                      <LuRocket className="me-2 fs-3 text-success" />
                    </Col>
                    <Col>
                      <Link
                        href={`quizzes/${quiz._id}`}
                        className="wd-quiz-link text-decoration-none fw-bold text-dark"
                      >
                        {quiz.title}
                      </Link>
                      <p>
                        <b>{quizAvailability(quiz)}</b>
                        <br />
                        <b>Due</b> {new Date(quiz.dueDate).toLocaleString()} |{" "}
                        {quizTotalPoints(quiz)} pts | {quiz.questions.length}{" "}
                        questions
                        {lastQuizAttemptScore(quiz._id)
                          ? ` | Score: ${lastQuizAttemptScore(quiz._id)}`
                          : ""}
                      </p>
                    </Col>
                    <Col xs="auto">
                      <div
                        role={isFaculty ? "button" : undefined}
                        onClick={
                          isFaculty ? () => togglePublished(quiz) : undefined
                        }
                      >
                        {quiz.published ? (
                          <GreenCheckmark />
                        ) : (
                          <FaBan className="text-danger" />
                        )}
                      </div>
                    </Col>
                    {isFaculty && (
                      <Col xs="auto">
                        <QuizControlButtons
                          openDeleteModal={() => setQuizToDelete(quiz)}
                          quiz={quiz}
                          togglePublished={togglePublished}
                        />
                      </Col>
                    )}
                  </Row>
                </ListGroupItem>
              ))
            )}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
