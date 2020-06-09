const request = require("supertest");
const app = require("../app");
const db = require("../database");
const User = require("../Models/Users");
const Bookings = require("../Models/Bookings");
const Drivers = require("../Models/Drivers");

const driverDetail = {
  name: "Someone Cool",
  numberPlate: "Dl5995C",
  location: "pune",
};

const userTest = {
  name: "Test",
  email: "test2@test2.com",
  userName: "test1234",
  password: "test1234",
};

let TOKEN_KEY = "";
const pageIndex = 0;
const pageSize = 10;

beforeEach(async () => {
  await Bookings.destroy({
    where: {},
  });

  await Drivers.destroy({
    where: {},
  });
  await Drivers.create(driverDetail);
  await User.create(userTest);
});

afterEach(async () => {
    // await db.close();
});

test("Get Token Key", async () => {
    
  await request(app)
    .post("/user/find")
    .send({
      userName: userTest.userName,
      password: userTest.password,
    })
    .then((resp) => {
      userTest.userName = "test12345";
      userTest.email = "test5555@test.com";
      TOKEN_KEY = resp.body.token;
    });
});

test("Should book nearest cab for userTest", async () => {
  await request(app)
    .post(`/booking/book/cab?from=pune&to=mumbai`)
    .set("token", TOKEN_KEY)
    .expect(201).then(()=>{

        userTest.userName = "test123456";
        userTest.email = "test55556@test.com";

    })
});

test("Should get the  bookings of userTest", async () => {
  await request(app)
    .get(`/user/bookings?pageindex=${pageIndex}&pageSize=${pageSize}`)
    .set("token", TOKEN_KEY)
    .expect(200).then(async ()=>{
        await  User.destroy({
            where:{}
        })
    })
});
