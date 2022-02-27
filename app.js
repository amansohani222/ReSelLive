var express = require("express"),
  app = express(),
  mongoose = require("mongoose");

var productRoute = require("./routes/products.js"),
  authRoute = require("./routes/auth.js");

app.use(express.json());
// app.use(express.static(__dirname+"/public"));

mongoose.connect(
  "mongodb+srv://teammember501:aman13@cluster0.frgug.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);

app.use(productRoute);
app.use(authRoute);

app.listen(process.env.PORT || 3000, function () {
  console.log("Server Started");
});
