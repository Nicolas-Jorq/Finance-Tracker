// src/server.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Add an expense (now saves to database)
app.post('/expenses', async (req, res) => {
  try {
    const expense = await prisma.expense.create({
      data: {
        amount: req.body.amount,
        description: req.body.description
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
