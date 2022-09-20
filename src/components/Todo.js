import React from "react"

function Todo(props) {
    console.log(props.id)
    return (
        <div style={{display: "flex"}}>
            <h3>{props.title}</h3>
            <button onClick={() => props.onDelete(props.id)}>X</button>
        </div>
    )
}
export default Todo