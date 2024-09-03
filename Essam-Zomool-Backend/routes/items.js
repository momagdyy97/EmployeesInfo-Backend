const express = require('express');
const Item = require('../models/Item'); // Ensure the path to your Item model is correct
const router = express.Router();

// Create Item
router.post('/items', async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json({ message: 'Error creating item' });
    }
});

// Read All Items
router.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching items' });
    }
});

// Fetch an Item by ID
router.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching item' });
    }
});

// Update Item
router.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.json(updatedItem);
    } catch (err) {
        res.status(500).json({ message: 'Error updating item' });
    }
});

// Delete Item
router.delete('/items/:id', async (req, res) => {
    try {
        const result = await Item.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ message: 'Item not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item' });
    }
});

module.exports = router;
