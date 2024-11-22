const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Serve the main interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Sample data
let items = [
    { id: 1, name: 'Car - Mustang', description: 'A sleek and powerful muscle car.' },
    { id: 2, name: 'Bike - Ducati', description: 'A stylish bike built for speed and performance.' }
];

// API Endpoints
app.get('/api/items', (req, res) => {
    res.json(items);
});

app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) res.json(item);
    else res.status(404).json({ error: 'Item not found' });
});

app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (item) {
        item.name = req.body.name;
        item.description = req.body.description;
        res.json(item);
    } else res.status(404).json({ error: 'Item not found' });
});

app.delete('/api/items/:id', (req, res) => {
    const index = items.findIndex(i => i.id === parseInt(req.params.id));
    if (index !== -1) {
        const deletedItem = items.splice(index, 1);
        res.json(deletedItem);
    } else res.status(404).json({ error: 'Item not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
