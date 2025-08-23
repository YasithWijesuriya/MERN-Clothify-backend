import Gallery from "../infrastructure/db/entities/Gallery";
import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose"; 
import { CreateGalleryDTO } from "../domain/errors/DTO/gallery";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import S3 from "../infrastructure/s3"; 


const createGalleryItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validation
    const parsed = CreateGalleryDTO.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        status: "error",
        message: "Validation failed",
        errors: parsed.error.format(),
      });
    }

    const { description, images } = parsed.data;

    const galleryItem = await Gallery.create({
      description,
      images,
      createdAt: new Date(),
    });

    res.status(201).json(galleryItem);
  } catch (error) {
    next(error);
  }
};


const getGalleryItems = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const galleryItems = await Gallery.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    res.status(200).json(galleryItems);
  } catch (error) {
    next(error);
  }
};


const deleteGalleryItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({ message: "Invalid gallery item ID" });
    }

    const deletedItem = await Gallery.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Gallery item not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};


const getSignedGalleryImageUrl = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { fileType } = req.body;
    if (!fileType) {
      return res.status(400).json({ message: "fileType is required" });
    }

    const ext = fileType.split("/")[1] || "jpg";
    const key = `gallery/${Date.now()}-${crypto.randomUUID()}.${ext}`;

    const command = new PutObjectCommand({
      Bucket: process.env.CLOUDFLARE_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
    });

    const url = await getSignedUrl(S3, command, { expiresIn: 60 });
    const publicUrl = `${process.env.CLOUDFLARE_PUBLIC_DOMAIN}/${key}`;

    res.json({ url, publicUrl });
  } catch (error) {
    next(error);
  }
};

export { createGalleryItem, getGalleryItems, deleteGalleryItem, getSignedGalleryImageUrl };
