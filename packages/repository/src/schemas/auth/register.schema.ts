import zod from "zod";

const registerSchema = zod
  .object({
    name: zod.string().min(1, { message: "Name is required" }),
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: zod
      .string()
      .min(6, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
  });

export default registerSchema;

export type { zod as ZodType };
export type RegisterSchema = zod.infer<typeof registerSchema>;
