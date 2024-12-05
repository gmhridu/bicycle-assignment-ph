"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BicycleValidationSchema = void 0;
const zod_1 = require("zod");
exports.BicycleValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(3, { message: 'Name must be at least 3 characters long' }).max(100, { message: 'Name must not exceed 100 characters' }).trim(),
    brand: zod_1.z.string().min(2, { message: 'Brand must be at least 2 characters long' }).max(50, { message: 'Brand must not exceed 50 characters' }).trim(),
    price: zod_1.z.number().positive({ message: 'Price must be a positive number' }),
    type: zod_1.z.enum([
        'Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'
    ], {
        errorMap: () => ({
            message: 'Type must be one of: Mountain, Road, Hybrid, BMX, or Electric'
        }),
    }),
    description: zod_1.z.string().min(10, { message: 'Description must be at least 10 characters long' })
        .max(500, { message: 'Description must not exceed 500 characters' })
        .trim(),
    quantity: zod_1.z.number().int({ message: 'Quantity must be an integer' }).nonnegative({
        message: 'Quantity cannot be negative'
    }).max(1000, {
        message: 'Quantity cannot exceed 1,000'
    }),
    inStock: zod_1.z.boolean()
});
