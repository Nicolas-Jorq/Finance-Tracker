// app.js - The entire application in one file

const express = require('express');
const app = express();

app.use(express.json());

// Our "database" - just an array in memory
let expenses = [];
let nextId = 1;

// Validation middleware
const validateExpense = (req, res, next) => {
  const { amount, description } = req.body;
  const errors = [];

  // Validate amount
  if (amount === undefined || amount === null) {
    errors.push('Amount is required');
  } else if (typeof amount !== 'number') {
    errors.push('Amount must be a number');
  } else if (amount <= 0) {
    errors.push('Amount must be greater than 0');
  } else if (amount > 999999.99) {
    errors.push('Amount cannot exceed 999,999.99');
  }

  // Validate description
  if (!description || description.trim() === '') {
    errors.push('Description is required');
  } else if (typeof description !== 'string') {
    errors.push('Description must be a string');
  } else if (description.length > 200) {
    errors.push('Description cannot exceed 200 characters');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  next();
};

// Add an expense
app.post('/expenses', validateExpense, (req, res) => {
  const expense = {
    id: nextId++,
    amount: req.body.amount,
    description: req.body.description.trim(),
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
