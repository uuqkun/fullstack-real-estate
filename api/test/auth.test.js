import { web } from "../app/web.js";
import supertest from "supertest";
import { createUser, deleteUsers } from "./test-util.js";

describe("Authentication", () => {
  
  beforeEach(() => {
    deleteUsers();
  });
  
  afterEach(() => {
    deleteUsers();
  });

  it("should create a new user", async () => {
    const result = await supertest(web).post("/api/auth/register").send({
      username: "test",
      email: "test@gmail.com",
      password: "pass",
    });

    expect(result.status).toBe(201);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.password).toBeUndefined();
  });

  it("should not create a new user if user already exist", async () => {
    const result = await supertest(web).post("/api/auth/register").send({
      username: "test2",
      email: "test2@gmail.com",
      password: "test2",
    });
    
    expect(result.status).toBe(409);
    expect(result.body.errors).toBe("Cannot use respective username or email, user already exist");
  });
});
