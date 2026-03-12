/* eslint-disable react-refresh/only-export-components */

import {createContext, useState, useContext} from "react";

export const TodosContext = createContext();

export default function TodosProvider({children}) {
  const [todos, setTodos] = useState([]);

  return (
    <TodosContext.Provider value={{todos, setTodos}}>
      {children}
    </TodosContext.Provider>
  );
}

export const useTodos = () => {
  return useContext(TodosContext);
};
