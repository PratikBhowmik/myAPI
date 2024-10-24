const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const connection = require('./db');

// Middleware to parse JSON
app.use(express.json());

// Sample GET API to fetch all the users
app.get('/api', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).send({ error: 'Database error' });
        }
        res.status(200).send(results);
    })
});

// Sample POST API to create new user
app.post('/api/users', (req, res) => {
    const { username, designation } = req.body;

    if (!username || !designation) {
        return res.status(400).send({
            error: "username & designation are required"
        });
    }

    connection.query('INSERT INTO users (id,username,designation) VALUES (5,"Shamik Barman","Product Manager")', [username, designation], (err) => {
        if (err) {
            return res.status(500).send({ error: 'Database error' });
        }
        res.status(201).send({ message: 'user created successfully' });
    })
});

//PUT request to update any user
app.put('/api/users/:id', (req, res) => {
    const { username, designation } = req.body;

    if (!users[userId]) {
        return res.status(400).send({
            error: "User not found"
        });
    }

    if (!username || !designation) {
        return res.status(400).send({
            error: "User name and designation are required"
        })
    }

    if (username) users[userId].username = username;
    if (designation) users[userId].designation = designation;

    users[userId] = { username, designation };

    res.status(200).send({
        message: "User updated successfully"
    })
})

//DELETE request to delete any user
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    if (!users[userId]) {
        return res.status(400).send({ error: "user not found" });
    }

    delete users[userId];
    res.status(200).send({ message: "user deleted successfully" });
})

// Server listening
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
