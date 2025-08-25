"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../application/order");
const authentication_middleware_1 = require("../api/middleware/authentication-middleware");
const authorization_middleware_1 = require("../api/middleware/authorization-middleware");
const orderRouter = express_1.default.Router();
orderRouter.route("/")
    .get(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, order_1.getAllOrders)
    .post(authentication_middleware_1.isAuthenticated, order_1.createOrder);
orderRouter.route("/my-orders")
    .get(authentication_middleware_1.isAuthenticated, order_1.getMyOrders);
orderRouter.route("/daily-sales")
    .get(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, order_1.getDailySales);
exports.default = orderRouter;
//# sourceMappingURL=order.js.map