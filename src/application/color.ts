import color from '../infrastructure/db/entities/Color';
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import { Request, Response, NextFunction } from "express";
import { CreateColorDTO, UpdateColorDTO } from '../domain/errors/DTO/color';


const getAllColors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colors = await color.find();
        res.status(200).json(colors);
    } catch (error) {
        next(error);
    }
};


const getColorById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const colorItem = await color.findById(req.params.id);
        
        if (!colorItem) {
            throw new NotFoundError("Color not found");
        }
        
        res.json(colorItem);
    } catch (error) {
        next(error);
    }
};

const createColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = CreateColorDTO.safeParse(req.body);
        if (!result.success) {
            throw new ValidationError(result.error.message);
        }

        const newColor = await color.create(result.data);
        res.status(201).json(newColor);
    } catch (error) {
        next(error);
    }
}


const updateColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = UpdateColorDTO.safeParse(req.body);
        if (!result.success) {
            throw new ValidationError(result.error.message);
        }
        
        const updatedColor = await color.findByIdAndUpdate(
            req.params.id,
            result.data,
            { new: true }
        );
        
        if (!updatedColor) {
            throw new NotFoundError("Color not found");
        }
        
        res.status(200).json(updatedColor);
    } catch (error) {
        next(error);
    }
};


const deleteColor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedColor = await color.findByIdAndDelete(req.params.id);
        
        if (!deletedColor) {
            throw new NotFoundError("Color not found");
        }
        
        res.status(200).json({ message: "Color deleted successfully" });
    } catch (error) {
        next(error);
    }
};

export { getAllColors, createColor, getColorById, updateColor, deleteColor }; 