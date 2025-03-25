const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database for tasks
let tasks = [];

// ✅ GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// ✅ POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const newTask = { id: uuidv4(), title, description, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// ✅ PUT /tasks/:id - Update a task (mark complete/edit)
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    let task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    res.json(task);
});

// ✅ DELETE /tasks/:id - Remove a task
app.delete('/tasks/:id', (req, res) => {
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: "Task deleted successfully" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
