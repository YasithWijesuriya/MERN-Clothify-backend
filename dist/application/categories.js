"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.createCategory = exports.getAllCategories = void 0;
const Categories_1 = __importDefault(require("../infrastructure/db/entities/Categories"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const category_1 = require("../domain/errors/DTO/category");
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await Categories_1.default.find();
        res.status(200).json(categories);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllCategories = getAllCategories;
const createCategory = async (req, res, next) => {
    const result = category_1.CreateCategoryDTO.safeParse(req.body);
    if (!result.success) {
        throw new validation_error_1.default(result.error.message);
    }
    try {
        const newCategory = await Categories_1.default.create(result.data);
        res.status(201).json(newCategory);
    }
    catch (error) {
        next(error);
    }
};
exports.createCategory = createCategory;
const getCategoryById = async (req, res, next) => {
    try {
        const foundCategory = await Categories_1.default.findById(req.params.id);
        if (!foundCategory) {
            throw new not_found_error_1.default("Category not found");
        }
        res.json(foundCategory);
    }
    catch (error) {
        next(error);
    }
};
exports.getCategoryById = getCategoryById;
const updateCategory = async (req, res, next) => {
    try {
        const updatedCategory = await Categories_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCategory) {
            throw new not_found_error_1.default("Category not found");
        }
        res.status(200).json(updatedCategory);
    }
    catch (error) {
        next(error);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res, next) => {
    try {
        const deletedCategory = await Categories_1.default.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            throw new not_found_error_1.default("Category not found");
        }
        res.status(200).json({ message: "Category deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categories.js.map