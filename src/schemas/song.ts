import { z } from 'zod';

export const songSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  artistId: z.number().int().positive('Artist ID is required'),
  albumId: z.number().int().positive().optional(),
});

export type SongInput = z.infer<typeof songSchema>;
