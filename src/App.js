// @ts-nocheck
import { useEffect, useState } from "react";

export function App() {
  const [items, setItems] = useState([]);
  const [ACCESS_TOKEN, setACCESS_TOKEN] = useState("jordan");

  async function handleGetFromList() {
    const response = await fetch(
      `https://one-list-api.herokuapp.com/items?access_token=${ACCESS_TOKEN}`
    );

    const data = await response.json();

    setItems(data);
  }

  async function setCompletion(item) {
    const response = await fetch(
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
    </div>
  );
}

export default App;
