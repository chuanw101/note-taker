const express = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

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

// POST request to add a note
app.post('/api/notes', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a note`);
    
    // add unique id to note
    const id = uuidv4();
    req.body.id = id;
    notes.push(req.body);

    // stringify but keep formatting
    const content = JSON.stringify(notes, null, "    ");

    // write to db.json
    fs.writeFile('./db/db.json', content, function (err) {
        if (err) throw err;
        console.log('Saved to ./db/db.json!');
      });
    
    // Sending all notes to the client
    return res.json(notes);
});

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);