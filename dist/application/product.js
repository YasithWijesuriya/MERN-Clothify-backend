"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadProductImage = exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.createProduct = exports.getAllProduct = void 0;
const Product_1 = __importDefault(require("../infrastructure/db/entities/Product"));
const not_found_error_1 = __importDefault(require("../domain/errors/not-found-error"));
const product_1 = require("../domain/errors/DTO/product");
const crypto_1 = require("crypto");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const client_s3_1 = require("@aws-sdk/client-s3");
const Categories_1 = __importDefault(require("../infrastructure/db/entities/Categories"));
const Color_1 = __importDefault(require("../infrastructure/db/entities/Color"));
const s3_1 = __importDefault(require("../infrastructure/s3"));
const getAllProduct = async (req, res, next) => {
    try {
        const { categorySlug, colorSlug, sortByPrice, search } = req.query;
        const query = {};
        if (search && typeof search === 'string' && search.trim() !== '') {
            const regex = new RegExp(search.trim(), 'i');
            query.$or = [
                { name: regex },
                { description: regex },
            ];
        }
        if (categorySlug)
            query.categorySlug = categorySlug.toLowerCase();
        if (colorSlug)
            query.colorSlug = colorSlug.toLowerCase();
        let sortOption = {};
        if (sortByPrice === 'asc')
            sortOption = { price: 1 };
        if (sortByPrice === 'desc')
            sortOption = { price: -1 };
        const products = await Product_1.default.find(query)
            .sort(sortOption)
            .populate("reviews")
            .populate("colorId")
            .populate("categoryId");
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
};
exports.getAllProduct = getAllProduct;
const createProduct = async (req, res, next) => {
    try {
        const parseData = product_1.CreateProductDTO.parse(req.body);
        const { categoryId, colorId } = parseData;
        const categoryDoc = await Categories_1.default.findById(categoryId);
        if (!categoryDoc)
            throw new not_found_error_1.default('Category not found');
        const colorDoc = colorId ? await Color_1.default.findById(colorId) : null;
        const payload = {
            ...parseData,
            categorySlug: (categoryDoc.categorySlug || categoryDoc.name).toString().toLowerCase(),
            colorSlug: colorDoc ? (colorDoc.colorSlug || colorDoc.name).toString().toLowerCase() : '',
        };
        const newProduct = await Product_1.default.create(payload);
        res.status(201).json(newProduct);
    }
    catch (err) {
        next(err);
    }
};
exports.createProduct = createProduct;
const getProductById = async (req, res, next) => {
    try {
        const products = await Product_1.default.findById(req.params.id)
            .populate("reviews")
            .populate("colorId");
        if (!products) {
            throw new not_found_error_1.default("Product not found");
        }
        res.json(products);
    }
    catch (error) {
        next(error);
    }
};
exports.getProductById = getProductById;
const updateProduct = async (req, res, next) => {
    try {
        const products = await Product_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!products) {
            throw new not_found_error_1.default("Product not found");
        }
        res.status(200).json(products);
    }
    catch (error) {
        next(error);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res, next) => {
    try {
        const products = await Product_1.default.findByIdAndDelete(req.params.id);
        if (!products) {
            throw new not_found_error_1.default("Product not found");
        }
        res.status(200).json({ message: "Product deleted successfully" });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProduct = deleteProduct;
// Generate signed URL for upload
const uploadProductImage = async (req, res, next) => {
    try {
        const { fileType } = req.body;
        const ext = fileType.split("/")[1]; // e.g. "png"
        const id = (0, crypto_1.randomUUID)();
        const key = `${id}.${ext}`; // now includes extension
        const url = await (0, s3_request_presigner_1.getSignedUrl)(s3_1.default, new client_s3_1.PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
            Key: key,
            ContentType: fileType,
        }), { expiresIn: 60 });
        const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_DOMAIN}/${key}`;
        res.status(200).json({
            url, // upload link
            publicUrl // save this in DB
        });
    }
    catch (error) {
        next(error);
    }
};
exports.uploadProductImage = uploadProductImage;
//# sourceMappingURL=product.js.map