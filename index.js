const express = require("express");
var cors = require("cors");

const coustomerRoute = require("./routes/coustomer-route");
const itemRoute = require("./routes/item-route");
const loginRoute = require("./routes/login-route");
const registrationRoute = require("./routes/registration-route");
const protectedRoute = require("./routes/protected-route");

const app = express();
app.use(cors());
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded());

// parse application/json
app.use(express.json());

app.use("/api/v1/coustomer", coustomerRoute);
app.use("/api/v1/item", itemRoute);
app.use("/api/v1/login", loginRoute);
app.use("/api/v1/registration", registrationRoute);
app.use("/api/v1/protected", protectedRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
