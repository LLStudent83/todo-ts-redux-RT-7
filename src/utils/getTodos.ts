import { faker } from "@faker-js/faker/locale/ru";
import type { TodoType } from "../store/todoReducer";

export default function getTodos(numberTodo: number) {
  const todos: TodoType[] = [];

  for (let i = 0; i < numberTodo; i++) {
    todos.push({
      id: faker.string.uuid(),
      completed: false,
      title: faker.company.catchPhrase(),
    });
  }
  return todos;
}
