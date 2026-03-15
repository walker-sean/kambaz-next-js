import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments,
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (
      state,
      {
        payload: { userId, courseId },
      }: { payload: { userId: string; courseId: string } },
    ) => {
      state.enrollments = [
        ...state.enrollments,
        { _id: uuidv4(), user: userId, course: courseId },
      ];
    },
    unenroll: (
      state,
      {
        payload: { userId, courseId },
      }: { payload: { userId: string; courseId: string } },
    ) => {
      state.enrollments = state.enrollments.filter(
        (e) => !(e.user === userId && e.course === courseId),
      );
    },
  },
});

export const { enroll, unenroll } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
