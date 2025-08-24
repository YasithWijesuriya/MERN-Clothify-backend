"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryDTO = void 0;
const zod_1 = require("zod");
const CreateCategoryDTO = zod_1.z.object({
    name: zod_1.z.string().min(1, "Category name is required"),
    categorySlug: zod_1.z.string().min(1, "Category slug is required"),
});
exports.CreateCategoryDTO = CreateCategoryDTO;
//# sourceMappingURL=category.js.map