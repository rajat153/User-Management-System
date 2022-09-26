const Userdb = require("../model/model");

//create and save new user  (create API)
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }
  //new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  //save user in the databse
  user
    .save(user)
    .then((data) => {
      // res.send(data)
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "some error occured  while creating operation",
      });
    });
};

// retrive and all users/retrive and return a single users
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "Error retriev in user id" + id });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({
            message:
              err.message || "Error occured while retrieveing user information",
          });
      });
  }
};
// update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can not be empty" });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot update user with ${id}.Maybe user not find`,
          });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error Update user information" });
    });
};

//delete a user by specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete user with ${id}.Maybe id is wrong` });
      } else {
        res.send({
          message: "User Deleted ",
        });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message: `Could not delete user with ID ${id}`,
        });
    });
};