"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categories_1 = require("../application/categories");
const categoryRouter = express_1.default.Router();
categoryRouter.route('/').get(categories_1.getAllCategories).post(categories_1.createCategory);
categoryRouter.route('/:id').get(categories_1.getCategoryById).put(categories_1.updateCategory).delete(categories_1.deleteCategory);
exports.default = categoryRouter;
//# sourceMappingURL=categories.js.map