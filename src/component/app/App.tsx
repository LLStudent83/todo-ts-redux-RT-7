import * as React from "react";
import type { TodoType } from "../../store/todoReducer";
import { addTodoCreator } from "../../store/todoReducer";
import TodoList from "../todoList/TodoList";
import AddTodo from "../addTodo/AddTodo";
import FilterTodo from "../filterTodo/FilterTodo";
import { useDispatch } from "react-redux";
import "./app.scss";
import getTodos from "../../utils/getTodos";

export type FilterType = "all" | "unComplete" | "complete";

function App(): JSX.Element {
  const dispatch = useDispatch();

  const todos = getTodos(100);
  dispatch(addTodoCreator(todos));

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

// нужно написать что бы добавлялось только 100 задач без useEffect
