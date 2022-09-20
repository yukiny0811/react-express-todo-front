import './App.css'
import React, { useState, useEffect } from "react"
import Todo from "./components/Todo"

const url = "http://127.0.0.1:8080/"

function App() {
  const [todo, setTodo] = useState([])
  const [textAreaContent, setTextAreaContent] = useState("")
  const [refresh, setRefresh] = useState(0)
  useEffect(() => {
    const getTodo = async () => {
      const response = await fetch(url + "getall", {
        method: "get",
        mode: "cors",
        cache: "no-cache"
      })
      const res = await response.json()
      console.log(res[0])
      setTodo(res)
    }
    getTodo()
  }, [refresh])
  const handleCreate = data => {
    const createTodo = async () => {
      const response = await fetch(url + "post", {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json; charset=utf-8',
        },
        body: JSON.stringify({"title": textAreaContent}),
      })
      setRefresh(Date.now())
    }
    createTodo()
  }
  const handleDelete = id => {
    const deleteTodo = async () => {
      const response = await fetch(url + "delete/" + id, {
        method: 'POST',
        mode: 'cors',
        headers: {
          "Content-Type": 'application/json; charset=utf-8',
        },
        body: JSON.stringify({"id": id}),
      })
      setRefresh(Date.now())
    }
    deleteTodo()
  };
  return (
    <div className="App">
      <textarea value={textAreaContent} onChange={e => setTextAreaContent(e.target.value)} />
      <button onClick={() => handleCreate()}>Save</button>
      <div>
        {todo.map(t => <Todo key={t.id} {...t} onDelete={handleDelete}/>)}
      </div>
    </div>
  );
}

export default App
