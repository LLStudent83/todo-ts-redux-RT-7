import * as React from "react";
import { toDoCompletedCreator, delTodoCreator } from "../../store/todoReducer";
import { useAppDispatch } from "../../store/reduxHooks";
import { TodoType } from "../app/App";

import "./todoItem.scss";

type Props = {
  todo: TodoType;
  index: number;
};

function TodoItem({ todo, index }: Props): JSX.Element {
  const dispatch = useAppDispatch();

  const classes = ["todoItem__todoTitle"];
  if (todo.completed) {
    classes.push("todoItem__done");
  }

  const toDoCompleted = (toDoId: string) => {
    dispatch(toDoCompletedCreator(toDoId));
  };

  const deleteTodo = (todoId: string) => {
    dispatch(delTodoCreator(todoId));
  };

  const onChange = (toDoId: string) => {
    toDoCompleted(toDoId);
  };

  const handlerClickDelTodo = (todoId: string) => {
    deleteTodo(todoId);
  };

  return (
    <li className="todoItem__item">
      <input
        className="todoItem__inputTodo"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onChange(todo.id)}
      />
      <div className="todoItem__serialТumber">{index + 1}</div>
      <div className={classes.join(" ")}>{todo.title}</div>

      <button
        type="button"
        className="todoItem__deleteTodo"
        onClick={() => handlerClickDelTodo(todo.id)}
      >
        &times;
      </button>
    </li>
  );
}

export default TodoItem;
