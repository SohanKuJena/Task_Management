import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/tasks")
            .then(res => setTasks(res.data))
            .catch(err => console.log(err));
    }, []);

    const addTask = () => {
        axios.post("http://localhost:5000/tasks", { title, description })
            .then(res => setTasks([...tasks, res.data]))
            .catch(err => console.log(err));
    };

    const toggleComplete = (id, completed) => {
        axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed })
            .then(res => setTasks(tasks.map(task => task.id === id ? res.data : task)))
            .catch(err => console.log(err));
    };

    const deleteTask = (id) => {
        axios.delete(`http://localhost:5000/tasks/${id}`)
            .then(() => setTasks(tasks.filter(task => task.id !== id)))
            .catch(err => console.log(err));
    };

    return (
        <div>
            <h1>Task Management</h1>
            <input type="text" placeholder="Task title" onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
            <button onClick={addTask}>Add Task</button>

            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                            {task.title} - {task.description}
                        </span>
                        <button onClick={() => toggleComplete(task.id, task.completed)}>
                            {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
