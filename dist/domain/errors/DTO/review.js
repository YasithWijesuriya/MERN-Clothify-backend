"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReviewDTO = void 0;
const zod_1 = require("zod");
const CreateReviewDTO = zod_1.z.object({
    review: zod_1.z.string().min(1, "Review text is required"),
    rating: zod_1.z.number().min(1).max(5, "Rating must be between 1 and 5"),
    productId: zod_1.z.string().min(1, "Product ID is required"),
});
exports.CreateReviewDTO = CreateReviewDTO;
//# sourceMappingURL=review.js.map