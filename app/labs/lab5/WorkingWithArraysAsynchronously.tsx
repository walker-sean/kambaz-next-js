"use client";
import React, { useState, useEffect } from "react";
import * as client from "./client";
import { FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState([
    {
      id: "1",
      title: "NodeJS Assignment",
      description: "Create a NodeJS server with ExpressJS",
      due: "2021-09-09",
      completed: false,
      editing: false,
    },
  ]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const updateTodo = async (todo: {
    id: string;
    title: string;
    description: string;
    due: string;
    completed: boolean;
    editing: boolean;
  }) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error) {
      setErrorMessage(
        (error as { response: { data: { message: string } } }).response.data
          .message,
      );
    }
  };

  const createNewTodo = async () => {
    const todos = await client.createNewTodo();
    setTodos(todos);
  };

  const removeTodo = async (todo: { id: string }) => {
    const updatedTodos = await client.removeTodo(todo);
    setTodos(updatedTodos);
  };
  const postNewTodo = async () => {
    const newTodo = await client.postNewTodo({
      title: "New Posted Todo",
      completed: false,
    });
    setTodos([...todos, newTodo]);
  };
  const deleteTodo = async (todo: { id: string }) => {
    try {
      await client.deleteTodo(todo);
      const newTodos = todos.filter((t) => t.id !== todo.id);
      setTodos(newTodos);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        (error as { response: { data: { message: string } } }).response.data
          .message,
      );
    }
  };
  const editTodo = (todo: {
    id: string;
    title: string;
    description: string;
    due: string;
    completed: boolean;
  }) => {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id ? { ...todo, editing: true } : t,
    );
    setTodos(updatedTodos);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const newTodos = await client.fetchTodos();
      setTodos(newTodos);
    };
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>
      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}
      <h4>
        Todos{" "}
        <FaPlusCircle
          role="button"
          onClick={createNewTodo}
          className="text-success float-end fs-3"
        />
        <FaPlusCircle
          role="button"
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
        />
      </h4>
      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaTrash
              role="button"
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
            />

            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
            />
            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
              role="button"
            />

            <input
              type="checkbox"
              className="form-check-input me-2"
              defaultChecked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {!todo.editing ? (
                todo.title
              ) : (
                <FormControl
                  className="w-50 float-start"
                  defaultValue={todo.title}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      updateTodo({ ...todo, editing: false });
                    }
                  }}
                  onChange={(e) =>
                    updateTodo({ ...todo, title: e.target.value })
                  }
                />
              )}
            </span>
          </ListGroupItem>
        ))}
      </ListGroup>{" "}
      <hr />
    </div>
  );
}
