const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

//@route   POST  api/users
//@desc    Register a user
//@access  Public

router.post(
  "/",
  [
    //using express-validator for validating fields
    check("name", "Please add name").not().isEmpty(),
    check("email", "Please input a valid email address ").isEmail(),
    check(
      "password",
      "Please input a password with 6 to 10 characters"
    ).isLength({ min: 6, max: 10 }),
  ],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //destructuring from request object
    const { name, email, password } = req.body;

    try {
      //find if user exists with same email address
      let user = await User.findOne({ email });

      // if user exists
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      // destructuring the credentials and creating a json based on User model
      user = new User({ name, email, password });

      //encrypt the password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      //saving the json object in mongodb
      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
