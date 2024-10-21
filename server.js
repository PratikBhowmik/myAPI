const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

let users = {
    1: { username: "Pratik Bhowmik", designation: "Software QA engineer" },
    2: { username: "Blessy", designation: "Developer" },
    3: { username: "Shubham", designation: "Developer" }
}

// Sample GET API
app.get('/api', (req, res) => {
    res.status(200).send(users);
});

// Sample POST API
app.post('/api/user', (req, res) => {
    const { username, designation } = req.body;

    if (!username || !designation) {
        return res.status(400).send({
            error: "username & designation are required"
        });
    }

    const isUserExist = Object.values(users).some(user => user.username === username);

    if (isUserExist) {
        return res.status(409).send({
            error: "User with this username already exists"
        })
    }

    const newID = Object.keys(users).length + 1;

    users[newID] = { id: newID, username, designation };

    res.status(201).send({
        message: "User created successfully",
        user: users[newID]
    });

});

// Server listening
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
