// routes/todos.js
const router = require('express').Router();
let Todo = require('../models/Todo');

// 1. GET /todos/ - ሁሉንም ተግባራት ያመጣል
router.route('/').get((req, res) => {
    // ባልተጠናቀቀ ሁኔታ (completed: 1)፣ ከዚያም በቅድሚያ (-1)፣ ከዚያም በቀን (-1) አስተካክሎ ያመጣል
    Todo.find()
        .sort({ completed: 1, priority: -1, createdAt: -1 }) 
        .then(todos => res.json(todos))
        .catch(err => res.status(400).json('ስህተት: ' + err));
});

// 2. POST /todos/add - አዲስ ተግባር ይጨምራል
router.route('/add').post((req, res) => {
    const { title, priority } = req.body;

    const newTodo = new Todo({ 
        title, 
        priority: priority || 'MEDIUM' // ቅድሚያ ካልተሰጠ መካከለኛ ያደርጋል
    });

    newTodo.save()
        .then(() => res.json({ message: '✅ ተግባር በተሳካ ሁኔታ ታክሏል!', todo: newTodo }))
        .catch(err => res.status(400).json('ስህተት: ' + err));
});

// 3. POST /todos/update/:id - ተግባርን ያዘምናል (ሁኔታን ወይም ርዕስን)
router.route('/update/:id').post((req, res) => {
    Todo.findById(req.params.id)
        .then(todo => {
            if (!todo) return res.status(404).json('❌ ተግባሩ አልተገኘም');
            
            // የዘመነውን ርዕስ ወይም ሁኔታ ያዘጋጃል
            if (req.body.title !== undefined) todo.title = req.body.title;
            if (req.body.completed !== undefined) todo.completed = req.body.completed;
            if (req.body.priority !== undefined) todo.priority = req.body.priority;

            todo.save()
                .then(() => res.json('✅ ተግባር በተሳካ ሁኔታ ተዘምኗል!'))
                .catch(err => res.status(400).json('ስህተት: ' + err));
        })
        .catch(err => res.status(400).json('ስህተት: ' + err));
});

// 4. DELETE /todos/:id - ተግባርን ይሰርዛል
router.route('/:id').delete((req, res) => {
    Todo.findByIdAndDelete(req.params.id)
        .then(() => res.json('✅ ተግባር በተሳካ ሁኔታ ተሰርዟል!'))
        .catch(err => res.status(400).json('ስህተት: ' + err));
});

module.exports = router;