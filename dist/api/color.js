"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_middleware_1 = require("../api/middleware/authentication-middleware");
const authorization_middleware_1 = require("../api/middleware/authorization-middleware");
const color_1 = require("../application/color");
const colorRouter = express_1.default.Router();
colorRouter
    .route("/")
    .get(color_1.getAllColors)
    .post(color_1.createColor);
colorRouter
    .route('/:id')
    .get(color_1.getColorById)
    .put(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, color_1.updateColor)
    .delete(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, color_1.deleteColor);
exports.default = colorRouter;
//# sourceMappingURL=color.js.map