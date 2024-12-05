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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const mongoose_1 = require("mongoose");
// POST /api/products
// Create a product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        // parse product with zod
        const parsedProduct = product_validation_1.BicycleValidationSchema.parse(product);
        if (!parsedProduct) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data',
            });
        }
        // create product
        const result = yield product_service_1.productServices.createProductIntoDB(parsedProduct);
        if (!result) {
            return res.status(400).json({
                success: false,
                message: 'Failed to create Bicycle',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Bicycle created successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create Bicycle',
            error: error,
        });
    }
});
// GET /api/products
// get all products
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.productServices.getProductFromDB();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'No bicycles found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Bicycles retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to get Bicycles',
            error: error,
        });
    }
});
// GET /api/products/:productId
// get single product
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID',
            });
        }
        const result = yield product_service_1.productServices.getSingleProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Bicycle not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Bicycle retrieved successfully',
            data: result,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to get Bicycle',
            error: error,
        });
    }
});
// PUT /api/products/:productId
// update a product
const updateAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // validate product id
        if (!(0, mongoose_1.isValidObjectId)(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID',
            });
        }
        const updates = req.body;
        const parsedPriceAndQuantity = yield product_validation_1.BicycleValidationSchema.partial().parse(updates);
        const result = yield product_service_1.productServices.updateProductFromDB(productId, parsedPriceAndQuantity);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Bicycle not found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Bicycle updated successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to updated Bicycle',
            error: error,
        });
    }
});
// DELETE /api/products/:productId
// delete a product
const deleteAProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        // validate product id
        if (!(0, mongoose_1.isValidObjectId)(productId)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID',
            });
        }
        const result = yield product_service_1.productServices.deleteProductFromDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Bicycle not found',
            });
        }
        res.status(201).json({
            status: true,
            message: 'Bicycle deleted successfully',
            data: {},
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to updated Bicycle',
            error: error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateAProduct,
    deleteAProduct,
};
