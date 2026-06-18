import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
const [dueDate, setDueDate] = useState("");
const [search, setSearch] = useState("");
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks"
      );

      setTasks(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
  "http://localhost:5000/api/tasks",
  {
    title,
    description,
    priority,
    dueDate,
    status: "Planning",
    projectId: "6a32c3011e4b54f28bd4886c",
  }
);

      setTitle("");
      setDescription("");

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const moveTask = async (task) => {
    let nextStatus = task.status;

    if (task.status === "Planning")
      nextStatus = "Development";
    else if (task.status === "Development")
      nextStatus = "Testing";
    else if (task.status === "Testing")
      nextStatus = "Deployment";

    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${task._id}`,
        {
          status: nextStatus,
        }
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Planning":
        return "#fbbf24";
      case "Development":
        return "#3b82f6";
      case "Testing":
        return "#f97316";
      case "Deployment":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };
     const totalTasks = tasks.length;

const planningTasks = tasks.filter(
  (task) => task.status === "Planning"
).length;

const developmentTasks = tasks.filter(
  (task) => task.status === "Development"
).length;

const testingTasks = tasks.filter(
  (task) => task.status === "Testing"
).length;

const deploymentTasks = tasks.filter(
  (task) => task.status === "Deployment"
).length;
const filteredTasks = tasks.filter((task) =>
  task.title
    .toLowerCase()
    .includes(search.toLowerCase())
);
 const statCard = {
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow:
    "0 4px 10px rgba(0,0,0,0.08)",
  minWidth: "160px",
};
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f7fc",
        padding: "40px",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1e3a8a",
            marginBottom: "10px",
          }}
        >
          🚀 Project Management Utility
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "30px",
          }}
        >
          MERN Stack Task Management System
        </p>

        {/* Create Task */}
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow:
              "0 4px 15px rgba(0,0,0,0.08)",
            marginBottom: "30px",
          }}
        >
          <h2>Create Task</h2>

          <form onSubmit={createTask}>
            <select
  value={priority}
  onChange={(e) =>
    setPriority(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
  }}
>
  <option value="High">
    High
  </option>

  <option value="Medium">
    Medium
  </option>

  <option value="Low">
    Low
  </option>
</select>
<input
  type="date"
  value={dueDate}
  onChange={(e) =>
    setDueDate(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
  }}
/>
            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                borderRadius: "8px",
                border:
                  "1px solid #d1d5db",
              }}
            />

            <textarea
              placeholder="Task Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              required
              rows="4"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border:
                  "1px solid #d1d5db",
                marginBottom: "15px",
              }}
            />

            <button
              type="submit"
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding:
                  "12px 24px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Add Task
            </button>
          </form>
        </div>
<div
  style={{
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "30px",
  }}
>
  <div style={statCard}>
    Total: {totalTasks}
  </div>

  <div style={statCard}>
    Planning: {planningTasks}
  </div>

  <div style={statCard}>
    Development: {developmentTasks}
  </div>

  <div style={statCard}>
    Testing: {testingTasks}
  </div>

  <div style={statCard}>
    Deployment: {deploymentTasks}
  </div>
 
<input
  type="text"
  placeholder="🔍 Search Tasks"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
  }}
/>
</div>
        {/* Dashboard */}
        <div>
          <h2>📋 Task Dashboard</h2>

          {tasks.length === 0 ? (
            <div
              style={{
                background: "#e0f2fe",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              No Tasks Available
            </div>
          ) : (
            filteredTasks.map((task) => (
              <div
                key={task._id}
                style={{
                  background: "#fff",
                  borderRadius: "15px",
                  padding: "20px",
                  marginBottom: "20px",
                  boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                <h3>{task.title}</h3>

                <p>{task.description}</p>

                <span
                  style={{
                    background:
                      getStatusColor(
                        task.status
                      ),
                    color: "white",
                    padding:
                      "5px 12px",
                    borderRadius:
                      "20px",
                    fontSize:
                      "14px",
                  }}
                >
                  {task.status}
                </span>

                <div
                  style={{
                    marginTop:
                      "15px",
                  }}
                >
                  {task.status !==
                    "Deployment" && (
                    <button
                      onClick={() =>
                        moveTask(
                          task
                        )
                      }
                      style={{
                        background:
                          "#2563eb",
                        color:
                          "white",
                        border:
                          "none",
                        padding:
                          "10px 15px",
                        borderRadius:
                          "8px",
                        cursor:
                          "pointer",
                        marginRight:
                          "10px",
                      }}
                    >
                      Move Forward
                    </button>
                  )}

                  <button
                    onClick={() =>
                      deleteTask(
                        task._id
                      )
                    }
                    style={{
                      background:
                        "#dc2626",
                      color:
                        "white",
                      border:
                        "none",
                      padding:
                        "10px 15px",
                      borderRadius:
                        "8px",
                      cursor:
                        "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>

                <p
                  style={{
                    marginTop:
                      "15px",
                    color:
                      "#6b7280",
                    fontSize:
                      "14px",
                  }}
                >
                  Task ID:{" "}
                  {task._id.slice(
                    -6
                  )}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
