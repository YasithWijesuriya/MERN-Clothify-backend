import category from '../infrastructure/db/entities/categories.js';
import ValidationError from "../domain/errors/validation-error.js";
import NotFoundError from "../domain/errors/not-found-error.js";

const getAllCategories = async (req, res, next) => {
    try {
        const categories = await category.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const newCategory = req.body;
        if (!newCategory.name) {
            throw new ValidationError("Category name is required");
        }
        const createdCategory = await category.create(newCategory);
        res.status(201).json(createdCategory);
    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (req, res, next) => {
    try {
        const foundCategory = await category.findById(req.params.id);
        if (!foundCategory) {
            throw new NotFoundError("Category not found");
        }
        res.json(foundCategory);
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const updatedCategory = await category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedCategory) {
            throw new NotFoundError("Category not found");
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const deletedCategory = await category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            throw new NotFoundError("Category not found");
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getAllCategories, createCategory, getCategoryById, updateCategory, deleteCategory };