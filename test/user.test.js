const request = require("supertest");
const app = require("../app");
const db = require("../database");
const User = require("../Models/Users");

const userTest = {
  name: "Test",
  email: "test2@test2.com",
  userName: "test1234",
  password: "test1234",
};

beforeEach(async () => {
  await User.destroy({
    where: {},
  });

  await User.create(userTest);
});

afterEach(async () => {
//   await db.close();
 
});
test("Should Sign up for a user", async () => {
  await request(app)
    .post("/user")
    .send({
      name: "Test",
      email: "test@test.com",
      userName: "test123",
      password: "test123",
    })
    .expect(201);
});

test("Should Sign In for a user", async () => {
  await request(app)
    .post("/user/find")
    .send({
      userName: userTest.userName,
      password: userTest.password,
    })
    .expect(200);
});
