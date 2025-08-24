"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gallery_1 = require("../application/gallery");
const express_1 = __importDefault(require("express"));
const authentication_middleware_1 = require("../api/middleware/authentication-middleware");
const authorization_middleware_1 = require("../api/middleware/authorization-middleware");
const galleryRouter = express_1.default.Router();
galleryRouter.route("/")
    .post(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, gallery_1.createGalleryItem)
    .get(gallery_1.getGalleryItems);
galleryRouter.route("/:id")
    .delete(authentication_middleware_1.isAuthenticated, authorization_middleware_1.isAdmin, gallery_1.deleteGalleryItem);
galleryRouter.route("/images")
    .post(gallery_1.getSignedGalleryImageUrl);
exports.default = galleryRouter;
//# sourceMappingURL=gallery.js.map