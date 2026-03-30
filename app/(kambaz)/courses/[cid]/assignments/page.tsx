"use client";
import Link from "next/link";
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
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical } from "react-icons/bs";
import { FaMagnifyingGlass, FaPlus, FaTrash } from "react-icons/fa6";
import LessonControlButtons from "../modules/LessonControlButtons";
import AssignmentHeaderControlButtons from "./AssignmentHeaderControlButtons";
import { LuNotebookText } from "react-icons/lu";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useEffect, useState } from "react";
import { findAssignmentsForCourse, deleteAssignment } from "./client";
import { setAssignments } from "../../assignments/reducer";

export default function Assignments() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty = ["FACULTY", "ADMIN"].includes(currentUser?.role ?? "");
  const courseAssignments = assignments.filter(
    (assignment) => assignment.course === cid,
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleDeleteClick = (id: string, title: string) => {
    setSelectedId(id);
    setSelectedTitle(title);
    setShowModal(true);
  };

  const handleConfirm = async () => {
    if (selectedId) await deleteAssignment(selectedId);
    setShowModal(false);
  };

  const fetchAssignments = async () => {
    const assignments = await findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, [showModal]);

  return (
    <div id="wd-assignments">
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove {selectedTitle}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
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
          {isFaculty && (
            <Button
              variant="danger"
              id="wd-add-assignment"
              onClick={() => router.push(`/courses/${cid}/assignments/new`)}
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />{" "}
              Assignment
            </Button>
          )}
        </div>
      </div>
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS <AssignmentHeaderControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {courseAssignments.map((assignment) => (
              <ListGroupItem
                key={assignment._id}
                className="wd-lesson p-3 ps-1"
              >
                <Row className="align-items-center">
                  <Col xs="auto">
                    <BsGripVertical className="me-2 fs-3" />
                    <LuNotebookText className="me-2 fs-3 text-success" />
                  </Col>
                  <Col>
                    <Link
                      href={`assignments/${assignment._id}`}
                      className="wd-assignment-link text-decoration-none fw-bold text-dark"
                    >
                      {assignment.title}
                    </Link>
                    <p>
                      <span className="text-danger">Multiple Modules</span> |{" "}
                      <b>Not available until</b>{" "}
                      {new Date(assignment.available).toLocaleString()} |
                      <br />
                      <b>Due</b> {new Date(assignment.due).toLocaleString()} |{" "}
                      {assignment.points} pts
                    </p>
                  </Col>
                  <Col xs="auto">
                    {isFaculty && (
                      <FaTrash
                        role="button"
                        className="text-danger me-2"
                        onClick={() =>
                          handleDeleteClick(assignment._id, assignment.title)
                        }
                      />
                    )}
                    <LessonControlButtons />
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
