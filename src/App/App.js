import './App.css';
import Tasks from "../Tasks/Task";
import { useEffect, useState } from "react";
import Form from "../Forms/NewTask"
import EditTaskModal from '../Forms/EditTaskModal';

function App() {

  const [tasks, setTasks] = useState([]);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [file, setFile] = useState();

  useEffect(() => {
    getTasks();
  }, [])

  function handleChange(selectedFile, task) {
    // console.log("Selected file in handleChange:", selectedFile);
    if (selectedFile) {
      const fileImage = URL.createObjectURL(selectedFile)
      const taskFileObject = {id: task.id, image: fileImage, selectedFile: selectedFile}
      setFile(taskFileObject);
      addPhoto(taskFileObject, task);
      // console.log("File here Image:", fileImage);
      // console.log("Task:", task);
    }
  }

  function handleEdit(task) {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  }

  function closeModal() {
    setIsEditModalOpen(false);
    setSelectedTask(null);
  }

  function addPhoto(taskFileObject, task) {

    // console.log("Selected file in addPhoto:", file);
    // console.log("taskFileObject:", taskFileObject);
    // console.log("Task prop:", task);

    const formData = new FormData();

    formData.append("taskFileObject", taskFileObject)

    formData.append("task[name]", task.attributes.name);
    formData.append("task[description]", task.attributes.description);
    formData.append("task[completed]", task.attributes.completed);
    formData.append("task[image]", taskFileObject.selectedFile);

    // console.log("This is sent to backend:", formData);
    console.log("task id check:", task.id);

    fetch(`http://localhost:3002/api/v1/tasks/${task.id}`, {
      method: "PATCH",
      body: formData,
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to upload photo", response.ok);
      }
      return response.json();
    })
    .then(data => {
      console.log("Photo uploaded successfully", data);
    })
    .catch(error => {
      console.log("Error uploading the photo:", error.message);
    });
  }

  function addTask (newTask) {
    fetch("http://localhost:3002/api/v1/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
    .then(response => response.json())
    .then(data => {
      getTasks()
    })
    .catch(error => console.log(error.message))
  }

  function getTasks () {
    fetch("http://localhost:3002/api/v1/tasks")
    .then(response => {return response.json()})
    .then(data => setTasks(data.data))
    .catch(error => console.log(error.message))
  }

  function getOneTask(id) {
    return fetch(`http://localhost:3002/api/v1/tasks/${id}`)
    .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch task deets');
    }
    return response.json();
    })
    .catch(error => {
      console.log("error fetching task details:", error.message);
    });
  }

  function deleteTask(id) {
    fetch(`http://localhost:3002/api/v1/tasks/${id}`, {
      method: "DELETE",
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      getTasks();
    })
    .catch(error => console.log(error.message));
  }

  function updateTask(taskToUpdate) {
    fetch(`http://localhost:3002/api/v1/tasks/${taskToUpdate.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskToUpdate)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
      getTasks();
    })
    .catch(error => console.log(error.message));
  }

  return (
    <>
      <main className="App">
        <h1>TODO List with Image-Attaching Capabilities</h1>

        <div>
          <h3>Enter new task, dood</h3>
          <Form addTask={addTask}/>

          {/* This isn't working */}
          <h2>Add Image:</h2>
          <input type="file" onChange={handleChange} />
          {file && <img src={file} alt="Ooops, maybe this isn't an image?" />}
        </div>

        <Tasks
          tasks={tasks}
          getOneTask={getOneTask}
          deleteTask={deleteTask}
          updateTask={updateTask}
          handleEdit={handleEdit}
          handleChange={handleChange}
          addPhoto={addPhoto}
          file={file}
        />
        {isEditModalOpen && <EditTaskModal
          selectedTask={selectedTask}
          closeModal={closeModal}
          updateTask={updateTask}
        />}
      </main>

      <div>

      </div>
    </>
  );
}

export default App;
