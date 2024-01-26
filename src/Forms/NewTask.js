import { useState } from "react";
import "./NewTask.css"

function Form({ addTask }){
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function submitTasks(event) {
    event.preventDefault()
    const newTask = {
      name: title,
      description: description,
      completed: false
    }
    addTask(newTask)
    clearInput()
  }

  function clearInput(){
    setTitle("")
    setDescription("")
  }

    return(
      <form>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="text"
          placeholder="Description"
          name="decription"
          value={description}
          onChange={event => setDescription(event.target.value)}
        />

        <button onClick = { event => submitTasks(event)}>SUBMIT THIS BISH</button>
      </form>
    )
}

export default Form;