import React, { useMemo } from "react";
import { useTable } from "react-table";
import { useAppSelector, useAppDispatch } from "../../store/reduxHooks";
import { toDoCompletedCreator, delTodoCreator } from "../../store/todoReducer";
import { VariableSizeList } from "react-window";

export default function TableToDo() {
  const todos = useAppSelector((state) => state.todos.todos);
  const activeFilter = useAppSelector((state) => state.todos.activeFilter);

  const dispatch = useAppDispatch();

  const visibleTodos = useMemo(() => {
    if (activeFilter === "all") {
      return todos;
    }
    if (activeFilter === "unComplete") {
      return todos.filter((todo) => todo.completed === false);
    }
    if (activeFilter === "complete") {
      return todos.filter((todo) => todo.completed === true);
    }
    return todos;
  }, [activeFilter, todos]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Номер по порядку",
        Cell: ({ row }) => {
          return row.index + 1;
        },
      },
      {
        Header: "Статус",
        Cell: (prop) => {
          console.log(prop);
          const { value, data, row } = prop;

          const toDoCompleted = (toDoId: string) => {
            dispatch(toDoCompletedCreator(toDoId));
          };

          const onChange = (toDoId: string) => {
            toDoCompleted(toDoId);
          };

          const todoId = data[row.index].id;
          return (
            <input
              className="todoItem__inputTodo"
              type="checkbox"
              checked={value}
              onChange={() => onChange(todoId)}
            />
          );
        },
        accessor: "completed",
      },
      {
        Header: "Задание",
        accessor: "title",
      },
      {
        Header: "Удалить задание",
        Cell: ({ data, row }) => {
          const deleteTodo = (todoId: string) => {
            dispatch(delTodoCreator(todoId));
          };

          const handlerClickDelTodo = (todoId: string) => {
            deleteTodo(todoId);
          };
          const todoId = data[row.index].id;

          return (
            <button
              type="button"
              className="todoItem__deleteTodo"
              onClick={() => handlerClickDelTodo(todoId)}
            >
              &times;
            </button>
          );
        },
      },
    ],
    [dispatch]
  );

  const tableInstance = useTable({ columns: columns, data: visibleTodos });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const rowData = useMemo(() => {
    console.log("сработал useMemo");
    return {
      rows,
      prepareRow,
    };
  }, [prepareRow, rows]);

  return (
    <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: "solid 3px red",
                  background: "aliceblue",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        <VariableSizeList
          height={500}
          itemCount={rows.length}
          itemSize={50}
          itemSize={() => 50}
          width={tableInstance.totalColumnsWidth}
          // width={useFullWidth ? '100%' : instance.totalColumnsWidth}
          // style={{ overflowX: 'hidden', overflowY: 'overlay' }}
          // ref={listRef}
          itemData={rowData}
        >
          {createRowMemo}
        </VariableSizeList>

        {/* {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "10px",
                      border: "solid 1px gray",
                      background: "papayawhip",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })} */}
      </tbody>
    </table>
  );
}

const createRowMemo = React.memo((props) => {
  const { data, index, style } = props;
  const { top, height, position } = style;
  const { rows, prepareRow } = data;
  const row = rows[index];

  prepareRow(row);
  return (
    <tr {...row.getRowProps({ style: { top, height, position } })}>
      {row.cells.map((cell) => {
        return (
          <td
            {...cell.getCellProps()}
            style={{
              padding: "10px",
              border: "solid 1px gray",
              background: "papayawhip",
            }}
          >
            {cell.render("Cell")}
          </td>
        );
      })}
    </tr>
  );
});
