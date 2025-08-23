import { createGalleryItem, getGalleryItems, deleteGalleryItem,getSignedGalleryImageUrl } from "../application/gallery";
import express from "express";
import isAuthenticated from "./middleware/authentication-middleware";
import isAdmin from "./middleware/authorization-middleware";

const galleryRouter = express.Router();

galleryRouter.route("/")
.post( isAuthenticated, isAdmin, createGalleryItem)
.get( getGalleryItems);
galleryRouter.route("/:id")
.delete( isAuthenticated, isAdmin, deleteGalleryItem)
galleryRouter.route("/images")
.post( getSignedGalleryImageUrl);

export default galleryRouter;
