const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 16;
const data = require("../data");
const userData = data.users;

router.post("/signup", async(req, res) => {
	try{
        const upload = req.body;
        if(typeof(upload.user_name) !=="string"){
            res.status(404).json({error:"Username or password not provided!"})
            return
        }
        if(typeof(upload.user_pass) !=="string"){
            res.status(404).json({error:"Username or password not provided!"})
            return
        }
		if(await userData.checkUsername(upload.user_name)){
			const hashpass = await bcrypt.hash(upload.user_pass,saltRounds);
			let result = await userData.addUser(upload.user_name, hashpass, [],[]);
            if(result)
                res.status(200).json(result);
            else
								res.status(500).json({error:"Server is busy, please try latter!!"});
        }
    }
	catch(e){
		res.status(500).json({error:"Server is busy, please try latter!!"});
	}
});

router.post("/login", async(req, res) => {
	try{
        const upload = req.body;
        if(typeof(upload.user_name) !== "string"){
            res.status(404).json({error:"Username or password not provided!"})
            return
        }
        if(typeof(upload.user_pass) !== "string"){
            res.status(404).json({error:"Username or password not provided!"})
            return
        }
		var result = await userData.getUserByName(upload.user_name);
		if(await bcrypt.compare(upload.user_pass, result.user_pass)){
			//req.session.user = {"user_id":userInfo._id};
			//console.log(req.session);
			res.json(result);
			//res.status(200).render("index",{"user": req.session.user});
		}
		else{
			res.status(404).json({error:"Wrong username or password!"})
		}
	}
	catch(e){
		res.status(500).json({error:"Server is busy, please try latter!!"});
	}
});

router.post("/addUser", async(req, res)=>{
    try{

    }
    catch(e){

    }
});
router.get("/profile/:id", async(req, res) => {
    try{
        const result = await userData.getUserById(req.params.id);
        if(result)
            res.status(200).json(result);
        else
				res.status(500).json({error:"Server is busy, please try latter!!"});
    }
    catch(e){
				res.status(404).json({ message: "User not found with this id" });
    }
});

router.get("/*", async(req, res) => {
  res.redirect("http://localhost:3001/eventit/");
});
module.exports = router;
