const Booking = {};
const axios = require("axios");
const Drivers = require("../Models/Drivers");
const Users = require("../Models/Users");
const Bookings = require("../Models/Bookings");

Booking.getTables = async (req, res) => {
  console.log("in next middleware", res.locals.user);

  try {
    Bookings.findAll({
      include: [
        {
          model: Drivers,
        },
        {
          model: Users,
        },
      ],
    }).then((bookings) => {
      const resObj = bookings.map((booking) => {
        //tidy up the booking data
        return Object.assign(
          {},
          {
            booking_id: booking.id,
            to: booking.to,
            from: booking.from,
            Drivers: booking.Drivers,
            users: booking.user,
            driver: booking.driver,
            createdAt: booking["created_at"],
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

Booking.createTable = async (req, res) => {
  try {
    const { body } = req;
    let booking = {
      to: body.to,
      from: body.from,
      user_id: body["user_id"],
      driver_id: body["driver_id"],
    };
    let table = await Bookings.create(booking);
    res.status(201).send({
      status: true,
      data: table,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      data: error.errors[0].message,
    });
  }
};

Booking.createUserBooking = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const to = req.query.to;
    const from = req.query.from;

    Drivers.findAll({
      where: {
        location: from,
      },
      raw: true,
    }).then((drivers) => {
      if (drivers.length > 0) {
        axios
          .get(
            `https://maps.googleapis.com/maps/api/distancematrix/json?units=metricl&origins=${from}&destinations=${to}&key=AIzaSyDlTuSPqtNiD60Blyxehc66DOxT_P_-juY`
          )
          .then(async (resp) => {
            try {
              let k = Math.floor(Math.random() * (drivers.length - 1));

              const driverId = drivers[k].id;

              let distance = Math.floor(
                resp.data.rows[0].elements[0].distance.value / 1000
              );
              let fare = "Rs. " + (2 * distance).toString();
              let destination = resp.data["destination_addresses"][0].split(
                ","
              )[0];
              let origin = resp.data["origin_addresses"][0].split(",")[0];
              const booking = {
                to: destination,
                from: origin,
                fare: fare,
                distance: distance,
                user_id: userId,
                driver_id: driverId,
              };

              let table = await Bookings.create(booking);

              res.status(201).send({
                status: true,
                data: table,
              });
            } catch (error) {
              res.status(400).send({
                error: error,
              });
            }
          })
          .catch((err) => {
            res.send({
              error: err,
            });
          });
      } else {
        res.send({
          error: "No cabs found! Booking Not Possible",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: false,
      data: error.errors[0].message,
    });
  }
};

Booking.getUserBookings = async (req, res) => {
  try {
    const offset = req.query.pageindex * req.query.pageSize;
    const limit = req.query.pageSize;
    let table = await Bookings.findAll({
      limit,
      offset,
      where: {
        userId: res.locals.user.id,
      },
      include: [
        {
          model: Drivers,
        },
      ],
    });

    res.status(200).send({
      data: table,
    });
  } catch (error) {
    res.status(400).send({
      error: error,
    });
  }
};

Booking.getNearestCabs = (req, res) => {
  try {
   
    const location = req.query.location;

    Drivers.findAll({
      where: {
        location: location,
      },
      raw: true,
    }).then((drivers) => {
      res.status(200).send({
        drivers
      })
    }).catch(error=>{
      res.status(400).send({
        error
      })
    })
  } catch (error) {
    res.status(400).send({
      error
    })
  }
};

Booking.deleteTable = async (req, res) => {
  try {
    const { params } = req;
    await Bookings.destroy({ where: { id: params.id } });
    return res.send("Deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = Booking;
