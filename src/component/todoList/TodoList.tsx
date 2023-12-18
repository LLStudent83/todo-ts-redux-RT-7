/* eslint-disable import/no-cycle */
import React from "react";
import TodoItem from "../todoItem/TodoItem";
import { useAppSelector } from "../../store/reduxHooks";
import { FilterType } from "../app/App";
import { TodoType } from "../../store/todoReducer";
import "./todoList.scss";

function getVisibleTodo(value: FilterType, todos: TodoType[]): TodoType[] {
  if (value === "all") {
    return todos;
  }
  if (value === "unComplete") {
    return todos.filter((todo) => todo.completed === false);
  }
  if (value === "complete") {
    return todos.filter((todo) => todo.completed === true);
  }
  return todos;
}

function TodoList(): JSX.Element {
  const { todos } = useAppSelector((state) => state.todos);
  const { activeFilter } = useAppSelector((state) => state.todos);

  console.log("Ререндер TodoList");

  // const visibleTodos: Array<TodoType> = todos.filter((todo) => todo.visible);

  return (
    <>
      <ul className="todoList__list">
        {getVisibleTodo(activeFilter, todos).map((todo, index) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ul>
      {todos.length === 0 && <p>No todo</p>}
    </>
  );
}

export default TodoList;
