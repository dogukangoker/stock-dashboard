import { z } from "zod";

export const SearchParamsSchema = z.object({
    search: z.string().optional(),
});