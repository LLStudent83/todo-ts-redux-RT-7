import * as React from "react";
import type { TodoType } from "../../store/todoReducer";
import TodoList from "../todoList/TodoList";
import AddTodo from "../addTodo/AddTodo";
import FilterTodo from "../filterTodo/FilterTodo";
import useLocalStorage from "../../hooks/useLocalStorage";
import "./app.scss";
import getTodos from "../../utils/getTodos";

export type FilterType = "all" | "unComplete" | "complete";

function App(): JSX.Element {
  const initialTodos: TodoType[] = [];

  // const [] = useLocalStorage<TodoType[]>("todos", initialTodos);

  getTodos(10);
  return (
    <div className="wrapper">
      <h1>Список задач</h1>
      <AddTodo />
      <FilterTodo />
      <TodoList />
    </div>
  );
}

export default App;
export type { TodoType };
