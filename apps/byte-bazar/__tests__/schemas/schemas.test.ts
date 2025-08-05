import AuthSchema from "../../lib/schemas/auth/login.schema";

describe("Auth Schema for Login", () => {
  it("should validate correct user data", () => {
    const validData = {
      email: "test@example.com",
      password: "password123",
    };

    const result = AuthSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });
});
