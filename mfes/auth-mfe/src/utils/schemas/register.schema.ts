import zod from "zod";

export const registerSchema = zod.object({
  email: zod.string().email().nonempty(),
  name: zod.string().nonempty(),
  password: zod.string().min(6).nonempty(),
  confirmPassword: zod.string().min(6).nonempty(),
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

export const forgotPasswordSchema = zod.object({
  email: zod.string().email().nonempty(),
});

export const resetPasswordSchema = zod.object({
  password: zod.string().min(6).nonempty(),
  confirmPassword: zod.string().min(6).nonempty(),
});

export type RegisterSchema = zod.infer<typeof registerSchema>;
export type LoginSchema = zod.infer<typeof loginSchema>;
export type ValidateTokenSchema = zod.infer<typeof validateTokenSchema>;
export type ChangePasswordSchema = zod.infer<typeof changePasswordSchema>;
export type ForgotPasswordSchema = zod.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchema = zod.infer<typeof resetPasswordSchema>;
