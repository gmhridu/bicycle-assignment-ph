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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const order_model_1 = require("./order.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield order_model_1.Order.createOrderWithCalculation(orderData);
    return res;
});
const getOrderFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield order_model_1.Order.find();
    return res;
});
const getTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    const revenue = yield order_model_1.Order.getTotalRevenue();
    return revenue;
});
exports.orderServices = {
    createOrder,
    getTotalRevenue,
    getOrderFromDB,
};
