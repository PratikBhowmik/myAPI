const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const connection = require('./db');

// Middleware to parse JSON
app.use(express.json());

// Sample GET API to fetch all the users
app.get('/api', (req, res) => {
    const query = 'SELECT * FROM users';

    connection.query(query, (err, results) => {
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

    const query = 'INSERT INTO users (username, designation) VALUES (?, ?)';

    connection.query(query, [username, designation], (err) => {
        if (err) {
            return res.status(500).send({ error: 'Database error' });
        }
        res.status(201).send({ message: 'user created successfully' });
    })
});

//PUT request to update user
app.put('/api/users/:id', (req, res) => {
    const { username, designation } = req.body;
    const { id } = req.params;

    if (!username || !designation) {
        return res.status(400).send({
            error: "User name and designation are required"
        });
    }

    const query = 'UPDATE users SET username = ?,designation = ? WHERE id = ?';

    connection.query(query, [username, designation, id], (err, result) => {
        if (err) {
            return res.status(500).send({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ message: 'User updated successfully' });
    })
})

//DELETE request to delete user
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM users WHERE id = ?';

    connection.query(query, [id], (error, results) => {
        if (error) {
            return res.status(500).json({ error: 'Database error occurred' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    })
})

// Server listening
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
