import { z } from 'zod';

export const CreateTrainerSchema = z.object({
    name: z.string(),
    sex: z.enum(["male", "female"])
});

export type CreateTrainerDto = z.infer<typeof CreateTrainerSchema>;