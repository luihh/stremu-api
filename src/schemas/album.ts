import { z } from 'zod';

export const albumSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  releaseYear: z.number().int().gte(1900).lte(new Date().getFullYear()),
  artistId: z.number().int().positive('Artist ID is required'),
});

export type AlbumInput = z.infer<typeof albumSchema>;
