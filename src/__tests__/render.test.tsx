import React from "react";
import App from "../component/app/App";

import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import todosReducer from "../store/todoReducer";
import thunkMiddleware from "redux-thunk";

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("проверяем начальное состояние приложения при старте", () => {
  test("проверяем что отрендерилась строка добавления todo", () => {
    const store = createStore(
      combineReducers({ todos: todosReducer }),
      applyMiddleware(thunkMiddleware)
    );

    const app = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    render(app);
    expect(
      screen.getByRole("textbox", { name: "addTodoInput" })
    ).toBeInTheDocument();
    screen.logTestingPlaygroundURL();
  });
});
