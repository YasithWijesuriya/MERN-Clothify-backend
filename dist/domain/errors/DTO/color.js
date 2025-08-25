"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateColorDTO = exports.CreateColorDTO = void 0;
const zod_1 = require("zod");
exports.CreateColorDTO = zod_1.z.object({
    name: zod_1.z.string().min(1, "Color name is required").max(50, "Color name must be less than 50 characters"),
    description: zod_1.z.string().optional(),
    colorSlug: zod_1.z.string().min(1, "Color slug is required").max(50, "Color slug must be less than 50 characters"),
});
exports.UpdateColorDTO = exports.CreateColorDTO.partial();
//# sourceMappingURL=color.js.map