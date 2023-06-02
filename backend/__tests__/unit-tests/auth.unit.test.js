const request = require("supertest");

const app = require("../../app");
const VideoDto = require("../../dtos/video.dto");
const db = require("../../models");
const User = db.User;
const Video = db.Video;
const { userData, requestLogin, userDataWrong, bodyMissingField, requestRegister } = require("../mocks/auth.mock");
describe("POST /login", () => {
  beforeAll(async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(userData);
  });
  it("should return success login", async () => {
    const response = await request(app).post("/login").send(requestLogin);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(requestLogin.email);
    expect(response.body.accessToken).toBeDefined()
  });
  it("should return login fail, user not found", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(userDataWrong);
    const response = await request(app).post("/login").send(requestLogin);
    expect(response.statusCode).toBe(400);
  });
  it("should return login fail, missing field", async () => {
   
    const response = await request(app).post("/login").send(bodyMissingField);
    expect(response.statusCode).toBe(400);
  });
});

describe("POST /register", () => {

  it("should return register fail, missing field", async () => {
    const res = await request(app).post("/register").send(bodyMissingField);
    expect(res.statusCode).toBe(400);
  });

  it("should return register fail, duplicate email", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(userData);
    const res = await request(app).post("/register").send(requestRegister);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Duplicate email");
  });

  it("should return status 200", async () => {
    jest.spyOn(User, "findOne").mockResolvedValue(null);
    jest.spyOn(User, "create").mockResolvedValue(requestRegister);
    
    const res = await request(app).post("/register").send(requestRegister);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(requestRegister.email);
  });
});
