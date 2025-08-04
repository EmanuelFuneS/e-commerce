import zod from "zod";

const brandSchema = zod.object({
  name: zod.string().min(1, { message: "Brand name is required" }),
  logoUrl: zod.string().url({ message: "Logo URL must be a valid URL" }),
});

export default brandSchema;

export type { zod as ZodType };
export type BrandSchema = zod.infer<typeof brandSchema>;
