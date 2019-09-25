const controlRoutes = require("./controls");

const constructorMethod = (app) => {
  app.use("/", controlRoutes);

  app.use("*", (req, res) => {
    console.log("We are in test1 routes index with *");
    res.sendStatus(404);
  });

};

module.exports = constructorMethod;  
