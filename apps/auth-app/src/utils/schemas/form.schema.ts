import zod from "zod";

export const registerSchema = zod
  .object({
    email: zod.string().email().nonempty(),
    name: zod.string().nonempty(),
    password: zod.string().min(6, "Must be at least 6 characters long"),
    confirmPassword: zod.string().min(6, "Must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = zod.object({
  email: zod.string().email().nonempty(),
  password: zod.string().min(6).nonempty(),
});

export const validateTokenSchema = zod.object({
  token: zod.string().min(6).nonempty(),
});

export const changePasswordSchema = zod.object({
  oldPassword: zod.string().min(6).nonempty(),
  password: zod.string().min(6).nonempty(),
  confirmPassword: zod.string().min(6).nonempty(),
});

export const recoveryPasswordSchema = zod.object({
  email: zod.string().email().nonempty(),
});

export const resetPasswordSchema = zod
  .object({
    email: zod.string().email(),
    token: zod.string().min(6),
    password: zod.string().min(6),
    confirmPassword: zod.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = zod.infer<typeof registerSchema>;
export type LoginSchema = zod.infer<typeof loginSchema>;
export type ValidateTokenSchema = zod.infer<typeof validateTokenSchema>;
export type ChangePasswordSchema = zod.infer<typeof changePasswordSchema>;
export type RecoveryPasswordSchema = zod.infer<typeof recoveryPasswordSchema>;
export type ResetPasswordSchema = zod.infer<typeof resetPasswordSchema>;
