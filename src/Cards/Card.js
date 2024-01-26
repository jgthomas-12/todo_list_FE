import "./Card.css"
import React from "react";
import { useState, useEffect } from "react";
// import axios from "axios";

function Card ({ task, title, description, id, deleteTask, handleEdit, handleChange, file, getOneTask }) {
  const [taskDetails, setTaskDetails] = useState(task);

  useEffect(() => {
    if (id) {
      getOneTask(id).then((data) => {
        if (data) {
          console.log("data.data:", data.data )
          setTaskDetails(data.data);
        }
      }).catch(error => {
        console.log("error fetching task deets:", error)
      })
    }
  }, [id, getOneTask]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleChange(selectedFile, task);
    }
  }

  console.log("card - task", task.attributes)
  // console.log("card - file", file)
  return (
    <>
      <div className="card">
        <h3>Task: {title}</h3>
        <p>Whatcha gonna do: {description}</p>
        {console.log("taskDetails", taskDetails)}
        {console.log("BIG PICTURE URL:", taskDetails.attributes.image_url)}
        {/* Here - trying to find the image URL  */}
        {/* {console.log("task.image?", taskDetails.attributes)} */}
        {taskDetails.attributes.image_url ? (
          <img src={taskDetails.attributes.image_url} alt="Task Image" />
        ) : (
          <p>"No Ticket (image, there's no image)"</p>
        )}

        <button onClick={() => deleteTask(id)}> X </button>
        <button onClick={() => handleEdit(id)}> EDIT EDIT EDIT </button>

        <h2>Add Image:</h2>
        <input type="file" onChange={handleFileChange} />
        {/* {file ?
          file.id === id && <img src={file.image} alt="Ooops, maybe this isn't an image?" />
        :""} */}
      </div>
    </>
  )
}

export default Card;