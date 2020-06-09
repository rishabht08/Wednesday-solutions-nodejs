const Driver = {};
const Drivers = require("../Models/Drivers");
const Bookings = require("../Models/Bookings");

Driver.getTables = async (req, res) => {
  try {
    Drivers.findAll().then((drivers) => {
      const resObj = drivers.map((driver) => {
        //tidy up the driver data
        return Object.assign(
          {},
          {
            driver_id: driver.id,
            name: driver.name,
            numberPlate: driver.numberPlate,
            location: driver.location,
          }
        );
      });
      res.json(resObj);
    });

    // res.send(tables);
  } catch (error) {
    console.log(error);
  }
};

Driver.createTable = async (req, res) => {
  try {
    const { body } = req;
    let driver = {
      name: body.name,
      numberPlate: body.numberPlate,
      location: body.location,
    };
    let table = await Drivers.create(driver);
    res.status(201).send(table);
  } catch (error) {
    res.send({
      error: error,
    });
  }
};

module.exports = Driver;
