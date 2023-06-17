import { useEffect, useState } from "react";
import "./app.scss";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("todo-items")) || []
  );

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(items));
  }, [items]);

  return (
    <div id="app">
      <h1>My Todo 🗒️</h1>

      <div className="container">
        <form>
          <h2>Add Item</h2>
          <input
            type="text"
            id="title"
            placeholder="Title"
            className="form-control"
            autoComplete="off"
            onChange={(event) => {
              setInput(event.target.value);
            }}
            value={input}
          />
          <button
            type="button"
            onClick={(event) => {
              if (!input) {
                alert("value cannot be empty");
                return;
              }
              const newItems = [...items];
              newItems.push(input);
              setItems(newItems);
              setInput("");
            }}
          >
            Add
          </button>
        </form>

        <div className="items">
          <h2>My Items</h2>
          {
            <ol>
              {items.map((item, index) => {
                return (
                  <li key={`item-${index}`}>
                    <h3>{item}</h3>

                    <button
                      className="delete"
                      onClick={() => {
                        const newItems = items.filter((item, indexItem) => {
                          return index !== indexItem;
                        });

                        setItems(newItems);
                      }}
                    ></button>
                  </li>
                );
              })}
            </ol>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
