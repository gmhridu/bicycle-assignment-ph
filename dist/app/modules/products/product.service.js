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
exports.productServices = void 0;
const product_model_1 = __importDefault(require("./product.model"));
// create product into db
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.default.create(productData);
    return res;
});
// fetch all products from db
const getProductFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.default.find();
    return res;
});
// get a single product from db
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.default.findById(productId);
    return res;
});
// update a product in db
const updateProductFromDB = (productId, updates) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(productId, {
        $set: updates,
    }, { new: true });
    return result;
});
// delete a product from db
const deleteProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield product_model_1.default.findByIdAndDelete(productId);
    return res;
});
exports.productServices = {
    createProductIntoDB,
    getProductFromDB,
    getSingleProductFromDB,
    updateProductFromDB,
    deleteProductFromDB,
};
