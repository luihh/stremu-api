import { z } from 'zod';

export const artistSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export type ArtistInput = z.infer<typeof artistSchema>;
