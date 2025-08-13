import { z } from 'zod';

export const CreateColorDTO = z.object({
    name: z.string().min(1, "Color name is required").max(50, "Color name must be less than 50 characters"),
    description: z.string().optional(),
});

export const UpdateColorDTO = CreateColorDTO.partial();

export type CreateColorInput = z.infer<typeof CreateColorDTO>;
export type UpdateColorInput = z.infer<typeof UpdateColorDTO>; 