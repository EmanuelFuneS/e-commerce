import Fastify from "fastify";

describe("GET /", () => {
  it("returns status ok", async () => {
    const app = Fastify();

    app.get("/", async () => {
      return { status: "ok" };
    });

    const response = await app.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: "ok" });
  });
});
