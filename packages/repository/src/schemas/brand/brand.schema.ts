import zod from "zod";

const brandSchema = zod.object({
  id: zod.string().optional(),
  name: zod.string().min(1, { message: "Brand name is required" }),
  logo: zod.string().url({ message: "Logo URL must be a valid URL" }),
  website: zod.string().url({ message: "Website URL must be a valid URL" }),
});

export default brandSchema;

export type { zod as ZodType };
export type BrandSchema = zod.infer<typeof brandSchema>;
