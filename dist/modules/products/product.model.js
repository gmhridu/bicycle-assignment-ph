"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true,
    },
    brand: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    type: {
        type: String,
        required: true,
        enum: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
    },
    inStock: {
        type: Boolean,
        required: true,
        default: true,
    }
}, { timestamps: true });
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.default = Product;
