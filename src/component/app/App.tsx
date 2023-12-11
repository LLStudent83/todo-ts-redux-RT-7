import * as React from "react";
import type { TodoType } from "../../store/todoReducer";
import { addTodoCreator } from "../../store/todoReducer";
import TableToDo from "../tableToDo/TableToDo";
import TodoList from "../todoList/TodoList";
import AddTodo from "../addTodo/AddTodo";
import FilterTodo from "../filterTodo/FilterTodo";
import { useDispatch } from "react-redux";
import "./app.scss";
import getTodos from "../../utils/getTodos";

export type FilterType = "all" | "unComplete" | "complete";

function App(): JSX.Element {
  console.log("Ререндер App");
  const dispatch = useDispatch();

  const todos = getTodos(5000);
  dispatch(addTodoCreator(todos));

  // getTodos(10);
  return (
    <div className="wrapper">
      <h1>Список задач</h1>
      <AddTodo />
      <FilterTodo />
      {/* <TodoList /> */}
      <section className="table-wrapper">
        <TableToDo />
      </section>
    </div>
  );
}

export default App;
export type { TodoType };
