const express = require("express");
const router = express.Router();

//Authentication Middleware
const auth = require("./middleware/auth");

//Importing Routes
const User = require("./router/users");
const Booking = require("./router/bookings");
const Driver = require("./router/drivers");

//Importing Tables
const Users = require("./Models/Users");
const Bookings = require("./Models/Bookings");
const Drivers = require("./Models/Drivers");

//Joining Tables
Bookings.belongsTo(Users);
Users.hasMany(Bookings);
Bookings.belongsTo(Drivers, { constraints: false });

//Users Routes
router.get("/user", User.getTables);
router.post("/user", User.createTable);
router.post("/user/find", User.findTable);
router.put("/user/:id", User.updateTable);
router.delete("/user/:id", User.deleteTable);
router.post("/user/verify", User.verifyTable);

//Bookings Routes
router.post("/booking", auth, Booking.createTable);
router.get("/booking", auth, Booking.getTables);
router.get("/booking/nearest-cabs" , auth , Booking.getNearestCabs)
router.post("/booking/book/cab", auth, Booking.createUserBooking);
router.get("/user/bookings", auth, Booking.getUserBookings);
router.delete("/booking/:id", auth, Booking.deleteTable);

// Drivers Routes
router.post("/driver", Driver.createTable);
router.get("/driver", Driver.getTables);



module.exports = router;
