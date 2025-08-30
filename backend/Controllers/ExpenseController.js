const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");


const addExpenses = async (req, res) => {
    // res.send('addExpense');
    const body = req.body;
    const { _id } = req.user;
    // console.log(body, _id);
    // res.send('Success')
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,//user id
            {
                $push: { expenses: body }
            }, { new: true }
        )
        res.status(200).json({
            message: "Expense added successfully",
            data: userData?.expenses,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }

}
const fetchExpenses = async (req, res) => {
    const body = req.body;
    const { _id } = req.user;
    try {
        const userData = await UserModel.findById(_id).select('expenses')
        res.status(200).json({
            message: "Fetching all Expenses",
            data: userData?.expenses,
            success: true
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}
const deleteExpenses = async (req, res) => {
    const { _id } = req.user;
    const { expenseId } = req.params;
    try {
        const userData = await UserModel.findByIdAndUpdate(
            _id,//user id
            {
                $pull: { expenses: { _id: expenseId } }
            }, { new: true }
        )
        res.status(200).json({
            message: "Expense Deleted successfully",
            success: true,
            data: userData?.expenses,
        })
    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err,
            success: false
        })
    }
}

module.exports = {
    addExpenses,
    fetchExpenses,
    deleteExpenses
}