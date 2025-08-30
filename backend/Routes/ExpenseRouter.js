const { fetchExpenses, addExpenses, deleteExpenses } = require('../Controllers/ExpenseController');

const router = require('express').Router();

// router.get('/', (req, res) => {
//     res.status(200).json([{
//         message: "Expense Route is fuckin Awesome"
//     }])
// })

// Fetch all expenses of the user
router.get('/', fetchExpenses);
// Add a new expense of the user
router.post('/', addExpenses);
// Delete an expense of the user
router.delete('/:expenseId', deleteExpenses);

module.exports = router