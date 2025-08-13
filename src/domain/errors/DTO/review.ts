import { z } from "zod";

const CreateReviewDTO = z.object({
  user: z.string().min(2, "User name is required"),
  review: z.string().min(1, "Review text is required"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  productId: z.string().min(1, "Product ID is required"),
});

export { CreateReviewDTO };
