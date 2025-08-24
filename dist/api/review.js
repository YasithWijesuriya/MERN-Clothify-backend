"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const review_1 = require("../application/review");
const authentication_middleware_1 = require("../api/middleware/authentication-middleware");
const reviewRouter = express_1.default.Router();
reviewRouter.route('/')
    .get(review_1.getAllReviews)
    .post(authentication_middleware_1.isAuthenticated, review_1.createReview);
reviewRouter.route('/:id')
    .get(review_1.getReview)
    .delete(authentication_middleware_1.isAuthenticated, review_1.deleteReview);
// reviewRouter.route('/:id').get(getProductById).put(updateProduct).delete(deleteProduct);
exports.default = reviewRouter;
//# sourceMappingURL=review.js.map