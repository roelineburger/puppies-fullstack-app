import request from "supertest";
import app from "./app";
import puppies from "./data/puppies.json";

describe("Testing api endpoint", () => {
  test("sanity check for /test", async () => {
    const res = await request(app).get("/api/test");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      test: "is working as it should be intial one",
    });
  });
});

describe("Testing puppies api", () => {
  test("get puppies", async () => {
    const res = await request(app).get("/api/puppies");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(puppies);
  });

  test("get a specific puppy", async () => {
    const res = await request(app).get("/api/puppies/1");
    expect(res.statusCode).toEqual(200);
    expect(res.body.breed).toEqual("breed1");
  });

  test("get status 404 when puppy not found", async () => {
    const res = await request(app).get("/api/puppies/7");
    expect(res.statusCode).toEqual(404);
  });

  test("POST route - send new puppy", async () => {
    const puppy = {
      id: "5",
      name: "puppy5",
      breed: "breed5",
      birthDate: "05-01-2021",
    };
    const res = await request(app).post("/api/puppies").send(puppy);
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toEqual("puppy5");
    const res1 = await request(app).get("/api/puppies");
    expect(res1.body.length).toEqual(5);
  });

  test("PUT route - update a puppy", async () => {
    const puppy = {
      id: "10",
      name: "puppy10",
      breed: "breed10",
      birthDate: "10-01-2021",
    };
    const res = await request(app).put("/api/puppies/1").send(puppy);
    expect(res.statusCode).toEqual(204);
  });

  test("DELETE route - delete a puppy", async () => {
    const res = await request(app).delete("/api/puppies/2");
    expect(res.statusCode).toEqual(204);
  });
});
