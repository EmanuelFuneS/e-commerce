import zod from "zod";

export const CategorySchema = zod.object({
  name: zod.string(),
  logo: zod.string().url({ message: "Logo URL must be a valid URL" }),
});

export default CategorySchema;

export type { zod as ZodType };
export type CategorySchemaType = zod.infer<typeof CategorySchema>;
