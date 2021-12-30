const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../models/User");

//@route   GET  api/auth
//@desc    Get logged in user
//@access  Private

router.get(
  "/",
  auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    }catch(err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//@route   POST  api/auth
//@desc    Auth user & get token
//@access  Public

router.post("/", [
    check("email", "Please enter your email address").isEmail(),
    check("password", "Please enter your password").exists(), 
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try {
      // find the user with the given email
      let user = await User.findOne({ email });

      // if user doesn't exist
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }

      //if user exists
      // compare password entered with existing password of user with same email
      const isMatch = await bcrypt.compare(password, user.password);

      //if doesn't match
      if(!isMatch){
          return res.status(400).json({ msg: "Invalid Credentials"});
      }

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
});

module.exports = router;
