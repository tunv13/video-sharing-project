const request = require("supertest");

const app = require("../../app");
const VideoDto = require("../../dtos/video.dto");
const db = require("../../models");
const User = db.User;
const Video = db.Video;
const { videoList, bodyRequestVideo } = require("../mocks/video.mock");
describe("GET /video", () => {
  it("should return paginate video", async () => {
    jest.spyOn(VideoDto, "findAndCountAll").mockResolvedValue(videoList);

    const res = await request(app).get("/video");
    expect(res.statusCode).toBe(200);

    expect(res.body.totalItems).toBeGreaterThanOrEqual(0);
  });
});
describe("POST /video", () => {
  let token;
  beforeAll(async () => {
    jest.spyOn(User, "findOne").mockResolvedValue({
      id: 2,
      email: "abc@gmail.com",
      password: "$2b$10$a4Uj1Eu7eaTu77iis7k/j.dDAasR1Pbhxhr5VijCgMpNV8LqXxJ86",
    });
    const response = await request(app).post("/login").send({
      email: "tu@gmail.com",
      password: "123123",
    });
    token = response.body.accessToken;
  });
  it("Without token should return status 401", async () => {
    const res = await request(app).post("/video");
    expect(res.statusCode).toBe(401);
  });

  it("With token should return status 200", async () => {
    jest.spyOn(Video, "create").mockResolvedValue(bodyRequestVideo);
    const res = await request(app)
      .post("/video")
      .send(bodyRequestVideo)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe(bodyRequestVideo.title);
  });
});
