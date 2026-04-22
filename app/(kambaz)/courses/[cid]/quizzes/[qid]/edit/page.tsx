"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { findQuizById, updateQuiz } from "../../client";
import { Button, Tab, Tabs } from "react-bootstrap";
import { FaBan } from "react-icons/fa6";
import GreenCheckmark from "../../../modules/GreenCheckmark";
import DetailsTab from "./DetailsTab";
import QuestionsTab from "./QuestionsTab";

export default function EditQuizPage() {
  const [quiz, setQuiz] = useState<any>();

  const { qid } = useParams();

  useEffect(() => {
    if (!qid || Array.isArray(qid)) return;

    findQuizById(qid).then((quiz) => setQuiz(quiz));
  }, [qid]);

  const router = useRouter();

  const onSave = () => {
    const questions = quiz.questions.map((question: any) => {
      const { editing, ...rest } = question;
      return rest;
    });
    updateQuiz(qid, { ...quiz, questions }).then(() => router.push("."));
  };

  const onPublishAndSave = () => {
    const questions = quiz.questions.map((question: any) => {
      const { editing, ...rest } = question;
      return rest;
    });
    updateQuiz(qid, { ...quiz, published: true, questions }).then(() => router.push(".."));
  };

  const numPoints = () => {
    if (!quiz) return;
    return quiz.questions.reduce((acc: number, current: any) => acc + current.points, 0);
  };

  return (
    quiz && (
      <div>
        <div className="d-flex gap-4 fw-bold fs-5">
          <span>Points: {numPoints()}</span>
          <span className="d-flex align-items-center gap-2">
            {quiz.published ? (
              <GreenCheckmark />
            ) : (
              <FaBan className="text-danger" />
            )}
            {quiz.published ? "Published" : "Not Published"}
          </span>
        </div>
        <Tabs className="wd-quiz-edit-tabs">
          <Tab eventKey="details" title="Details">
            <DetailsTab quiz={quiz} setQuiz={setQuiz} />
          </Tab>
          <Tab eventKey="questions" title="Questions">
            <QuestionsTab quiz={quiz} setQuiz={setQuiz} />
          </Tab>
        </Tabs>
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button variant="secondary" onClick={() => router.push(`..`)}>
            Cancel
          </Button>
          <Button disabled={quiz.questions.some((q: any) => q.editing)} variant="danger" onClick={onSave}>
            Save
          </Button>
          {!quiz.published && (
            <Button disabled={quiz.questions.some((q: any) => q.editing)} variant="success" onClick={onPublishAndSave}>
              Publish and Save
            </Button>
          )}
        </div>
      </div>
    )
  );
}
