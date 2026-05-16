// script.js
const API_URL = 'http://localhost:3002/todos';

const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');

// Fetch and display all todos
async function fetchTodos() {
    const res = await fetch(API_URL);
    const todos = await res.json();
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>${todo.title}</strong> - ${todo.description || ''} 
            [${todo.completed ? 'Done' : 'Pending'}]
            <button onclick="editTodo(${todo.id})">Edit</button>
            <button onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        todoList.appendChild(li);
    });
}

// Create Todo
if (todoForm) {
    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        todoForm.reset();
        fetchTodos();
    });
}

// Edit Todo
window.editTodo = async function(id) {
    const newTitle = prompt('Enter new title:');
    const newDescription = prompt('Enter new description:');
    const completed = confirm('Mark as completed?');
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, description: newDescription, completed })
    });
    fetchTodos();
}

// Delete Todo
window.deleteTodo = async function(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
}

// Get Selective Todo (by ID)
// Example usage: window.getTodoById(1)
window.getTodoById = async function(id) {
    const res = await fetch(`${API_URL}/${id}`);
    if (res.ok) {
        const todo = await res.json();
        alert(`Title: ${todo.title}\nDescription: ${todo.description}\nCompleted: ${todo.completed}`);
    } else {
        alert('Todo not found');
    }
}

// Initial fetch
fetchTodos();
