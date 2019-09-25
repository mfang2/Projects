const express = require("express");
const router = express.Router();
const data = require("../data");
var cors = require('cors');
var im = require('imagemagick');
var nodemailer = require('nodemailer');
const eventData = data.events;
const userData = data.usersFirebase;
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../public/images/events/');
  },
  filename: function (req, file, callback) {
    callback(null, (new Date().toISOString().replace(/:/g, '_') + file.originalname));
  },
});
const fileFilter = (req, file, callback) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/bmp' || file.mimetype == 'image/jpg')
    callback(null, true);
  else
    callback(null, false);
};
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 6
  },
  fileFilter: fileFilter
});



router.post("/addevent", cors(), async (req, res) => {
  try {
    const upload = req.body;
    let result = await eventData.addEvent(upload.event_name, upload.event_type, upload.event_description, upload.event_location, upload.event_date, upload.event_begin, upload.event_end, upload.event_owner, upload.event_ownerContact, upload.event_ownerPhone, upload.event_ownerContact, [], upload.event_count, upload.event_keyword);

    if (!result)
      res.status(500).json({ error: "Server is busy, please wait!" })

    let result2 = await userData.ownEventById(upload.event_owner, result.event_id)
    res.status(200).json(result);
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});
router.patch("/addImageToEvent/:id", cors(), async (req, res) => {
  try {
    // let srcText = req.files.imgFile.path;
    // let dstText = process.cwd() + "/result.jpg"
    // await im.resize({
    //   srcPath: srcText,
    //   dstPath: dstText,
    //   width: 1920,
    //   height: 1080
    // },
    //   function (err, stdout) {
    //     if (err) throw err;
    //   }
    // );
    // let bitMap = fs.readFileSync(process.cwd() + '/result.jpg');
    // // Convert to base64 for mongo storage
    // let img64 = new Buffer.from(bitMap).toString('base64');
    // try {
    //   let result = await images.addImg(img64);
    //   res.send({ imgId: result });
    // } catch (e) {
    //   res.status(404).json({ error: e });
    // }
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});
router.get("/getevent/:id", cors(), async (req, res) => {
  try {
    const result = await eventData.getEventById(req.params.id);
    if (result)
      res.status(200).json(result);
    else
      res.status(500).json({ error: "Server is busy, please wait!" })
  }
  catch (e) {
    res.status(404).json({ message: "Event not found with this Id!" });
  }
});
router.get("/geteventjoiners/:id", cors(), async (req, res) => {
  try {
    const result = await eventData.getEventJoiners(req.params.id);
    if (result) {
      var joiners = [];

      for (var i = 0; i < result.length; i++) {
        var joiner = await userData.getUserById(result[i]);
        joiners.push(joiner);
      }
      res.status(200).json(joiners);
    }
    else
      res.status(500).json({ error: "Server is busy, please wait!" })
  }
  catch (e) {
    res.status(404).json({ message: "Event not found with this Id!" });
  }
});
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
router.get("/getAllEvents/:address", cors(), async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.address), 'gi');
    var results = await eventData.getEventsByLocation(regex, req.params.address);
    res.status(200).json(results);
  }
  catch (e) {
    res.status(404).json({ message: "Event not found with this Location!" });
  }
});

router.get("/getAllEventsByTag/:keyword", cors(), async (req, res) => {
  try {
    const regex = new RegExp(escapeRegex(req.params.keyword), 'gi');
    var results = await eventData.getEventsByTag(regex, req.params.keyword);
    res.status(200).json(results);
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});

router.get("/getAllEvents", cors(), async (req, res) => {
  try {
    const results = await eventData.getAllEvents();
    res.status(200).json(results);
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});

router.put("/updateEventUrl/:id", cors(), async (req, res) => {
  try {
    const upload = req.body;
    console.log(req.body);
    const oldOne = await eventData.getEventById(req.params.id);
    const updated = {};


    updated.url = upload.url;

    // let temp =[];
    // for(let i = 0; i < oldOne.event_keyword.length; i++){
    //   temp[i] = oldOne.event_keyword[]
    // }
    const updatedResult = await eventData.updateEventById(req.params.id, updated);
    res.status(200).json(updatedResult);
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});
router.put("/updateEvent/:id", cors(), async (req, res) => {
  try {
    const upload = req.body;

    const oldOne = await eventData.getEventById(req.params.id);
    const updated = {};

    updated.event_name = upload.event_name;
    updated.event_title = upload.event_title;
    updated.event_description = upload.event_description;
    updated.event_type = upload.event_type;
    updated.event_begin = upload.event_begin;
    updated.event_end = upload.event_end;
    updated.event_date = upload.event_date;
    updated.event_count = upload.event_count;
    updated.event_owner = upload.event_owner;
    updated.event_ownerName = oldOne.event_ownerName;
    updated.event_ownerPhone = oldOne.event_ownerPhone;
    updated.event_ownerContact = oldOne.event_ownerContact;
    updated.event_joiners = oldOne.event_joiners;
    updated.event_keyword = upload.event_keyword;
    updated.event_count = upload.event_count;
    updated.event_location = oldOne.event_location;

    // let temp =[];
    // for(let i = 0; i < oldOne.event_keyword.length; i++){
    //   temp[i] = oldOne.event_keyword[]
    // }
    const updatedResult = await eventData.updateEventById(req.params.id, updated);
    res.status(200).json(updatedResult);
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});

router.post("/joinEvent", cors(), async (req, res) => {
  try {

    const upload = req.body;
    var info = await eventData.getEventById(upload.event_id);
    if (info.event_owner == upload.user_id) {
      res.status(400).json({ error: "You're the owner!" });
      return
    }
    for (let i = 0; i < info.event_joiners.length; i++) {
      if (info.event_joiners[i] == upload.user_id) {
        res.status(400).json({ error: "You've already joined!" });
        return
      }
    }
    let result2 = await userData.joinEventById(upload.user_id, upload.event_id);

    info.event_joiners.push(upload.user_id);
    let result = await eventData.updateEventById(upload.event_id, info);

    let reciever = await userData.getUserById(info.event_owner);
    let joiner = await userData.getUserById(upload.user_id);
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'saveit.team@gmail.com',
        pass: 'save1234'
      }
    });
    var mailOptions = {
      from: 'saveit.team@gmail.com',
      to: reciever.user_email,
      subject: joiner.name + ' has joined ' + result.event_name,
      text: `Hi ${reciever.name},\n One More Attendee! \n ${joiner.name}  is attending your event ${result.event_name}.\n\n ${joiner.name}'s email: ${joiner.user_email}\n\n ${joiner.name}'s phone: ${joiner.phone}\n\nRegards,\nTeam Event IT`
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    res.status(200).json(result);
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});

router.post("/cancelEvent", cors(), async (req, res) => {
  try {
    const upload = req.body;
    var info = await eventData.getEventById(upload.event_id);
    let result2 = await userData.cancelEventById(upload.user_id, upload.event_id);

    for (let i = 0; i < info.event_joiners.length; i++) {
      if (info.event_joiners[i] == upload.user_id)
        var index = i;
    }
    info.event_joiners.splice(index, 1);
    console.log(info);
    let result = await eventData.updateEventById(upload.event_id, info);
    res.status(200).json(result);
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});

router.get("/getOwnedEvents/:user_id", cors(), async (req, res) => {
  try {
    var user = await userData.getEventsById(req.params.user_id);
    var results = [];
    console.log(user.owned.length)
    if (user.owned.length == 0) {
      res.status(200).json(results);
      return;
    }
    for (let i = 0; i < user.owned.length; i++) {
      let result = {};
      result.event_id = user.owned[i];

      let eventInfo = await eventData.getEventById(user.owned[i]);
      result.event_name = eventInfo.event_name;
      result.event_location = eventInfo.event_location;
      result.event_count = eventInfo.event_count;
      result.event_begin = eventInfo.event_begin;
      result.event_end = eventInfo.event_end;
      result.event_joiner_length = eventInfo.event_joiners.length;
      results.push(result);
      console.log(result);
    }
    res.status(200).json(results);
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});

router.get("/getJoinedEvents/:user_id", cors(), async (req, res) => {
  try {
    var user = await userData.getEventsById(req.params.user_id);
    var results = [];
    console.log(user.joined.length)
    if (user.joined.length == 0) {
      res.status(200).json(results);
      return;
    }
    for (let i = 0; i < user.joined.length; i++) {
      let result = {};
      result.event_id = user.owned[i];

      let eventInfo = await eventData.getEventById(user.joined[i]);
      result.event_name = eventInfo.event_name;
      result.event_location = eventInfo.event_location;
      result.event_count = eventInfo.event_count;
      result.event_begin = eventInfo.event_begin;
      result.event_end = eventInfo.event_end;
      result.event_joiner_length = eventInfo.event_joiners.length;
      results.push(result);
      console.log(result);
    }
    res.status(200).json(results);
  }
  catch (e) {
    res.status(500).json({ error: "Server is busy, please try latter!!" });
  }
});

router.get("/*", async (req, res) => {
  res.redirect("http://localhost:3001/eventit/");
});
module.exports = router;
