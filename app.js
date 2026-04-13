const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("Request received");
  next();
});

app.listen(3010);
