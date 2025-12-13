export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export interface JwtPayload {
  sub: string;
  email: string;
  // Add other fields from your JWT token
}
