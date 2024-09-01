const mongoose = require('mongoose');

// Define the schema for an Item
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true }); // Optionally add timestamps for createdAt and updatedAt

// Create a model using the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
