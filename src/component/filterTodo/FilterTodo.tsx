import * as React from "react";
import { setActiveFilterCreator } from "../../store/todoReducer";
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";

import "./filterTodo.scss";
import type { FilterType } from "../app/App";

export default function FilterTodo(): JSX.Element {
  const dispatch = useAppDispatch();
  const { activeFilter } = useAppSelector((state) => state.todos);

  const setFilter = (valueFilter: FilterType) => {
    if (valueFilter === activeFilter) return;
    dispatch(setActiveFilterCreator(valueFilter));
  };

  const onChangeFilerInput = (valueFilter: FilterType) => {
    setFilter(valueFilter);
  };

  return (
    <fieldset className="filterTodo__wrapper">
      <legend>Выберите задачи для просмотра</legend>
      <div>
        <input
          checked={activeFilter === "complete"}
          type="radio"
          id="completed"
          name="todoFilter"
          value="complete"
          onChange={(e) => onChangeFilerInput(e.target.value as FilterType)}
        />
        <label htmlFor="completed">выполненные задачи</label>
      </div>
      <div>
        <input
          checked={activeFilter === "unComplete"}
          type="radio"
          id="uncompleted"
          name="todoFilter"
          value="unComplete"
          onChange={(e) => onChangeFilerInput(e.target.value as FilterType)}
        />
        <label htmlFor="uncompleted">НЕ выполненные задачи</label>
      </div>
      <div>
        <input
          checked={activeFilter === "all"}
          type="radio"
          id="all"
          name="todoFilter"
          value="all"
          onChange={(e) => onChangeFilerInput(e.target.value as FilterType)}
        />
        <label htmlFor="all">ВСЕ задачи</label>
      </div>
    </fieldset>
  );
}
