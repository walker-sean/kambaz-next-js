"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function CourseNavigation({ cid }: { cid: string }) {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const pathname = usePathname();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((linkName) => (
        <>
          <Link
            key={linkName}
            href={`/courses/${cid}/${linkName.toLowerCase()}`}
            id="wd-course-home-link"
            className={`list-group-item ${pathname.endsWith(linkName.toLowerCase()) ? "active" : "text-danger"} border-0`}
          >
            {linkName}
          </Link>
          <br />
        </>
      ))}
    </div>
  );
}
