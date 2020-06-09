const request = require("supertest");
const app = require("../app");
const db = require("../database");
const Drivers = require("../Models/Drivers");


const driverDetail = {
    name:"rupfddfdes",
    numberPlate:"Dl5995C",
    location:"Delhi"
};

beforeEach(async () => {
  await Drivers.destroy({
    where: {},
  });


});

afterEach(async () => {
//   await db.close();
 
});
test("Should Add a driver", async () => {
  await request(app)
    .post("/driver")
    .send(driverDetail)
    .expect(201);
});


