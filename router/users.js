let jwt = require("jsonwebtoken");

const User = {};
const Users = require("../Models/Users");
const Bookings = require("../Models/Bookings");
const Drivers = require("../Models/Drivers");

User.getTables = async (req, res) => {
  try {
    // Slect * from table;
    // select name from table;
    // let tables = await
    Users.findAll({
      include: [
        {
          model: Bookings,
        },
      ],
    }).then((users) => {
      const resObj = users.map((user) => {
        console.log("suer" , user)
        return Object.assign(
          {},
          {
            user_id: user.id,
            userName: user.userName,
            email: user.email,
            name: user.name,
            bookings: user.bookings,
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

User.findTable = async (req, res) => {
  try {
    const { body } = req;
    let table = await Users.findOne({
      where: { userName: body.userName, password: body.password },
    });
    if (table) {
      jwt.sign({ table }, "somethingSecret", (err, token) => {
        if (err) {
          console.log(err);
          res.send({
            error: err,
          });
        } else {
          res.status(200).send({
            status: true,
            data: table,
            token: token,
          });

          console.log(token);
        }
      });
    } else {
      res.send({
        status: false,
      });
    }
  } catch (error) {
    return res.send({
      error: error,
    });
  }
};

User.verifyTable = async (req, res) => {
  try {
    const token = req.headers.token;
    jwt.verify(token, "somethingSecret", (err, decoded) => {
      if (err) {
        res.send({
          error: err,
        });
      } else {
        let { userName } = decoded.table;
        Users.findOne({
          where: { userName: userName },
          include: [
            {
              model: Bookings,
              include: [
                {
                  model: Drivers,
                },
              ],
            },
          ],
        }).then((resp) => {
          res.send({
            data: resp,
          });
        });
      }
    });
  } catch (error) {}
};

User.createTable = async (req, res) => {
  try {
    const { body } = req;
    let user = {
      id:body.id,
      name: body.name,
      userName: body.userName,
      email: body.email,
      password: body.password,
    };
    let table = await Users.create(user);
    if (table) {
      jwt.sign({ table }, "somethingSecret", (err, token) => {
        if (err) {
          res.send({
            status: "error",
            error: err,
          });
        } else {
          res.status(201).send({
            status: true,
            data: table,
            token: token,
          });
          console.log("token", token);
        }
      });
    } else {
      res.status(400).send({
        status: false,
      });
    }
  } catch (error) {
    res.send({
      status: false,
      data: error,
    });
  }
};

User.updateTable = async (req, res) => {
  try {
    const { body, params } = req;

    let table = await Users.update(
      { avatar: body.avatar, name: body.name, email: body.email },
      { where: { id: params.id } }
    );
    return res.send(table);
  } catch (error) {
    console.log(error);
  }
};

User.deleteTable = async (req, res) => {
  try {
    const { params } = req;
    await Users.destroy({ where: { id: params.id } });
    return res.send("Deleted successfully");
  } catch (error) {
    console.log(error);
  }
};

module.exports = User;
