"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateGalleryDTO = void 0;
const zod_1 = require("zod");
const CreateGalleryDTO = zod_1.z.object({
    description: zod_1.z.string().min(2).max(1000),
    images: zod_1.z.array(zod_1.z.string().url())
});
exports.CreateGalleryDTO = CreateGalleryDTO;
//# sourceMappingURL=gallery.js.map