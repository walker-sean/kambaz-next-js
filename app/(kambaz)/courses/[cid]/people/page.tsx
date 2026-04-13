"use client";
import { useCallback, useEffect, useState } from "react";
import PeopleTable from "./table/page";
import { findUsersForCourse } from "../../client";
import { useParams } from "next/navigation";

export default function PeoplePage() {
  const { cid } = useParams();
  const [people, setPeople] = useState([]);

  const fetchPeople = useCallback(() => {
    if (!cid || Array.isArray(cid)) {
      return;
    }
    findUsersForCourse(cid).then((people) => setPeople(people));
  }, [cid]);
  useEffect(() => {
    fetchPeople();
  }, [cid, fetchPeople]);

  return <PeopleTable users={people} fetchUsers={fetchPeople} />;
}
