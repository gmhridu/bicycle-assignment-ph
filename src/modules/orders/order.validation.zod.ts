import { z } from "zod";

const ObjectIdRegex =  /^[0-9a-fA-F]{24}$/;

export const orderValidationSchemaZod = z.object({
    email: z.string().email("Invalid email address"),
    products: z.array(
        z.object({
            product: z.string().regex(ObjectIdRegex, 'Invalid product ID'),
            quantity: z.number().min(1, "Quantity must be at least 1"),
        })
    ),
    totalQuantity: z.number().optional(),
});

