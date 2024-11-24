"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationSchemaZod = void 0;
const zod_1 = require("zod");
const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;
exports.orderValidationSchemaZod = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    products: zod_1.z.array(zod_1.z.object({
        product: zod_1.z.string().regex(ObjectIdRegex, 'Invalid product ID'),
        quantity: zod_1.z.number().min(1, "Quantity must be at least 1"),
    })),
    totalQuantity: zod_1.z.number().optional(),
});
