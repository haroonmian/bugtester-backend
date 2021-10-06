const models = require("../models");

const Fetch = async (req, res) => {
    models.Bug.findAll()
    .then((response) => {
        res.status(200).json({
            message: "SUCCESS: Bug Fetched",
            response: response
        })
    })
    .catch(() => {
        res.status(500).json({
            message: "ERROR: Unable To Create Bug",
            error: err
        })
    })
}

const Create = async (req, res) => {
    const data = req.body;

    data.createdAt = new Date();

    models.Bug.create(data)
    .then((response) => {
        res.status(200).json({
            message: "SUCCESS: Bug Created",
            response: response
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "ERROR: Unable To Create Bug",
            error: err
        })
    })
};

const Update = async (req, res) => {
    const data = req.body;

    models.Bug.update(data, {
        where: {
            id: data.id
        }
    })
    .then((response) => {
        res.status(200).json({
            message: "SUCCESS: Bug Created",
            response: response
        })
    })
    .catch((err) => {
        res.status(500).json({
            message: "ERROR: Unable To Create Bug",
            error: err
        })
    })
};

module.exports = {
    Fetch,
    Create,
    Update
}