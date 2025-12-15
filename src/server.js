// src/server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

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

// Add an expense (now saves to database)
app.post('/expenses', validateExpense, async (req, res) => {
  try {
    const expense = await prisma.expense.create({
      data: {
        amount: req.body.amount,
        description: req.body.description.trim()
      }
    });
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all expenses (now reads from database)
app.get('/expenses', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        date: 'desc'
      }
    });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
