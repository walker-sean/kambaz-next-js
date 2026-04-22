"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
import { FaPencil, FaTrash } from "react-icons/fa6";
import GreenCheckmark from "../modules/GreenCheckmark";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { updateQuiz } from "./client";
export default function QuizControlButtons({
  openDeleteModal,
  quiz,
  togglePublished,
}: {
  openDeleteModal: () => void;
  quiz: any;
  togglePublished: (quiz: any) => void;
}) {
  const CustomToggle = React.forwardRef<
    HTMLSpanElement,
    { onClick?: React.MouseEventHandler }
  >(({ onClick }, ref) => {
    return (
      <span ref={ref} role="button" onClick={onClick}>
        <IoEllipsisVertical />
      </span>
    );
  });
  CustomToggle.displayName = "CustomToggle";

  const router = useRouter();

  return (
    <Dropdown align="end">
      <DropdownToggle as={CustomToggle} />
      <DropdownMenu>
        <DropdownItem
          onClick={() => {
            router.push(`quizzes/${quiz._id}/edit`);
          }}
        >
          Edit
        </DropdownItem>
        <DropdownItem onClick={openDeleteModal}>Delete</DropdownItem>
        <DropdownItem onClick={() => togglePublished(quiz)}>
          {quiz.published ? "Unpublish" : "Publish"}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
