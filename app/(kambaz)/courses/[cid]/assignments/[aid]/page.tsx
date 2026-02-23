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
import { assignments } from "@/app/(kambaz)/database";
import { useParams } from "next/navigation";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignment = assignments.find((a) => a._id === aid);

  return (
    <Form className="w-75">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <InputGroup className="mb-3">
        <FormControl
          id="wd-name"
          defaultValue={assignment?.title}
          placeholder="Enter assignment name..."
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          as="textarea"
          id="wd-description"
          rows={8}
          defaultValue={assignment?.description}
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
            defaultValue={assignment?.points}
            placeholder="Enter points..."
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <FormLabel htmlFor="wd-assignment-group">Assignment Group</FormLabel>
        </Col>
        <Col>
          <FormSelect id="wd-assignment-group" defaultValue={assignment?.group}>
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
          <FormSelect id="wd-display-type" defaultValue={assignment?.gradeType}>
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
            defaultValue={assignment?.submissionType}
          >
            <option value="ONLINE">Online</option>
            <option value="IN_PERSON">In person</option>
          </FormSelect>
          {assignment?.submissionType === "ONLINE" && (
            <>
              <FormLabel htmlFor="wd-entry-options">
                Online Entry Options
              </FormLabel>
              <FormCheck
                type="checkbox"
                defaultChecked={assignment?.onlineEntryOptions?.textEntry}
                label="Text Entry"
              />
              <FormCheck
                type="checkbox"
                defaultChecked={assignment?.onlineEntryOptions?.websiteUrl}
                label="Website URL"
              />
              <FormCheck
                type="checkbox"
                defaultChecked={assignment?.onlineEntryOptions?.mediaRecordings}
                label="Media Recordings"
              />
              <FormCheck
                type="checkbox"
                defaultChecked={
                  assignment?.onlineEntryOptions?.studentAnnotation
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
          <FormControl id="wd-assign-to" defaultValue={assignment?.assignTo} />
          <FormLabel htmlFor="wd-due">Due</FormLabel>
          <FormControl
            id="wd-due"
            type="date"
            defaultValue={
              assignment?.due
                ? new Date(assignment.due).toISOString().split("T")[0]
                : ""
            }
          />
          <Row>
            <Col>
              <FormLabel htmlFor="wd-available-from">Available From</FormLabel>
              <FormControl
                id="wd-available-from"
                type="date"
                defaultValue={
                  assignment
                    ? new Date(assignment.available).toISOString().split("T")[0]
                    : ""
                }
              />
            </Col>
            <Col>
              <FormLabel htmlFor="wd-until">Until</FormLabel>
              <FormControl
                id="wd-until"
                type="date"
                defaultValue={
                  assignment
                    ? new Date(assignment.until).toISOString().split("T")[0]
                    : ""
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="d-flex justify-content-end">
        <Col />
        <Col className="d-flex justify-content-end">
          <Button
            variant="secondary"
            className="
          me-2"
            href={`/courses/${assignment?.course}/assignments`}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            href={`/courses/${assignment?.course}/assignments`}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
