import {z} from "zod";

const CreateGalleryDTO = z.object({
    description: z.string().min(2).max(1000),
    images: z.array(z.string().url())
})

export { CreateGalleryDTO };