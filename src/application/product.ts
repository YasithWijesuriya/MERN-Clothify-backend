import mongoose from 'mongoose';
import product from '../infrastructure/db/entities/Product';
import ValidationError from "../domain/errors/validation-error";
import NotFoundError from "../domain/errors/not-found-error";
import { Request, Response, NextFunction } from "express";
import { CreateProductDTO } from '../domain/errors/DTO/product';
import { randomUUID } from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import category from '../infrastructure/db/entities/Categories'; 
import S3 from '../infrastructure/s3';

const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categoryId = req.query.categoryId;
        let query = {};

        if (categoryId && typeof categoryId === 'string') {
            query = { categoryId: new mongoose.Types.ObjectId(categoryId) };
        }

        const products = await product.find(query)
            .populate("reviews")
            .populate("colorId")
            .populate("categoryId");

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = CreateProductDTO.safeParse(req.body);
        if (!result.success) {
            throw new ValidationError(result.error.message);
        }

           // Find category document to get name & slug
    const Category = await category.findById(result.data.categoryId);
    if (!Category) {
      throw new NotFoundError("Category not found");
    }

    // Generate slug from category name (or use category.slug if exists)
    const categorySlug = Category.categorySlug
      ? Category.categorySlug
      : Category.name.toLowerCase().replace(/\s+/g, '-');

    // Create product with auto slug
    await product.create({
      ...result.data,
      categorySlug,
      image: req.body.image
    });

        res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await product.findById(req.params.id)
            .populate("reviews")
            .populate("colorId");

        if (!products) {
            throw new NotFoundError("Product not found");
        }

        res.json(products);
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!products) {
            throw new NotFoundError("Product not found");
        }

        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await product.findByIdAndDelete(req.params.id);

        if (!products) {
            throw new NotFoundError("Product not found");
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

// Generate signed URL for upload
const uploadProductImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { fileType } = req.body;
        const ext = fileType.split("/")[1]; // e.g. "png"
        const id = randomUUID();
        const key = `${id}.${ext}`; // now includes extension

        const url = await getSignedUrl(
            S3,
            new PutObjectCommand({
                Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
                Key: key,
                ContentType: fileType,
            }),
            { expiresIn: 60 }
        );

        const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_DOMAIN}/${key}`;

        res.status(200).json({
            url,       // upload link
            publicUrl  // save this in DB
        });
    } catch (error) {
        next(error);
    }
};



export {
    getAllProduct,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    uploadProductImage
};
