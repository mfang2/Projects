const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;
var Users = {};

router.get("/signup", (req, res) => {
  console.log("get signup ");
  res.render('signup');
});

router.post('/signup', async (req, res) => {
  console.log("post signup");
  console.log(req.body);

  Users = await userData.getAllUsers();
  console.log(Users); 

  if (!req.body.id || !req.body.password) {
    res.status("400");
    res.send("Invalid details");
  } else {
    let me = userData.getUserByUserName(req.body.id);
    if (me) {//if already in DB, THIS TEST IS INCORRECT
      res.render('signup', {
         message: "User Already Exists! Login or choose another user id"});
    }
/*
    Users.filter(function(user) {
      if (user.id === req.body.id) {
        res.render('signup', {
          message: "User Already Exists! Login or choose another user id"});
      }
    });
*/
    // need to add the new user in the DB
    let x = await userData.addUser(req.body.id, req.body.password, "email@google.com"); 
    var newUser = {id: req.body.id, password: req.body.password};
//    Users.push(newUser);
//    req.session.user = newUser;
    console.log(req.session);
    res.redirect('protected_page');
  }
});


/*
router.get("/:id", async (req, res) => {
  console.log("get /:id method for http://localhost:3000/recipes/" + req.params.id);
  console.log("id = " + req.params.id);
  try {
    const recipe = await recipeData.getRecipeById(req.params.id);
    console.log(recipe);
    res.json(recipe);
  } catch (e) {
    res.status(404).json({ message: "Recipe not found" });
  }
});

router.get("/", async (req, res) => {
  console.log("get / method for http://localhost:3000/recipes");
  try {
    const recipeList = await recipeData.getAllRecipes();
    console.log(recipeList);
    res.json(recipeList);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete("/:id", async (req, res) => {
  console.log("delete /:id method for http://localhost:3000/recipes/" + req.params.id + " -X DELETE");
  console.log("id = " + req.params.id);
  recipeData.removeRecipe(req.params.id)
    .then(() => {
      res.sendStatus(200);
    }, () => {
      res.sendStatus(500);
    });
});

router.post("/", async (req, res) => {
  console.log("post / method for curl http://localhost:3000/recipes"
    + " -X POST -d @test.json -H Content-Type: application/json");
  try {
    let inputRecipe = req.body;
    const {title, ingredients, steps} = inputRecipe;
    console.log(title);
    console.log(ingredients);
    console.log(steps);
    const newRecipe = await recipeData.addRecipe(title, ingredients, steps);
    res.json(newRecipe);
  } catch (e) {
    res.status(500).json({error: e});
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Recipe not found" });
  }

  try {
    const updatedRecipe = await recipeData.updateRecipe(req.params.id, updatedData);
    res.json(updatedRecipe);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

*/








module.exports = router;

