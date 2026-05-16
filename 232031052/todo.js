const express = require('express');
const path = require('path');

const app = express();
const PORT = 3002;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

let todos = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/todos', (req, res) => {
    const { title, description } = req.body;

    if (!title) return res.status(400).json({ error: 'Title is required' });

    const todo = {
        id: nextId++,
        title,
        description: description || '',
        completed: false
    };

    todos.push(todo);
    res.status(201).json(todo);
});

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.get('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    res.json(todo);
});

app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    const { title, description, completed } = req.body;

    if (title !== undefined) todo.title = title;
    if (description !== undefined) todo.description = description;
    if (completed !== undefined) todo.completed = completed;

    res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = todos.findIndex(t => t.id === id);

    if (index === -1) return res.status(404).json({ error: 'Todo not found' });

    todos.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});