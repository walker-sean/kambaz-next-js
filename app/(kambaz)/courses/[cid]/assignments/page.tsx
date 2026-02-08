import Link from "next/link";
import {
  Button,
  Col,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import LessonControlButtons from "../modules/LessonControlButtons";
import AssignmentHeaderControlButtons from "./AssignmentHeaderControlButtons";
import { LuNotebookText } from "react-icons/lu";

export default async function Assignments({}: Readonly<{
  params: Promise<{ cid: string }>;
}>) {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <InputGroup className="w-50">
          <InputGroupText>
            <FaMagnifyingGlass />
          </InputGroupText>
          <FormControl placeholder="Search..." />
        </InputGroup>
        <div className="d-flex">
          <Button
            variant="secondary"
            className="me-2"
            id="wd-add-assignment-group"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />{" "}
            Group
          </Button>
          <Button variant="danger" id="wd-add-assignment">
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />{" "}
            Assignment
          </Button>
        </div>
      </div>
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS <AssignmentHeaderControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs="auto">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookText className="me-2 fs-3 text-success" />
                </Col>
                <Col>
                  <Link
                    href={`assignments/A1`}
                    className="wd-assignment-link text-decoration-none fw-bold text-dark"
                  >
                    A1 - ENV + HTML
                  </Link>
                  <p>
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 6 at 12:00am |
                    <br />
                    <b>Due</b> May 13 at 11:59pm | 100 pts
                  </p>
                </Col>
                <Col xs="auto">
                  <LessonControlButtons />
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs="auto">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookText className="me-2 fs-3 text-success" />
                </Col>
                <Col>
                  <Link
                    href={`assignments/A2`}
                    className="wd-assignment-link text-decoration-none fw-bold text-dark"
                  >
                    A2 - CSS + BOOTSTRAP
                  </Link>
                  <p>
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 13 at 12:00am |
                    <br />
                    <b>Due</b> May 20 at 11:59pm | 100 pts
                  </p>
                </Col>
                <Col xs="auto">
                  <LessonControlButtons />
                </Col>
              </Row>
            </ListGroupItem>
            <ListGroupItem className="wd-lesson p-3 ps-1">
              <Row className="align-items-center">
                <Col xs="auto">
                  <BsGripVertical className="me-2 fs-3" />
                  <LuNotebookText className="me-2 fs-3 text-success" />
                </Col>
                <Col>
                  <Link
                    href={`assignments/A3`}
                    className="wd-assignment-link text-decoration-none fw-bold text-dark"
                  >
                    A3 - JAVASCRIPT + REACT
                  </Link>
                  <p>
                    <span className="text-danger">Multiple Modules</span> |{" "}
                    <b>Not available until</b> May 20 at 12:00am |
                    <br />
                    <b>Due</b> May 27 at 11:59pm | 100 pts
                  </p>
                </Col>
                <Col xs="auto">
                  <LessonControlButtons />
                </Col>
              </Row>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
