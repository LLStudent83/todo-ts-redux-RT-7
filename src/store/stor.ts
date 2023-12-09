import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import todosReducer from "./todoReducer";
import thunkMiddleware from "redux-thunk";

// const enhancers = compose(
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

const store = createStore(
  combineReducers({ todos: todosReducer }),
  applyMiddleware(thunkMiddleware)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
