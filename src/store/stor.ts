import { applyMiddleware, combineReducers, createStore } from "redux";
import todosReducer from "./todoReducer";
import thunkMiddleware from "redux-thunk";

const store = createStore(
  combineReducers({ todos: todosReducer }),
  applyMiddleware(thunkMiddleware)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
