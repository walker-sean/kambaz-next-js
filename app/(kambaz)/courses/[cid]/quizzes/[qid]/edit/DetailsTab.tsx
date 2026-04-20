"use client";
import {
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";

export default function DetailsTab({ quiz, setQuiz }) {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty = ["FACULTY", "ADMIN"].includes(currentUser?.role ?? "");

  const toDateOnly = (dateStr: string | undefined) =>
    dateStr ? dateStr.split("T")[0] : "";

  return (
    <Form className="w-75">
      <fieldset disabled={!isFaculty}>
        <FormLabel htmlFor="wd-quiz-name">Quiz Name</FormLabel>
        <InputGroup className="mb-3">
          <FormControl
            id="wd-quiz-name"
            value={quiz.title}
            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
            placeholder="Enter quiz name..."
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <FormControl
            as="textarea"
            id="wd-quiz-description"
            rows={8}
            value={quiz.description ?? ""}
            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
            placeholder="Enter quiz description..."
          />
        </InputGroup>

        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel htmlFor="wd-quiz-type">Quiz Type</FormLabel>
          </Col>
          <Col>
            <FormSelect
              id="wd-quiz-type"
              value={quiz.quizType ?? "GRADED_QUIZ"}
              onChange={(e) => setQuiz({ ...quiz, quizType: e.target.value })}
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel htmlFor="wd-assignment-group">
              Assignment Group
            </FormLabel>
          </Col>
          <Col>
            <FormSelect
              id="wd-assignment-group"
              value={quiz.assignmentGroup}
              onChange={(e) =>
                setQuiz({ ...quiz, assignmentGroup: e.target.value })
              }
            >
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="PROJECTS">PROJECTS</option>
            </FormSelect>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel>Options</FormLabel>
          </Col>
          <Col className="border p-3">
            <FormCheck
              type="checkbox"
              id="wd-shuffle-answers"
              checked={quiz.shuffleAnswers}
              onChange={(e) =>
                setQuiz({ ...quiz, shuffleAnswers: e.target.checked })
              }
              label="Shuffle Answers"
            />
            <FormCheck
              type="checkbox"
              id="wd-multiple-attempts"
              checked={!!quiz.multipleAttempts}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  multipleAttempts: e.target.checked,
                  howManyAttempts: e.target.checked ? quiz.howManyAttempts : 1,
                })
              }
              label="Multiple Attempts"
            />
            <FormCheck
              type="checkbox"
              id="wd-show-answers"
              checked={!!quiz.showCorrectAnswers}
              onChange={(e) =>
                setQuiz({ ...quiz, showAnswers: e.target.checked })
              }
              label="Show Correct Answers"
            />
            <FormCheck
              type="checkbox"
              id="wd-one-question"
              checked={!!quiz.oneQuestionAtATime}
              onChange={(e) =>
                setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })
              }
              label="One Question at a Time"
            />
            <FormCheck
              type="checkbox"
              id="wd-webcam"
              checked={!!quiz.webcamRequired}
              onChange={(e) =>
                setQuiz({ ...quiz, webcamRequired: e.target.checked })
              }
              label="Webcam Required"
            />
            <FormCheck
              type="checkbox"
              id="wd-lock-questions"
              checked={!!quiz.lockQuestionsAfterAnswering}
              onChange={(e) =>
                setQuiz({
                  ...quiz,
                  lockQuestionsAfterAnswering: e.target.checked,
                })
              }
              label="Lock Questions After Answering"
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel htmlFor="wd-time-limit">Time Limit (minutes)</FormLabel>
          </Col>
          <Col>
            <FormControl
              id="wd-time-limit"
              type="number"
              value={quiz.timeLimit}
              onChange={(e) =>
                setQuiz({ ...quiz, timeLimit: Number(e.target.value) })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel htmlFor="wd-how-many-attempts">
              How Many Attempts
            </FormLabel>
          </Col>
          <Col>
            <FormControl
              id="wd-how-many-attempts"
              type="number"
              disabled={!quiz.multipleAttempts}
              value={quiz.howManyAttempts}
              onChange={(e) =>
                setQuiz({ ...quiz, howManyAttempts: Number(e.target.value) })
              }
            />
          </Col>
        </Row>

        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel htmlFor="wd-access-code">Access Code</FormLabel>
          </Col>
          <Col>
            <FormControl
              id="wd-access-code"
              value={quiz.accessCode ?? ""}
              onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
              placeholder="Leave blank for no code"
            />
          </Col>
        </Row>

        <Row className="mb-5">
          <Col className="d-flex justify-content-end">
            <FormLabel>Assign</FormLabel>
          </Col>
          <Col className="border p-3">
            <FormLabel htmlFor="wd-due">Due</FormLabel>
            <FormControl
              id="wd-due"
              type="date"
              value={toDateOnly(quiz.dueDate)}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
            <Row>
              <Col>
                <FormLabel htmlFor="wd-available-from">
                  Available From
                </FormLabel>
                <FormControl
                  id="wd-available-from"
                  type="date"
                  value={toDateOnly(quiz.availableDate)}
                  onChange={(e) =>
                    setQuiz({ ...quiz, availableDate: e.target.value })
                  }
                />
              </Col>
              <Col>
                <FormLabel htmlFor="wd-until">Until</FormLabel>
                <FormControl
                  id="wd-until"
                  type="date"
                  value={toDateOnly(quiz.untilDate)}
                  onChange={(e) =>
                    setQuiz({ ...quiz, untilDate: e.target.value })
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </fieldset>
    </Form>
  );
}
