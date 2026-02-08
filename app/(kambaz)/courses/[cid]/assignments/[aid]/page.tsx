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

export default function AssignmentEditor() {
  return (
    <Form className="w-75">
      <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
      <InputGroup className="mb-3">
        <FormControl
          id="wd-name"
          defaultValue="A1 - ENV + HTML"
          placeholder="Enter assignment name..."
        />
      </InputGroup>
      <InputGroup className="mb-3">
        <FormControl
          as="textarea"
          id="wd-description"
          rows={8}
          defaultValue="The assignment is available online. Submit a link to the landing page of
        your Web application running on Vercel. The landing page should be the
        Kambaz application with a link to the Lab exercises. Lab 1 should be the
        landing page of the Lab exercises and should include the following: Your
        full name and section Links to each of the lab assignments Link to the
        Kambaz application Links to all relevant source code repositories The
        Kambaz application should include a link to navigate back to the landing
        page."
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
            defaultValue={100}
            placeholder="Enter points..."
          />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <FormLabel htmlFor="wd-assignment-group">Assignment Group</FormLabel>
        </Col>
        <Col>
          <FormSelect id="wd-assignment-group" defaultValue="ASSIGNMENTS">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </FormSelect>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex justify-content-end">
          <FormLabel htmlFor="wd-display-type">Display Grade as</FormLabel>
        </Col>
        <Col>
          <FormSelect id="wd-display-type" defaultValue="PERCENTAGE">
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
          <FormSelect id="wd-submission-type" defaultValue="ONLINE">
            <option value="ONLINE">Online</option>
            <option value="IN_PERSON">In person</option>
          </FormSelect>
          <FormLabel htmlFor="wd-entry-options">Online Entry Options</FormLabel>

          <FormCheck type="checkbox" label="Text Entry" />
          <FormCheck type="checkbox" label="Website URL" />
          <FormCheck type="checkbox" label="Media Recordings" />
          <FormCheck type="checkbox" label="Student Annotation" />
        </Col>
      </Row>
      <Row className="mb-5">
        <Col className="d-flex justify-content-end">
          <FormLabel>Assign</FormLabel>
        </Col>
        <Col className="border p-3">
          <FormLabel htmlFor="wd-assign-to">Assign To</FormLabel>
          <FormControl id="wd-assign-to" defaultValue="Everyone" />
          <FormLabel htmlFor="wd-due">Due</FormLabel>
          <FormControl id="wd-due" type="date" defaultValue="2026-05-13" />
          <Row>
            <Col>
              <FormLabel htmlFor="wd-available-from">Available From</FormLabel>
              <FormControl
                id="wd-available-from"
                type="date"
                defaultValue="2026-05-06"
              />
            </Col>
            <Col>
              <FormLabel htmlFor="wd-until">Until</FormLabel>
              <FormControl
                id="wd-until"
                type="date"
                defaultValue="2026-05-20"
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
          >
            Cancel
          </Button>
          <Button variant="danger">Save</Button>
        </Col>
      </Row>
    </Form>
  );
}
