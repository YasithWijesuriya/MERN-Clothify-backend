import category from '../infrastructure/db/entities/Categories';
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import { CreateCategoryDTO } from '../domain/errors/DTO/category';
import { Request, Response, NextFunction } from "express";

const getAllCategories = async (req:Request , res:Response ,next:NextFunction) => {
    try {
        const categories = await category.find();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req:Request , res:Response ,next:NextFunction) => {
    const result= CreateCategoryDTO.safeParse(req.body);
    if (!result.success) {
        throw new ValidationError(result.error.message);
    }
    try {
        const newCategory = await category.create(result.data);
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
};

const getCategoryById = async (req:Request , res:Response ,next:NextFunction) => {
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

const updateCategory = async (req:Request , res:Response ,next:NextFunction) => {
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

const deleteCategory = async (req:Request , res:Response ,next:NextFunction) => {
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