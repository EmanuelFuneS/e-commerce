import {
  ChangePasswordSchema,
  LoginSchema,
  RecoveryPasswordSchema,
  RegisterSchema,
  ResetPasswordSchema,
} from "../schemas/form.schema";

export default {
  registerPost: async (data: RegisterSchema) => {
    const response = await fetch(
      `${import.meta.env.VITE_AUTH_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    console.warn(response);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "register Failed");
    }
    return response.json();
  },
  loginPost: async (data: LoginSchema) => {
    const response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login Failed");
    }
    return response.json();
  },
  validateTokenPost: async (data: any) => {
    const response = await fetch(
      `${import.meta.env.VITE_AUTH_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login Failed");
    }
    return response.json();
  },
  changePasswordPost: async (data: ChangePasswordSchema) => {
    const response = await fetch(
      `${import.meta.env.VITE_AUTH_API_URL}/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login Failed");
    }
    return response.json();
  },
  recoveryPasswordPost: async (data: RecoveryPasswordSchema) => {
    const response = await fetch(
      `${import.meta.env.VITE_AUTH_API_URL}/recovery-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login Failed");
    }
    return response.json();
  },
  resetPasswordPost: async (data: ResetPasswordSchema) => {
    const response = await fetch(
      `${import.meta.env.VITE_AUTH_API_URL}/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login Failed");
    }
    return response.json();
  },
};
