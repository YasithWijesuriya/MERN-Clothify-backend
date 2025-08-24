"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../application/product");
const authentication_middleware_1 = require("../api/middleware/authentication-middleware");
const authorization_middleware_1 = require("../api/middleware/authorization-middleware");
const productRouter = express_1.default.Router();
productRouter
    .route("/")
    .get(product_1.getAllProduct)
    .post(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, product_1.createProduct);
productRouter
    .route('/:id')
    .get(product_1.getProductById)
    .put(product_1.updateProduct)
    .delete(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, product_1.deleteProduct);
productRouter
    .route('/images')
    .post(product_1.uploadProductImage);
exports.default = productRouter;
//# sourceMappingURL=product.js.map