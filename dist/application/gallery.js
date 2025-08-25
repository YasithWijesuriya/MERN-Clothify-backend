"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSignedGalleryImageUrl = exports.deleteGalleryItem = exports.getGalleryItems = exports.createGalleryItem = void 0;
const Gallery_1 = __importDefault(require("../infrastructure/db/entities/Gallery"));
const mongoose_1 = require("mongoose");
const gallery_1 = require("../domain/errors/DTO/gallery");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const crypto_1 = __importDefault(require("crypto"));
const s3_1 = __importDefault(require("../infrastructure/s3"));
const createGalleryItem = async (req, res, next) => {
    try {
        const parsed = gallery_1.CreateGalleryDTO.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: parsed.error.format(),
            });
        }
        const { description, images } = parsed.data;
        const galleryItem = await Gallery_1.default.create({
            description,
            images,
            createdAt: new Date(),
        });
        res.status(201).json(galleryItem);
    }
    catch (error) {
        next(error);
    }
};
exports.createGalleryItem = createGalleryItem;
const getGalleryItems = async (req, res, next) => {
    try {
        const galleryItems = await Gallery_1.default.find()
            .sort({ createdAt: -1 })
            .select("-__v");
        res.status(200).json(galleryItems);
    }
    catch (error) {
        next(error);
    }
};
exports.getGalleryItems = getGalleryItems;
const deleteGalleryItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            return res.status(400).json({ message: "Invalid gallery item ID" });
        }
        const deletedItem = await Gallery_1.default.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: "Gallery item not found" });
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.deleteGalleryItem = deleteGalleryItem;
const getSignedGalleryImageUrl = async (req, res, next) => {
    try {
        const { fileType } = req.body;
        if (!fileType) {
            return res.status(400).json({ message: "fileType is required" });
        }
        const ext = fileType.split("/")[1] || "jpg";
        const key = `gallery/${Date.now()}-${crypto_1.default.randomUUID()}.${ext}`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: process.env.CLOUDFLARE_BUCKET_NAME,
            Key: key,
            ContentType: fileType,
        });
        const url = await (0, s3_request_presigner_1.getSignedUrl)(s3_1.default, command, { expiresIn: 60 });
        const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_DOMAIN}/${key}`;
        res.json({ url, publicUrl });
    }
    catch (error) {
        next(error);
    }
};
exports.getSignedGalleryImageUrl = getSignedGalleryImageUrl;
//# sourceMappingURL=gallery.js.map