const express = require('express');
const Item = require('../models/Item');
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

// Read All Items with Search, Description Filter, and Pagination
router.get('/items', async (req, res) => {
    try {
        const { search, description, page = 1, limit = 10 } = req.query;

        let query = {};
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        if (description) {
            query.description = description;
        }

        const items = await Item.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .exec();

        const totalItems = await Item.countDocuments(query);
        const totalPages = Math.ceil(totalItems / limit);

        res.json({ items, totalPages, currentPage: page });
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
