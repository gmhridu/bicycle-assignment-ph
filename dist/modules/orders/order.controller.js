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
exports.orderController = void 0;
const order_validation_zod_1 = require("./order.validation.zod");
const order_service_1 = require("./order.service");
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        if (!orderData) {
            return res.status(400).json({
                success: false,
                message: 'No order data provided',
            });
        }
        const parsedOrderData = order_validation_zod_1.orderValidationSchemaZod.parse(orderData);
        const matchedOrderData = Object.assign(Object.assign({}, parsedOrderData), { products: parsedOrderData.products.map((item) => (Object.assign(Object.assign({}, item), { product: new mongoose_1.default.Types.ObjectId(item.product) }))) });
        const order = yield order_service_1.orderServices.createOrder(matchedOrderData);
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            data: order,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create order',
            error: error,
        });
    }
});
// get all orders
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_service_1.orderServices.getOrderFromDB();
        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully',
            data: orders,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to retrieve orders',
            error: error,
        });
    }
});
// get totalRevenue
const getTotalRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getTotal = yield order_service_1.orderServices.getTotalRevenue();
        res.status(200).json({
            success: true,
            message: 'Total revenue retrieved successfully',
            data: {
                totalRevenue: getTotal,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to retrieve total revenue',
            error: error,
        });
    }
});
exports.orderController = {
    createOrder,
    getOrders,
    getTotalRevenue,
};
