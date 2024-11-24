"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const product_model_1 = __importDefault(require("../products/product.model"));
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        validate: /\S+@\S+\.\S+/,
    },
    products: [
        {
            product: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalQuantity: {
        type: Number,
        default: 0,
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0,
    },
}, { timestamps: true });
/*
Static Method to create Order with total price calculation
*/
orderSchema.statics.createOrderWithCalculation = function (orderData) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, products } = orderData;
        let totalPrice = 0;
        for (const item of products) {
            const product = yield product_model_1.default.findById(item.product);
            if (!product) {
                throw new Error(`Product with ID: ${item.product} not found`);
            }
            if (product.quantity < item.quantity) {
                throw new Error(`Insufficient stock for product: ${product.name} (Stock: ${product.quantity})`);
            }
            // calculate total price 
            totalPrice += product.price * item.quantity;
            // update stock after order
            product.quantity -= item.quantity;
            yield product.save();
        }
        const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);
        const order = new this({
            email,
            products,
            totalQuantity,
            totalPrice,
        });
        return yield order.save();
    });
};
// for total revenue
orderSchema.statics.getTotalRevenue = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield this.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                }
            }
        ]);
        return result.length > 0 ? result[0].totalRevenue : 0;
    });
};
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
