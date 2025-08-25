"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteColor = exports.updateColor = exports.getColorById = exports.createColor = exports.getAllColors = void 0;
const Color_1 = __importDefault(require("../infrastructure/db/entities/Color"));
const validation_error_1 = __importDefault(require("../domain/errors/validation-error"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const color_1 = require("../domain/errors/DTO/color");
const getAllColors = async (req, res, next) => {
    try {
        const colors = await Color_1.default.find();
        res.status(200).json(colors);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllColors = getAllColors;
const getColorById = async (req, res, next) => {
    try {
        const colorItem = await Color_1.default.findById(req.params.id);
        if (!colorItem) {
            throw new not_found_error_1.default("Color not found");
        }
        res.json(colorItem);
    }
    catch (error) {
        next(error);
    }
};
exports.getColorById = getColorById;
const createColor = async (req, res, next) => {
    try {
        const result = color_1.CreateColorDTO.safeParse(req.body);
        if (!result.success) {
            throw new validation_error_1.default(result.error.message);
        }
        const newColor = await Color_1.default.create(result.data);
        res.status(201).json(newColor);
    }
    catch (error) {
        next(error);
    }
};
exports.createColor = createColor;
const updateColor = async (req, res, next) => {
    try {
        const result = color_1.UpdateColorDTO.safeParse(req.body);
        if (!result.success) {
            throw new validation_error_1.default(result.error.message);
        }
        const updatedColor = await Color_1.default.findByIdAndUpdate(req.params.id, result.data, { new: true });
        if (!updatedColor) {
            throw new not_found_error_1.default("Color not found");
        }
        res.status(200).json(updatedColor);
    }
    catch (error) {
        next(error);
    }
};
exports.updateColor = updateColor;
const deleteColor = async (req, res, next) => {
    try {
        const deletedColor = await Color_1.default.findByIdAndDelete(req.params.id);
        if (!deletedColor) {
            throw new not_found_error_1.default("Color not found");
        }
        res.status(200).json({ message: "Color deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteColor = deleteColor;
//# sourceMappingURL=color.js.map