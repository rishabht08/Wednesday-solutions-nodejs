const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database");
const router = require("./router");
const envVar = require("./config/envVar")
envVar();
const PORT = process.env.PORT || 6060;
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./swagger.json")

const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5,
  message:
    "Too many activity from this IP, please try again after 5 minutes",
});

// const swaggerOptions = {
//   swaggerDefinition :{
//     info: {
//       title: "Cab Booking Api",
//       description: "Get cab and users details",
//       contact:{
//           name:"Rishab-Dev"
//       },
//       servers:["http://localhost:6060"]
//     }
//   },
//   apis : ["./router.js"]
// }


// const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve , swaggerUi.setup(swaggerDocument));


app.use("/",apiLimiter);

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use("/", router);

app.listen(PORT, () => {
  db.authenticate().then(() => {
    console.log("DB connection is established on port ", PORT);
  });
});

module.exports = app;
