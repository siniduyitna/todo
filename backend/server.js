// server.js (የተዘመነ)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json());

const uri = process.env.MONGO_URI; 
mongoose.connect(uri)
    .then(() => console.log('✅ MongoDB በተሳካ ሁኔታ ተገናኝቷል!'))
    .catch(err => console.error('❌ MongoDB ግንኙነት ስህተት:', err));

// =======================
// Routes ማገናኘት
// =======================
const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter); // ሁሉም የTodo ጥያቄዎች በ /todos/ ይጀምራሉ

app.get('/', (req, res) => {
    res.send('MERN Todo Backend Server እየሰራ ነው!');
});

app.listen(port, () => {
    console.log(`🚀 ሰርቨሩ በፖርት: ${port} ላይ በመስራት ላይ ነው`);
});