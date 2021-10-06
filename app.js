const express = require("express");
const auth = require("./routes/auth");
const bug = require("./routes/bug");
const users = require("./routes/users");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(cors())
app.use(bodyParser.json({ limit: "25mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "25mb" }));

app.use("/auth", auth);
app.use("/bug", bug);
app.use("/users", users)


const port = process.env.PORT || 3000

app.listen(port, () => console.log("PORT listening at =>", port));