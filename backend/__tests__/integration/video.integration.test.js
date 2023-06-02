const request = require("supertest");

const app = require("../../app");

describe("GET /video", () => {
  it("should return paginate video", async () => {
    const res = await request(app).get("/video");
    expect(res.statusCode).toBe(200);

    expect(res.body.totalItems).toBeGreaterThanOrEqual(0);
  });
});
describe("POST /video", () => {
  let token;
  beforeAll(async () => {
    const response = await request(app).post("/login").send({
      email: "example@example.com",
      password: "123123",
    });
    token = response.body.accessToken;
  });
  it("Without token should return status 401", async () => {
    const res = await request(app).post("/video");
    expect(res.statusCode).toBe(401);
  });

  it("With token should return status 200", async () => {
    const bodyRequestCreateVideo = {
      title: "Title",
      description: "Description",
      videoKey: "f2mDGk8d3ts",
    };
    const res = await request(app)
      .post("/video")
      .send(bodyRequestCreateVideo)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(bodyRequestCreateVideo.title);
  });
});
