import { z } from "zod";

export const orderValidationSchemaZod = z.object({
    email: z.string().email("Invalid email address"),
    products: z.array(
        z.object({
            product: z.string().min(1, "Product ID is required"),
            quantity: z.number().min(1, "Quantity must be at least 1"),
        })
    ),
    totalQuantity: z.number().optional(),
    totalPrice: z.number().min(0, 'Total price must be at least 0')
});

