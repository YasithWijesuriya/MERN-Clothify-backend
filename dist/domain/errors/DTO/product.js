"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductDTO = void 0;
const zod_1 = require("zod");
const CreateProductDTO = zod_1.z.object({
    categoryId: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    image: zod_1.z.string().min(1),
    stock: zod_1.z.number(),
    price: zod_1.z.number().nonnegative(),
    description: zod_1.z.string().min(1),
    colorId: zod_1.z.string().optional(),
});
exports.CreateProductDTO = CreateProductDTO;
//# sourceMappingURL=product.js.map