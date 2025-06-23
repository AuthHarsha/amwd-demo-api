const express = require("express");

const coustomerRoute = require("./routes/coustomer-route");
const itemRoute = require("./routes/item-route");
const loginRoute = require("./routes/login-route");
const registrationRoute = require("./routes/registration-route");

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(express.urlencoded());

// parse application/json
app.use(express.json());

app.use("/app/v1/coustomer", coustomerRoute);
app.use("/api/v1/item", itemRoute);
app.use("/api/v1/login", loginRoute);
app.use("/api/v1/registration", registrationRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
