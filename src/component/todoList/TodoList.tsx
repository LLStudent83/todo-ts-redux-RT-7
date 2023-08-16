/* eslint-disable import/no-cycle */
import React from "react";
import TodoItem from "../todoItem/TodoItem";
import { useAppSelector } from "../../store/reduxHooks";
import { FilterType } from "../app/App";
import { TodoType } from "../../store/todoReducer";
import "./todoList.scss";

function TodoList(): JSX.Element {
  const { todos, activeFilter } = useAppSelector((state) => state.todos);

  // const visibleTodos: Array<TodoType> = todos.filter((todo) => todo.visible);

  function getVisibleTodo(value: FilterType): TodoType[] {
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

  return (
    <>
      <ul className="todoList__list">
        {getVisibleTodo(activeFilter).map((todo, index) => (
          <TodoItem todo={todo} key={todo.id} index={index} />
        ))}
      </ul>
      {todos.length === 0 && <p>No todo</p>}
    </>
  );
}

export default TodoList;
