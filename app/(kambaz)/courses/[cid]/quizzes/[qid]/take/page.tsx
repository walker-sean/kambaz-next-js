"use client";
import { useEffect, useState } from "react";
import { findQuizById, findQuizAttempts, makeAttempt } from "../../client";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(kambaz)/store";
import { Button, Form, FormCheck, FormControl } from "react-bootstrap";

export default function QuizTake() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );

  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<{ questionId: string; response: any }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    if (!qid || Array.isArray(qid)) return;
    const load = async () => {
      const [fetchedQuiz, attempts] = await Promise.all([
        findQuizById(qid),
        findQuizAttempts(qid),
      ]);
      setQuiz(fetchedQuiz);
      const count = attempts?.length ?? 0;
      const exhausted = !fetchedQuiz.multipleAttempts
        ? count >= 1
        : count >= fetchedQuiz.howManyAttempts;
      if (exhausted) {
        setBlocked(true);
      }
      setLoading(false);
    };
    load();
  }, [qid]);

  if (loading) return null;

  if (blocked) {
    return (
      <div>
        <h3>{quiz?.title}</h3>
        <p className="text-danger fw-bold">You have used all available attempts for this quiz.</p>
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>Back to Quiz</Button>
      </div>
    );
  }

  if (!quiz) return null;

  const questions = quiz.questions ?? [];
  const currentQuestion = questions[currentIndex];

  const getResponse = (questionId: string) => {
    return answers.find((a) => a.questionId === questionId)?.response;
  };

  const setAnswer = (questionId: string, response: any) => {
    setAnswers((prev) => {
      const existing = prev.find((a) => a.questionId === questionId);
      if (existing) return prev.map((a) => a.questionId === questionId ? { ...a, response } : a);
      return [...prev, { questionId, response }];
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await makeAttempt(qid as string, {
        quiz: qid,
        taker: (currentUser as any)?._id,
        course: cid,
        answers,
      });
      router.push(`/courses/${cid}/quizzes/${qid}/results`);
    } catch (err: any) {
      alert("Could not submit quiz. You may have exceeded the allowed number of attempts.");
      setSubmitting(false);
    }
  };

  if (questions.length === 0) {
    return (
      <div>
        <h3>{quiz.title}</h3>
        <p className="text-muted">This quiz has no questions.</p>
        <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
          Back to Quiz
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h3>{quiz.title}</h3>
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
          <Button variant="danger" disabled={submitting} onClick={handleSubmit}>
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        )}
      </div>
    </div>
  );
}
