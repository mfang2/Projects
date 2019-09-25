const userRoutes = require("./users_firebase");
const eventRoutes = require("./events_r");
var cors = require('cors')
const awsRoutes = require('./aws/controller')
const constructorMethod = app => {
  app.use("/eventit/user", userRoutes);
  app.use("/eventit/event", eventRoutes);
  app.use("/sign_s3", awsRoutes);
  app.use("*", cors(), (req, res) => {
    res.redirect("http://localhost:3001/eventit");
  });
};
module.exports = constructorMethod;  
