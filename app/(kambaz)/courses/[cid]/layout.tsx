"use client";
import { ReactNode, useEffect, useState } from "react";
import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa6";
import { findUsersForCourse } from "../client";
export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const [showNav, setShowNav] = useState(true);
  const course = courses.find((course: any) => course._id === cid)!;
  const userId = (currentUser as { _id: string } | null)?._id ?? "";

  useEffect(() => {
    if (!cid || Array.isArray(cid)) {
      return;
    }
    findUsersForCourse(cid).then((users) => {
      if (!users.some((user) => user._id === userId)) {
        router.replace("/dashboard");
      }
    });
  }, [cid, router, userId]);

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          role="button"
          onClick={() => setShowNav((nav) => !nav)}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div>{showNav && <CourseNavigation cid={course._id} />}</div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
