import supertest from "supertest";
import { web } from "../app/web.js";

describe("User CRUD", () => {
  test("should GET users", async () => {
    const result = await supertest(web).get("/api/users");

    expect(result.status).toBe(200);
    expect(result.body).toBeInstanceOf(Array);
  });

  test("should update user", async () => {
    const result = await supertest(web)
      .post("/api/users/661a49a2f3585eba3a1c5061")
      .send({
        username: "update",
      });

    console.info(result.headers);
    console.info(result.error);
    // expect(result.status).toBe(200)
    // expect(result.body).toBeInstanceOf(Array);
  });
});
