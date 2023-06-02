const request = require("supertest");

const app = require("../../app");
describe("POST /login", () => {

  it("should return success login", async () => {
    const requestLogin = {
      email: 'example@example.com',
      password: '123123',
    };
    const response = await request(app).post("/login").send(requestLogin);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toBe(requestLogin.email);
    expect(response.body.accessToken).toBeDefined()
  });
  it("should return login fail, user not found", async () => {
    const requestLoginFail = {
      email: 'example1@example.com',
      password: '123123',
    }
    const response = await request(app).post("/login").send(requestLoginFail);
    expect(response.statusCode).toBe(400);
  });
  it("should return login fail, missing field", async () => {
    const bodyMissingField = {
      email: 'example1@example.com',
    }
    const response = await request(app).post("/login").send(bodyMissingField);
    expect(response.statusCode).toBe(400);
  });
});

describe("POST /register", () => {

  it("should return register fail, missing field", async () => {
    const bodyMissingField = {
      email: 'example1@example.com',
    }
    const res = await request(app).post("/register").send(bodyMissingField);
    expect(res.statusCode).toBe(400);
  });

  it("should return register fail, duplicate email", async () => {
    const requestRegisterCaseDuplicate = {
      email: 'example@example.com',
      password: '123123',
      firstName: 'John',
      lastName: 'Anna',
    };
    const res = await request(app).post("/register").send(requestRegisterCaseDuplicate);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("Duplicate email");
  });

  it("should return status 200", async () => {
    const requestRegister = {
      email: 'example2@example.com',
      password: '123123',
      firstName: 'John',
      lastName: 'Anna',
    };
    const res = await request(app).post("/register").send(requestRegister);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(requestRegister.email);
  });
});
