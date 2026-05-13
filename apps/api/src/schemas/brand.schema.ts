export const brandParamsSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
};

export const brandCreateBodySchema = {
  body: {
    type: "object",
    required: ["name", "logo", "website"],
    properties: {
      name: { type: "string", minLength: 1 },
      logo: { type: "string" },
      website: { type: "string" },
    },
  },
};
