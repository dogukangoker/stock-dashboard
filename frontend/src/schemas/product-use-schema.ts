import { z } from "zod";

const productCountSchema = z.object({
  id: z.number().int().nonnegative(),
  count: z.number().int().nonnegative(),
});

const updateProductCountSchema = z.object({
  products: z.array(productCountSchema),
});

type UpdateProductCountSchema = z.infer<typeof updateProductCountSchema>;

export { updateProductCountSchema, type UpdateProductCountSchema };
