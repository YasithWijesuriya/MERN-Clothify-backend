import { z } from 'zod';

export const CreateColorDTO = z.object({
    name: z.string().min(1, "Color name is required").max(50, "Color name must be less than 50 characters"),
    description: z.string().optional(),
    colorSlug: z.string().min(1, "Color slug is required").max(50, "Color slug must be less than 50 characters"),

});

export const UpdateColorDTO = CreateColorDTO.partial();

export type CreateColorInput = z.infer<typeof CreateColorDTO>;
export type UpdateColorInput = z.infer<typeof UpdateColorDTO>; 