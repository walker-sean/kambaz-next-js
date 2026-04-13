import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useParams } from "next/navigation";
import Link from "next/link";
import * as client from "../../../account/client";
import { FaCheck, FaPencil } from "react-icons/fa6";
import { FormControl } from "react-bootstrap";

export default function PeopleDetails({
  uid,
  onClose,
}: {
  uid: string | null;
  onClose: () => void;
}) {
  const deleteUser = async (uid: string) => {
    await client.deleteUser(uid);
    onClose();
  };
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState(user.firstName + " " + user.lastName);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  useEffect(() => {
    const fetchUser = async () => {
      if (!uid) return;
      const user = await client.findUserById(uid);
      setUser(user);
    };
    if (uid)
      fetchUser().then(() => {
        setName(user.firstName + " " + user.lastName);
        setEmail(user.email);
        setRole(user.role);
      });
  }, [uid, user.email, user.firstName, user.lastName, user.role]);
  const [editing, setEditing] = useState(false);
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName, email, role };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };
  if (!uid) return null;
  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      <button
        onClick={onClose}
        className="btn position-fixed end-0 top-0 wd-close-details"
      >
        <IoCloseSharp className="fs-1" />{" "}
      </button>
      <div className="text-center mt-2">
        {" "}
        <FaUserCircle className="text-secondary me-2 fs-1" />{" "}
      </div>
      <hr />
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil
            role="button"
            onClick={() => setEditing(true)}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            role="button"
            onClick={() => saveUser()}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editing && (
          <div className="wd-name" onClick={() => setEditing(true)}>
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <FormControl
            className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>
      <b>Email:</b>{" "}
      {!editing && <span className="wd-email"> {user.email} </span>}
      {user && editing && (
        <FormControl
          type="email"
          className="w-50 wd-edit-email"
          defaultValue={user.email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveUser();
            }
          }}
        />
      )}
      <br />
      <b>Roles:</b>{" "}
      {!editing && <span className="wd-roles"> {user.role} </span>}
      {user && editing && (
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="form-select w-50 wd-select-role"
        >
          <option value="STUDENT">Student</option>
          <option value="TA">Assistant</option>{" "}
          <option value="FACULTY">Faculty</option>
          <option value="ADMIN">Administrator</option>
        </select>
      )}{" "}
      <br />
      <b>Login ID:</b> <span className="wd-login-id"> {user.loginId} </span>{" "}
      <br />
      <b>Section:</b> <span className="wd-section"> {user.section} </span>{" "}
      <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span> <hr />
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        {" "}
        Delete{" "}
      </button>
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        {" "}
        Cancel{" "}
      </button>
    </div>
  );
}
