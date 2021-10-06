require("dotenv").config();
const models = require("../models");

const Fetch = async (req, res) => {
    models.User.findAll()
    .then((response) => {
        res.status(200).json({
          message: "SUCCESS: Users Fetched.",
          response: response,
        });
    })
    .catch((err) => {
        res.status(500).json({
            message: "Error: Error while fetching Users.",
            error: err,
          });
    })
};

module.exports = {
    Fetch
};
