require("dotenv").config();
const models = require("../models");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../config/jwt");
const bcrypt = require("bcrypt");

const Login = async (req, res) => {
    console.log("This is running")
  //first check if user exists.
  try {
    const { username, password } = req.body;

    // bcrypt.hash(password, Number(process.env.PASSWORD_SALTROUNDS))
    // .then(async (hash) => {
    //     await models.User.create({
    //         username: username,
    //         password: hash,
    //         role: "support",
    //         createdAt: new Date(),
    //         updatedAt: new Date()
    //     })
    //     .then(() => {
    //         res.status(200).json({
    //             message: "User created!"
    //         })
    //     })
    // })
    // .catch((error) => {
    //     res.status(500)
    //     .json({ message: "ERROR: Login Failed.", error: error.toString() });
    // })

    if (typeof username !== "string") {
      throw "Invalid username Format.";
    }

    const foundUser = await models.User.findOne({
      where: { username: username },
    });

    if (!foundUser) {
      throw "No User Record Found.";
    } else {
      const success = await bcrypt.compare(password, foundUser.password);
      if (success) {
        let jwtToken = jwt.sign(
          {
            username: foundUser.username,
            password: foundUser.password,
          },
          jwtConfig.secret,
          {
            expiresIn: jwtConfig.expiresIn,
            notBefore: jwtConfig.notBefore,
            algorithm: jwtConfig.algorithm,
          }
        );

        foundUser.password = null;

        res.status(200).json({
          message: "SUCCESS: User Logged In.",
          user: foundUser,
          token: jwtToken,
        });
      }
        res.status(401).json({
            message: "AUTH: Incorrect Password",
        })
    }
  } catch (ex) {
    res
      .status(500)
      .json({ message: "ERROR: Login Failed.", error: ex.toString() });
  }
};

const ValidateToken = (req, res, next) => {
  try {
    let tokenValue = req.headers["auth-token"];

    if (tokenValue) {
      jwt.verify(tokenValue, jwtConfig.secret, (error, data) => {
        if (error) {
          return res
            .status(401)
            .json({ message: "ERROR: Invalid Auth Token." });
        } else {
          req.tokenData = data;
          next();
        }
      });
    } else {
      return res
        .status(401)
        .json({ message: "ERROR: 'auth-token' missing from request header." });
    }
  } catch (ex) {
    return res.status(401).json({
      message: "ERROR: Cannot Validate auth-token",
      error: ex.toString(),
    });
  }
};

module.exports = {
  Login,
  ValidateToken,
};
