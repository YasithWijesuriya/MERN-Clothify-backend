import {z} from "zod";

const CreateCategoryDTO = z.object({
  name: z.string().min(1, "Category name is required"),
  categorySlug: z.string().min(1, "Category slug is required"),
});

export {CreateCategoryDTO};