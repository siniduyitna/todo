// models/Todo.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// የTodo ተግባር Schema
const todoSchema = new Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true, // የመግቢያውን ነጭ ቦታ ያጠፋል
        minlength: 1 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    priority: { 
        type: String, 
        enum: ['HIGH', 'MEDIUM', 'LOW'], // ቅድሚያውን የሚገድብ
        default: 'MEDIUM' 
    },
    // ለcreatedAt እና updatedAt በራስ-ሰር መረጃዎችን ለማስገባት
}, { timestamps: true }); 

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;