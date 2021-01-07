const router = require("express").Router();
let User = require("../models/user.model");

/**
 * Express API for user profile management
 * @author Ruize Nie
 */
router.route("/:email").get((req, res) => {
  User.find({ email: req.params.email })
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/").post((req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const userType = "R";
  const newUser = new User({ username, email, password, userType });
  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:email").post((req, res) => {
  User.findOneAndUpdate(
    { email: req.params.email },
    {
      username: req.body.username,
      password: req.body.password,
    },
    { useFindAndModify: false }
  ).catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:email").delete((req, res) => {
  User.findOneAndDelete(
    { email: req.params.email },
    { useFindAndModify: false }
  )
    .then(() => res.json({ message: "User deleted successfully!" }))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
