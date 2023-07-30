//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const cookieParser = require('cookie-parser');
const Cookies = require('js-cookie');
//const encrypt = require("mongoose-encryption");
//const md5 = require("md5");
// const bcrypt = require("bcrypt");
const path = require('path');
//const popup = require('popups');

// const saltRounds = 10;

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
//const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require('mongoose-findorcreate');
const { compareSync } = require('bcrypt');
let alert = require('alert'); 
// const vonage = require('@vonage/server-sdk');
const { Vonage } = require('@vonage/server-sdk');
const nodemailer = require('nodemailer');

const app = express();

app.use(cookieParser());

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
//app.use(express.static("public"));

app.use(express.static(path.join(__dirname, 'public')));

// Your other routes and middleware should be added here





app.use(session({
  secret: "Our little secret.",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//window.username = "";

//const mongoURL = 'mongodb://0.0.0.0:27017/calUser2DB';
const mongoURL = process.env.MONGO_URL;
 
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function() {
    console.log('Connected to MongoDB');

  }).catch(function(error) {
    console.error('Error connecting to MongoDB:', error);
  });

  //mongoose.set("useCreateIndex", true);

  const userSchema = new mongoose.Schema({
    //email: String,
    username: String,
    password: String,
    googleId: String,
    facebookId: String,
    //secret: String
    events: [{
      //date: Date,
      date: String,
      title: String,
      content: String
    }]
    
  });

  userSchema.plugin(passportLocalMongoose);
  userSchema.plugin(findOrCreate);

  const User = mongoose.model("User", userSchema);  


  passport.use(User.createStrategy());

  // //below serializing works only for local authentication
  // passport.serializeUser(User.serializeUser());
  // passport.deserializeUser(User.deserializeUser());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    })
  });

  var GoogleStrategy = require('passport-google-oauth20').Strategy;
  var FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/calendar",
    //userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
    //calendar-2-hasan1207.onrender.com
    //https://localhost:3000/auth/google/calendar
    // scope: ['profile', 'email'],
  },
  function(accessToken, refreshToken, profile, cb) {
    //console.log(profile.emails);
    console.log(profile);
    User.findOrCreate({ googleId: profile.id, username: profile.emails[0].value }, function (err, user) {
      return cb(err, user);
    });
  }
));

// Facebook authentication
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/auth/facebook/calendar"
  //http://localhost:3000/auth/facebook/calendar
},
function(accessToken, refreshToken, profile, cb) {
  console.log(profile);
  User.findOrCreate({ facebookId: profile.id }, function (err, user) {
    return cb(err, user);
  });
}
));






  // app.get("/calendar", (req, res) => {
  //   if (req.isAuthenticated()) {
  //     //res.render("calendar");
  //     res.sendFile(__dirname + "/calendar.html");
  //   } else {
  //     res.redirect("/login");
  //   }

  //   // User.find({"secret": {$ne: null}}).then(foundUsers => {
  //   //   if(foundUsers){
  //   //     res.render("calendar", {usersWithSecrets: foundUsers});
  //   //   }
  //   // }).catch(err => {
  //   //   console.log(err);
  //   // })
  // });

  // Route for serving the calendar.html page
  app.get('/calendar', (req, res) => {
    //res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
      if (req.isAuthenticated()) {
      //res.render("calendar");
        //res.sendFile(__dirname + "/calendar.html");
        res.sendFile(path.join(__dirname, 'public', 'calendar.html'));
      } 
      else {
          res.redirect("/login");
      }

      //res.cookie('lastPostDate', null);
      //Cookies.remove('lastPostDate');

  });


  app.post("/calendar", (req, res) => {

    // console.log("Button name : " + req.body.button);
    // res.redirect("/calendar");

    console.log("Data from post req to calendar");
    console.log(typeof(req.body.eventTitle));
    console.log(typeof(req.body.eventDescription));

    if( (req.body.eventTitle == null || req.body.eventTitle == "") && (req.body.eventDescription != null && req.body.eventDescription != "") ){
      console.log("title null and description filled");
      res.redirect("/calendar");
      
    }
    else if( (req.body.eventDescription == null || req.body.eventDescription == "") && (req.body.eventTitle != null && req.body.eventTitle != "") ){
      console.log("title filled and description null");
      //console.log(req.body.)
      res.redirect("/calendar");

    }
    else if( (req.body.eventTitle == null || req.body.eventTitle == "") && (req.body.eventDescription == null || req.body.eventDescription == "") ){


      // User.findByIdAndUpdate(req.user.id).then(userToUpdate => {
      //   const foundIndex = userToUpdate.events.findIndex((event, index) => {
      //     console.log("event.date: " + event.date);
      //     console.log("req.body.dateData: " + req.body.dateData);
      //     return (event.date === req.body.dateData);
      //   });

      //   console.log("foundIndex : " + foundIndex);

      //   if(foundIndex != -1){
      //     console.log("splicing start");
      //     userToUpdate.events.splice(foundIndex, 1);
      //   }
      //   userToUpdate.save();
      // }).catch(err => {
      //   console.log(err);
      // });

      
      res.redirect("/calendar");

    }
    else{
      User.findById(req.user.id).then(foundUser => {


  
        const dateData = req.body.dateData;
  
        const userData = {
          date: dateData,
          title: req.body.eventTitle,
          content: req.body.eventDescription
        };
  
        const foundIndex = foundUser.events.findIndex((event, index) => {
          
          return (event.date === dateData);
        });
  
  
        if(foundIndex < 0){
          foundUser.events.push(userData);
        }
        else{
          foundUser.events[foundIndex] = userData;
        }
  
  
        
  
        foundUser.save().then(() => {
          res.redirect("/calendar");
        });
  
      }).catch(err => {
        console.log(err);
      });
    }

    res.cookie('lastPostDate', req.body.dateData);
    //res.status(200).json(req.body.dateData);
    
  });

  app.post("/delete", (req, res) => {

    User.findByIdAndUpdate(req.user.id).then(userToUpdate => {
      const foundIndex = userToUpdate.events.findIndex((event, index) => {
        console.log("event.date: " + event.date);
        console.log("req.body.dateData: " + req.body.dateData);
        return (event.date === req.body.dateData);
      });

      console.log("foundIndex : " + foundIndex);

      if(foundIndex != -1){
        console.log("splicing start");
        userToUpdate.events.splice(foundIndex, 1);
      }
      userToUpdate.save();
    }).catch(err => {
      console.log(err);
    });

    res.cookie('lastPostDate', req.body.dateData);
    res.redirect("/calendar");
    //res.status(200).json(req.body.dateData);

  });
  

  app.post("/register", (req, res) => {

    User.register(
      { username: req.body.username },
      req.body.password,
      function (err, user) {
        if (err) {
          console.log(err);
          //alert("message");
          res.redirect("/register");
        } else {
          passport.authenticate("local")(req, res, function () {
            res.redirect("/calendar");
            //res.sendFile(__dirname + "/calendar.html");
          });
        }
      }
    );
    
  });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home.html");
});

app.get("/auth/google", (req, res) => {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res);
});

app.get("/auth/google/calendar", 
  passport.authenticate("google", { failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect secrets.
    //res.redirect("/calendar");
    //res.sendFile(__dirname + "/calendar.html");
    res.redirect("/calendar");
  });





  //app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get("/auth/facebook", passport.authenticate("facebook", { scope: ['email'] }));
  

  app.get("/auth/facebook/calendar", 
    passport.authenticate("facebook", { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect to secrets.
      //res.redirect("/calendar");
      //res.sendFile(__dirname + "/calendar.html");
      res.redirect("/calendar");
    });



app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html");
});

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html");
});

// app.post("/login", (req, res) => {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//   });
//   //localStorage.setItem("username", req.body.username);
//   //window.username = req.body.username;
 
//   req.login(user, function (err) {
//     if (err) {
//       //console.log(err);
//       res.redirect("/login");
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         //res.redirect("/calendar");
//         //res.sendFile(__dirname + "/calendar.html");
//         res.redirect("/calendar");
//       });
//     }
//   });


// });




app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      // Handle errors, e.g., log the error or display an error message
      return next(err);
    }
    
    if (!user) {
      // Authentication failed, redirect back to the login page with a flash message
      // or any other error handling you want
      //alert("message");
      return res.redirect("/login");
    }

    // If authentication succeeded, log the user in
    req.login(user, (err) => {
      if (err) {
        // Handle errors, e.g., log the error or display an error message
        return next(err);
      }

      // Redirect the user to the calendar page on successful login
      return res.redirect("/calendar");
    });
  })(req, res, next);
});



app.get("/logout", (req, res) => {

  //req.session.destroy();

  const dObj = new Date();
  let yr = dObj.getFullYear();
  let mon = dObj.getMonth();
  let dy = dObj.getDate();
  mon = mon + 1;
  mon = mon % 10 == mon ? '0' + mon : mon;
  dy = dy % 10 == dy ? '0' + dy : dy;
  res.cookie('lastPostDate', yr + '-' + mon + '-' + dy);
  req.logout(function (err) {
    if (err) {
      return next(err);
    } else {
      
      res.redirect("/");
    }
  });
});

app.get("/calendar/events", (req, res) => {



  User.findById(req.user.id).then(function(foundUser){
    res.send(foundUser.events);
}).catch(function(err){
    //console.log(err);
    //res.send(err);
    res.send("Login First");
});

});


// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   } else {
//     res.send('Login First');
//   }
// }

app.get("/calendar/events/:year", (req, res) => {

  User.findById(req.user.id).then(function(foundUser){
    //res.send(foundUser.events);

    const events = foundUser.events;

    const eventsForYear = events.filter((event) => {
      return event.date.substring(0,4) == req.params.year;
    })
    res.send(eventsForYear);
}).catch(function(err){
    //console.log(err);
    //res.send(err);
    res.send("Login First");
});

});


// const vonage = new Vonage({
//   apiKey: process.env.VONAGE_API_KEY,
//   apiSecret: process.env.VONAGE_API_SECRET
// });

// vonage.verify.start({
//   number: "919952665455",
//   brand: "Vonage"
// })
//   .then(resp => console.log("request_id: " + resp.request_id))
//   .catch(err => console.error(err));

const from = "Vonage APIs";
const to = "1234567891";
//const text = 

// async function sendSMS() {
//     await vonage.sms.send({to, from, text})
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
// }

// sendSMS();


// async function sendSMS() {
//   try {
//       const response = await vonage.sms.send({ to, from, text });
//       console.log('Message sent successfully');
//       console.log(response);
//   } catch (error) {
//       console.error('There was an error sending the message.');
//       console.error(error);
//   }
// }

// sendSMS();

// vonage.verify.cancel('6b93074c1d96464f9e1444bd54d98494')
//   .then(resp => console.log(resp))
//   .catch(err => console.error(err));

// vonage.verify.check('6b93074c1d96464f9e1444bd54d98494', '3960')
//   .then(resp => console.log(resp))
//   .catch(err => console.error(err));

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'hasan07122002@gmail.com',
    pass: process.env.GMAIL_PASSWORD
  }
});




const currentTime = new Date();
const millisecondsTo12 = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate() + 1, 0, 0, 0) - currentTime;
//const millisecondsTo12 = 10000;

function myScheduledFunction() {
  // Your code to be executed at midnight goes here
  console.log("Executing daily task at midnight...");
  // ...
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const currentDate = `${year}-${month}-${day}`;

  const userCursor = User.find().cursor();

  userCursor.eachAsync(user => {
    if (user && user.username) {
      console.log(user.username);
      // Do whatever processing you need with the username

      //const match = user.events.find()

      const match = user.events.find((obj) => {
        return (obj.date === currentDate)
      });

      if(match){
        const toAddress = user.username;

        const mailOptions = {
          from: 'hasan07122002@gmail.com', // Sender email address
          to: toAddress, // Recipient email address
          subject: "Personal Calendar Event - " + match.title, // Email subject
          text: match.content // Email body (plaintext)
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });

      }


    }
  })
    .then(() => {
      console.log('Cursor processing completed.');
    })
    .catch(err => {
      console.error('Error processing cursor:', err);
    });

  
  


  
}


setTimeout(() => {
  myScheduledFunction();
  // Repeat the function every 24 hours
  setInterval(myScheduledFunction, 24 * 60 * 60 * 1000);
}, millisecondsTo12);



app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000");
  });



