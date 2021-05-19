// @ts-nocheck
import { useEffect, useState } from "react";

export function App() {
  const [items, setItems] = useState([]);
  const [ACCESS_TOKEN, setACCESS_TOKEN] = useState("jordan");
  const [newItemText, setNewItemText] = useState("");

  async function handleGetFromList() {
    const response = await fetch(
      `https://one-list-api.herokuapp.com/items?access_token=${ACCESS_TOKEN}`
    );

    const data = await response.json();

    setItems(data);
  }

  async function setCompletion(item) {
    await fetch(
      `https://one-list-api.herokuapp.com/items/${item.id}?access_token=${ACCESS_TOKEN}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          item: {
            complete: !item.complete,
          },
        }),
      }
    );
    handleGetFromList();
  }
  async function handleFormSubmit(event) {
    event.preventDefault();
    const response = await fetch(
      `https://one-list-api.herokuapp.com/items/?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          item: {
            text: newItemText,
          },
        }),
      }
    );
    const data = await response.json();
    setItems([...items, data]);
  }
  useEffect(() => {
    handleGetFromList();
  }, [ACCESS_TOKEN]);

  return (
    <div>
      <h1>One List:</h1>
      <input
        type="text"
        value={ACCESS_TOKEN}
        onChange={(event) => setACCESS_TOKEN(event.target.value)}
      />
      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setCompletion(item)}
            className={item.complete ? "complete" : ""}
          >
            {item.text}
          </li>
        ))}
      </ul>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          onInput={(event) => setNewItemText(event.target.value)}
          value={newItemText}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
