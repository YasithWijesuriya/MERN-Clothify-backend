import {z} from "zod";

const CreateCategoryDTO = z.object({
  name: z.string().min(1, "Category name is required"),
});

export {CreateCategoryDTO};