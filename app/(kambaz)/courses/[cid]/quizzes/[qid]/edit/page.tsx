"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { findQuizById, updateQuiz } from "../../client";
import { Button, Tab, Tabs } from "react-bootstrap";
import { FaBan } from "react-icons/fa6";
import GreenCheckmark from "../../../modules/GreenCheckmark";
import DetailsTab from "./DetailsTab";

export default function EditQuizPage() {
  const [quiz, setQuiz] = useState();

  const { qid } = useParams();

  useEffect(() => {
    if (!qid || Array.isArray(qid)) return;

    findQuizById(qid).then((quiz) => setQuiz(quiz));
  }, [qid]);

  const router = useRouter();

  const onSave = () => {
    updateQuiz(qid, quiz).then(() => router.push("."));
  };

  const onPublishAndSave = () => {
    updateQuiz(qid, { ...quiz, published: true }).then(() => router.push(".."));
  };

  const numPoints = () => {
    if (!quiz) return;
    return quiz.questions.reduce((acc, current) => acc + current.points, 0);
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
          <Tab eventKey="questions" title="Questions"></Tab>
        </Tabs>
        <div className="d-flex justify-content-center gap-2 mt-4">
          <Button variant="secondary" onClick={() => router.push(`..`)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onSave}>
            Save
          </Button>
          {!quiz.published && (
            <Button variant="success" onClick={onPublishAndSave}>
              Publish and Save
            </Button>
          )}
        </div>
      </div>
    )
  );
}
