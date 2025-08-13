import { z } from "zod";

const CreateProductDTO = z.object({
  categoryId: z.string().min(1),
  name: z.string().min(1),
  image: z.string().min(1),
  stock: z.number(),
  price: z.number().nonnegative(),
  colorId: z.string().optional(), // Optional color reference
});

export { CreateProductDTO };