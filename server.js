const express = require('express');
const path = require('path');

const PORT = 3000;
const notes = require('./db/db.json');

const app = express();

// Middleware for parsing application/json and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'public/notes.html')));

// GET request for ALL notes
app.get('/api/notes', (req, res) => {
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);

    // Sending all notes to the client
    return res.json(notes);
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);