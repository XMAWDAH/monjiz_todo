import {v4 as uuid4} from "uuid";

export default function reducer(currentTodos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: uuid4(),
        title: action.payload.newTitle,
        details: "",
        is_completed: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "deleted": {
      const updatedTodos = currentTodos.filter((t) => {
        return t.id !== action.payload.id;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "updated": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    case "get": {
      const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      const cleanTodos = storageTodos.filter((t) => t && t.id);

      return cleanTodos;
    }

    case "toggled": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          // don't use mutitions!!!! -- so we copy t
          const updatedTodo = {
            ...t,
            is_completed: !t.is_completed,
          };
          return updatedTodo;
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }

    default: {
      throw Error("Unknow Action" + action.type);
    }
  }
}
