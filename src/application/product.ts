import product from '../infrastructure/db/entities/Product';
import NotFoundError from "../domain/errors/not-found-error";
import { Request, Response, NextFunction } from "express";
import { CreateProductDTO } from '../domain/errors/DTO/product';
import { randomUUID } from 'crypto';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import category from '../infrastructure/db/entities/Categories'; 
import color from '../infrastructure/db/entities/Color';
import S3 from '../infrastructure/s3';

const getAllProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categorySlug, colorSlug, sortByPrice, search } = req.query as {
      categorySlug?: string;
      colorSlug?: string;
      sortByPrice?: 'asc' | 'desc';
      search?: string;
    }; 

    const query: Record<string, any> = {};

    if (search && typeof search === 'string' && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: regex },
        { description: regex },
      ];
    }

    if (categorySlug) query.categorySlug = categorySlug.toLowerCase();
    if (colorSlug) query.colorSlug = colorSlug.toLowerCase();

    let sortOption: Record<string, 1 | -1> = {};
    if (sortByPrice === 'asc') sortOption = { price: 1 };
    if (sortByPrice === 'desc') sortOption = { price: -1 };

    const products = await product.find(query)
      .sort(sortOption)
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
    
    const parseData = CreateProductDTO.parse(req.body);
    const { categoryId, colorId } = parseData;

    const categoryDoc = await category.findById(categoryId);
    if (!categoryDoc) 
        throw new NotFoundError('Category not found');

    const colorDoc = colorId ? await color.findById(colorId) : null;

    const payload = {
      ...parseData,
      categorySlug: (categoryDoc.categorySlug || categoryDoc.name).toString().toLowerCase(),
      colorSlug: colorDoc ? (colorDoc.colorSlug || colorDoc.name).toString().toLowerCase() : '',
    };

    const newProduct = await product.create(payload);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
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
