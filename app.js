// app.js - The entire application in one file

const express = require('express');
const app = express();

app.use(express.json());

// Our "database" - just an array in memory
let expenses = [];
let nextId = 1;

// Add an expense
app.post('/expenses', (req, res) => {
  const expense = {
    id: nextId++,
    amount: req.body.amount,
    description: req.body.description,
    date: new Date().toISOString()
  };
  expenses.push(expense);
  res.json(expense);
});

// Get all expenses
app.get('/expenses', (req, res) => {
  res.json(expenses);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
