import { FilterType } from "../component/app/App";

export type TodoType = {
  id: string;
  completed: boolean;
  title: string;
  visible: boolean;
};

type ActionConstructor<a, b> = {
  type: a;
  payload: b;
};

type State = {
  todos: Array<TodoType>;
  activeFilter: FilterType;
};

enum TypeActioinsType {
  typeActionAddTodo = "ADD_TODO",
  typeActionDelTodo = "DEL_TODO",
  typeToDoCompleted = "COMPLETED",
  typeSetActiveFilter = "SET_FILTER",
}

type AddTodoCreatorType = ActionConstructor<
  TypeActioinsType.typeActionAddTodo,
  TodoType
>;
type DelTodoCreatorType = ActionConstructor<
  TypeActioinsType.typeActionDelTodo,
  string
>;
type ToDoCompletedType = ActionConstructor<
  TypeActioinsType.typeToDoCompleted,
  string
>;
type SetActiveFilterType = ActionConstructor<
  TypeActioinsType.typeSetActiveFilter,
  FilterType
>;

type ActioType =
  | AddTodoCreatorType
  | DelTodoCreatorType
  | ToDoCompletedType
  | SetActiveFilterType;

const initialState: State = {
  todos: [],
  activeFilter: "all",
};

function TodosReducer(state: State = initialState, action: ActioType): State {
  switch (action.type) {
    case TypeActioinsType.typeActionAddTodo: {
      state.todos.push(action.payload);
      return { ...state };
    }
    case TypeActioinsType.typeActionDelTodo: {
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      return { ...state, todos: newTodos };
    }
    case TypeActioinsType.typeToDoCompleted: {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      return { ...state, todos: newTodos };
    }
    case TypeActioinsType.typeSetActiveFilter: {
      return { ...state, activeFilter: action.payload };
    }
    default: {
      return { ...state };
    }
  }
}

export const addTodoCreator = (todo: TodoType): AddTodoCreatorType => ({
  type: TypeActioinsType.typeActionAddTodo,
  payload: todo,
});

export const delTodoCreator = (id: string): DelTodoCreatorType => ({
  type: TypeActioinsType.typeActionDelTodo,
  payload: id,
});

export const toDoCompletedCreator = (id: string): ToDoCompletedType => ({
  type: TypeActioinsType.typeToDoCompleted,
  payload: id,
});

export const setActiveFilterCreator = (
  filterValue: FilterType
): SetActiveFilterType => ({
  type: TypeActioinsType.typeSetActiveFilter,
  payload: filterValue,
});

export default TodosReducer;
