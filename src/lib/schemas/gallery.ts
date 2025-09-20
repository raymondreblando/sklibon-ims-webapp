import { z } from "zod";

const GalleryImageSchema = z.object({ image_url: z.string() });

const BaseSchema = z.object({
  title: z
    .string()
    .min(1, { message: "The title field is required." })
    .max(255, { message: "Title must not be greater than 255 characters." }),
  description: z
    .string()
    .min(1, { message: "The description field is required." }),
  images: z.array(GalleryImageSchema).optional(),
  hasSelectedFile: z.boolean().optional(),
});

const CreateGalleryImageSchema = z.object({
  gallery_id: z.string(),
  images: z.array(GalleryImageSchema),
});

export const CreateGallerySchema = BaseSchema.refine(
  (data) => data.hasSelectedFile === true,
  {
    path: ["hasSelectedFile"],
    error: "No image was uploaded. Kindly upload the gallery image.",
  },
);

export const UpdateGallerySchema = BaseSchema.omit({ images: true });

export type CreateGalleryField = z.infer<typeof CreateGallerySchema>;
export type UpdateGalleryField = z.infer<typeof UpdateGallerySchema>;
export type CreateGalleryImageField = z.infer<typeof CreateGalleryImageSchema>;
