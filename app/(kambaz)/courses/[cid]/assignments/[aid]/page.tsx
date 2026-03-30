"use client";
import {
  Button,
  Col,
  Form,
  FormCheck,
  FormControl,
  FormLabel,
  FormSelect,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useEffect, useState } from "react";
import {
  createAssignmentForCourse,
  findAssignmentById,
  updateAssignment,
} from "../client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty = ["FACULTY", "ADMIN"].includes(currentUser?.role ?? "");

  const isNew = aid === "new";
  const existing = assignments.find((a) => a._id === aid);

  const toDateOnly = (dateStr: string | undefined) =>
    dateStr ? dateStr.split("T")[0] : "";

  const [assignment, setAssignment] = useState(
    isNew
      ? {
          title: "",
          description: "",
          points: 100,
          due: "",
          available: "",
          until: "",
          course: cid,
          group: "ASSIGNMENTS",
          gradeType: "PERCENTAGE",
          submissionType: "ONLINE",
          assignTo: "Everyone",
          onlineEntryOptions: {
            textEntry: false,
            websiteUrl: true,
            mediaRecordings: false,
            studentAnnotation: false,
          },
        }
      : {
          ...existing!,
          due: toDateOnly(existing?.due),
          available: toDateOnly(existing?.available),
          until: toDateOnly(existing?.until),
        },
  );

  const handleSave = () => {
    const toSave = {
      ...assignment,
      due: assignment.due ? `${assignment.due}T23:59` : "",
      until: assignment.until ? `${assignment.until}T23:59` : "",
      available: assignment.available ? `${assignment.available}T00:00` : "",
    };
    if (isNew) {
      createAssignmentForCourse(cid as string, toSave);
    } else {
      updateAssignment(assignment as { _id: string });
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  const fetchAssignment = async () => {
    const assignment = await findAssignmentById(aid as string);
    setAssignment(assignment);
  };

  useEffect(() => {
    if (aid === "new") {
      return;
    }
    fetchAssignment();
  }, []);

  return (
    <Form className="w-75">
      {/* https://stackoverflow.com/questions/3386954/how-can-i-disable-everything-inside-a-form-using-javascript-jquery */}
      <fieldset disabled={!isFaculty}>
        <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        <InputGroup className="mb-3">
          <FormControl
            id="wd-name"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
            placeholder="Enter assignment name..."
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <FormControl
            as="textarea"
            id="wd-description"
            rows={8}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
            placeholder="Enter assignment description..."
          />
        </InputGroup>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel htmlFor="wd-points">Points</FormLabel>
          </Col>
          <Col>
            <FormControl
              id="wd-points"
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({ ...assignment, points: Number(e.target.value) })
              }
              placeholder="Enter points..."
            />
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
              value={assignment.group}
              onChange={(e) =>
                setAssignment({ ...assignment, group: e.target.value })
              }
            >
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="PROJECTS">PROJECTS</option>
              <option value="LAB_REPORTS">LAB REPORTS</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel htmlFor="wd-display-type">Display Grade as</FormLabel>
          </Col>
          <Col>
            <FormSelect
              id="wd-display-type"
              value={assignment.gradeType}
              onChange={(e) =>
                setAssignment({ ...assignment, gradeType: e.target.value })
              }
            >
              <option value="PERCENTAGE">Percentage</option>
              <option value="RAW_TOTAL">Raw Total</option>
              <option value="FRACTION">Fraction</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col className="d-flex justify-content-end">
            <FormLabel htmlFor="wd-submission-type">Submission Type</FormLabel>
          </Col>
          <Col className="border p-3">
            <FormSelect
              id="wd-submission-type"
              value={assignment.submissionType}
              onChange={(e) =>
                setAssignment({ ...assignment, submissionType: e.target.value })
              }
            >
              <option value="ONLINE">Online</option>
              <option value="IN_PERSON">In person</option>
            </FormSelect>
            {assignment.submissionType === "ONLINE" && (
              <>
                <FormLabel htmlFor="wd-entry-options">
                  Online Entry Options
                </FormLabel>
                <FormCheck
                  type="checkbox"
                  checked={assignment.onlineEntryOptions?.textEntry}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      onlineEntryOptions: {
                        textEntry: e.target.checked,
                        websiteUrl:
                          assignment.onlineEntryOptions?.websiteUrl ?? false,
                        mediaRecordings:
                          assignment.onlineEntryOptions?.mediaRecordings ??
                          false,
                        studentAnnotation:
                          assignment.onlineEntryOptions?.studentAnnotation ??
                          false,
                      },
                    })
                  }
                  label="Text Entry"
                />
                <FormCheck
                  type="checkbox"
                  checked={assignment.onlineEntryOptions?.websiteUrl}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      onlineEntryOptions: {
                        textEntry:
                          assignment.onlineEntryOptions?.textEntry ?? false,
                        websiteUrl: e.target.checked,
                        mediaRecordings:
                          assignment.onlineEntryOptions?.mediaRecordings ??
                          false,
                        studentAnnotation:
                          assignment.onlineEntryOptions?.studentAnnotation ??
                          false,
                      },
                    })
                  }
                  label="Website URL"
                />
                <FormCheck
                  type="checkbox"
                  checked={assignment.onlineEntryOptions?.mediaRecordings}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      onlineEntryOptions: {
                        textEntry:
                          assignment.onlineEntryOptions?.textEntry ?? false,
                        websiteUrl:
                          assignment.onlineEntryOptions?.websiteUrl ?? false,
                        mediaRecordings: e.target.checked,
                        studentAnnotation:
                          assignment.onlineEntryOptions?.studentAnnotation ??
                          false,
                      },
                    })
                  }
                  label="Media Recordings"
                />
                <FormCheck
                  type="checkbox"
                  checked={assignment.onlineEntryOptions?.studentAnnotation}
                  onChange={(e) =>
                    setAssignment({
                      ...assignment,
                      onlineEntryOptions: {
                        textEntry:
                          assignment.onlineEntryOptions?.textEntry ?? false,
                        websiteUrl:
                          assignment.onlineEntryOptions?.websiteUrl ?? false,
                        mediaRecordings:
                          assignment.onlineEntryOptions?.mediaRecordings ??
                          false,
                        studentAnnotation: e.target.checked,
                      },
                    })
                  }
                  label="Student Annotation"
                />
              </>
            )}
          </Col>
        </Row>
        <Row className="mb-5">
          <Col className="d-flex justify-content-end">
            <FormLabel>Assign</FormLabel>
          </Col>
          <Col className="border p-3">
            <FormLabel htmlFor="wd-assign-to">Assign To</FormLabel>
            <FormControl
              id="wd-assign-to"
              value={assignment.assignTo}
              onChange={(e) =>
                setAssignment({ ...assignment, assignTo: e.target.value })
              }
            />
            <FormLabel htmlFor="wd-due">Due</FormLabel>
            <FormControl
              id="wd-due"
              type="date"
              value={assignment.due ?? ""}
              onChange={(e) =>
                setAssignment({ ...assignment, due: e.target.value })
              }
            />
            <Row>
              <Col>
                <FormLabel htmlFor="wd-available-from">
                  Available From
                </FormLabel>
                <FormControl
                  id="wd-available-from"
                  type="date"
                  value={assignment.available ?? ""}
                  onChange={(e) =>
                    setAssignment({ ...assignment, available: e.target.value })
                  }
                />
              </Col>
              <Col>
                <FormLabel htmlFor="wd-until">Until</FormLabel>
                <FormControl
                  id="wd-until"
                  type="date"
                  value={assignment.until ?? ""}
                  onChange={(e) =>
                    setAssignment({ ...assignment, until: e.target.value })
                  }
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="d-flex justify-content-end">
          <Col />
          <Col className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleCancel}>
              Cancel
            </Button>
            {isFaculty && (
              <Button variant="danger" onClick={handleSave}>
                Save
              </Button>
            )}
          </Col>
        </Row>
      </fieldset>
    </Form>
  );
}
