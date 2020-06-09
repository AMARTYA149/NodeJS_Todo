const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    todoDesc: {
        type: String,
        required: true
    },
    category: {
        type: String
        // required: true
    },
    data: {
        type: Date
        // required: true
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;