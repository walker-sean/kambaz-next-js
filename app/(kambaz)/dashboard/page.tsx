"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import * as client from "../courses/client";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewCourse,
  deleteCourse,
  updateCourse,
  setCourses,
} from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const [showAllCourses, setShowAllCourses] = useState(false);
  const [myCourses, setMyCourses] = useState<{ _id: string }[]>([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await client.findMyCourses();
        const allCourses = await client.fetchAllCourses();
        setMyCourses(courses);
        dispatch(setCourses(showAllCourses ? allCourses : courses));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCourses();
  }, [currentUser, dispatch, showAllCourses]);

  const isFaculty = ["FACULTY", "ADMIN"].includes((currentUser as any)?.role);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const userId = (currentUser as { _id: string } | null)?._id ?? "";
  const onAddNewCourse = async () => {
    const newCourse = await client.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };
  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };
  const onEnrollInCourse = async (courseId: string) => {
    await client.enrollUserInCourse(courseId);
    setMyCourses((prev) => [...prev, { _id: courseId }]);
    dispatch(enroll({ userId, courseId }));
  };
  const onUnenrollFromCourse = async (courseId: string) => {
    await client.unenrollUserFromCourse(courseId);
    setMyCourses((prev) => prev.filter((c) => c._id !== courseId));
    dispatch(unenroll({ userId, courseId }));
  };
  const onUpdateCourse = async () => {
    await client.updateCourse(course);
    dispatch(
      setCourses(
        courses.map((c) => {
          if (c._id === course._id) {
            return course;
          } else {
            return c;
          }
        }),
      ),
    );
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <div className="d-flex justify-content-between align-items-center">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <Button
          variant="primary"
          onClick={() => setShowAllCourses((prev) => !prev)}
          id="wd-enrollments-btn"
        >
          Enrollments
        </Button>
      </div>
      <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => onUpdateCourse()}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            value={course.description}
            rows={3}
            as="textarea"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        {showAllCourses
          ? `All Courses (${courses.length})`
          : `My Courses (${courses.length})`}
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c) => (
            <Col
              key={c._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${c._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                  onClick={(e) => {
                    if (showAllCourses) e.preventDefault();
                  }}
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.description}
                    </CardText>
                  </CardBody>
                </Link>
                <CardBody className="pt-0">
                  {!showAllCourses && (
                    <Button variant="primary" size="sm" className="me-2">
                      <Link
                        href={`/courses/${c._id}/home`}
                        className="text-white text-decoration-none"
                      >
                        Go
                      </Link>
                    </Button>
                  )}
                  {showAllCourses && (
                    <>
                      {myCourses.some((course) => course._id === c._id) ? (
                        <Button
                          variant="danger"
                          size="sm"
                          className="me-2"
                          onClick={() => onUnenrollFromCourse(c._id)}
                        >
                          Unenroll
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          size="sm"
                          className="me-2"
                          onClick={() => onEnrollInCourse(c._id)}
                        >
                          Enroll
                        </Button>
                      )}
                    </>
                  )}
                  {isFaculty && (
                    <>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          onDeleteCourse(c._id);
                        }}
                        className="btn btn-danger btn-sm float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                      <button
                        id="wd-edit-course-click"
                        onClick={(e) => {
                          e.preventDefault();
                          setCourse(c);
                        }}
                        className="btn btn-warning btn-sm me-2 float-end"
                      >
                        Edit
                      </button>
                    </>
                  )}
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
