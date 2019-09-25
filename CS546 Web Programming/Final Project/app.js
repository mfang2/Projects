const express = require("express");
const bodyParser = require("body-parser");
let app = express();
let configRoutes = require("./routes");

// set engine and views
app.set('view engine', 'pug');
app.set('views', './views');

// load bodyParser to read data from form data 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));




app.use(bodyParser.json());  //take json input for post etc
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
