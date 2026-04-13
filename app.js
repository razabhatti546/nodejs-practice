const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/hello", (req, res, next) => {
  res.send(
    "<form action='/submit' method='post'><input type='text' name='name'><button type='submit'>Submit</button></form>",
  );
  next();
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  res.send("Form submitted");
});

app.use((req, res, next) => {
  console.log("Request received");
  next();
});

app.listen(3010);
