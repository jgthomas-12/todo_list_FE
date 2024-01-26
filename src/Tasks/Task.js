import React from "react";
import Card from "../Cards/Card"
import "./Task.css"

function Tasks ({ tasks, deleteTask, updateTask, handleEdit, handleChange, addPhoto, file, getOneTask }) {

  const taskCards = tasks.map(task => {
    return(
      <Card
        title={task.attributes.name}
        description={task.attributes.description}
        id={task.id}
        key={task.id}
        deleteTask={deleteTask}
        updateTask={updateTask}
        handleEdit={() => handleEdit(task)}
        handleChange={handleChange}
        addPhoto={addPhoto}
        task={task}
        file={file}
        getOneTask={getOneTask}
      />
    )
  })

  return (
    <div className="tasks-container">
      {taskCards}
    </div>
  )
}

export default Tasks;