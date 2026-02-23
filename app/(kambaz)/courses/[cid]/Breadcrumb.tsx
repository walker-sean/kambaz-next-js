"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({
  course,
}: {
  course: { name: string } | undefined;
}) {
  const pathname = usePathname();
  let pageName = pathname.split("/").pop();
  pageName = `${pageName?.charAt(0).toUpperCase()}${pageName?.slice(1)}`;
  return (
    <span>
      {course?.name} &gt; {pageName}
    </span>
  );
}
