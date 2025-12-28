import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (todo.trim() === "") return;

    setTodos([...todos, { text: todo, completed: false }]);
    setTodo("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>

      <div>
        <input
          type="text"
          placeholder="Yeni todo..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.button}>
          Ekle
        </button>
      </div>

      <ul style={styles.list}>
        {todos.map((item, index) => (
          <li key={index} style={styles.listItem}>
            <span
              onClick={() => toggleTodo(index)}
              style={{
                textDecoration: item.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {item.text}
            </span>
            <button onClick={() => deleteTodo(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    textAlign: "center",
    fontFamily: "Arial",
  },
  input: {
    padding: "8px",
    width: "70%",
  },
  button: {
    padding: "8px 12px",
    marginLeft: "5px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    padding: "6px",
    border: "1px solid #ddd",
  },
};
