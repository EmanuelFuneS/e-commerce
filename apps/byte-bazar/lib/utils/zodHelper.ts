import z from "zod";

export default class ZodHelper {
  static createPcSchema<T extends readonly string[]>(categories: T) {
    const schemaShape = {} as Record<T[number], z.ZodOptional<z.ZodString>>;

    categories.forEach((category) => {
      schemaShape[category as T[number]] = z.string().optional();
      /*  .min(1, { message: `${category} is required` }); */
    });
    return z.object(schemaShape);
  }
}
