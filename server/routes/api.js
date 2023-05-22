const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
// declare axios for making http requests
const axios = require("axios");
//sk for stripe, as for assignment it is here , if not it will initialised as a variable and stored in the file that can ignored when uploading to git.
const stripe = require('stripe')('your-sk-key')

//jwt secret
var secret = 'harrypotter';
/* GET api listing. */
router.get("/", (req, res) => {
  res.send("api works");
});
const MongoClient = require("mongodb").MongoClient;

const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");
const { default: Stripe } = require("stripe");
const BCRYPT_SALT_ROUNDS = 12;
var db;

MongoClient.connect(
  "------your connection url----",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, database) => {
    if (err) return console.log(err);
    db = database.db("sghotelly");
  }
);

//////////////////// Admin can add,edit,retrieve and delete hotel, hoteladmin can edit hotel & retrieve, user can only retrieve hotels!
//get all  hotels
router.route("/hotels").get(function (req, res) {
  db.collection("hotels")
    .find()
    .toArray((err, results) => {
      res.send(results);
    });
});

//add a hotel
//only user is logged in with a token 
//and has a role "admin"
router.route("/hotels").post(verifyToken,function (req,res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
      console.log(authData)
    }
    if( authData.role != 'admin'){
      res.sendStatus(403);
      console.log(authData.role)
    }
    else {
  db.collection("hotels").insertOne(req.body,(err,results)=>{
    if (err) return console.log(err);
    console.log("saved to database");
    res.send(results);
    
  });
  }
});
});
//delete hotel
//only user is logged in with a token 
//and has a role "admin" 
  router.route('/hotels/:_id').delete(verifyToken,function (req,res) {
    jwt.verify(req.token,secret,(err,authData)=>{
      if(err){
        res.sendStatus(403);
        console.log(authData)
      }
      if( authData.role != 'admin'){
        res.sendStatus(403);
        console.log(authData.role)
      }
      else{
    db.collection('hotels').deleteOne({"_id":ObjectId(req.params._id)},(err,results)=>{
      res.send(results);
    });
  }
});
  });

//edit hotel
//only user is logged in with a token 
//and has a role "admin"  OR "hotelAdmin"
router.route('/hotels/:_id').put(verifyToken,function (req,res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
      console.log(authData)
    }
    if( authData.role == 'user'){
      res.sendStatus(403);
      console.log(authData.role)
    }
    else{
  db.collection('hotels').updateOne({"_id":ObjectId(req.params._id)},{ $set: req.body},(err,results)=>{
    res.send(results);
  })
}
  });
});

//get hotel details 
//anyone can access // so no need to verify login/token
router.route("/detail/:_id").get(function (req, res) {
  db.collection("hotels")
    .find({ id: req.params._id })
    .toArray((err, results) => {
      if (err) return console.log(err);
      console.log("retrieved details from database");
      res.send(results);
    });
});

router.route("/room/detail/:_id").get(function (req, res) {
  db.collection("hotels")
    .find({ id: req.params._id })
    .toArray((err, results) => {
      if (err) return console.log(err);
      console.log("retrieved room details from database");
      res.send(results);
    });
});

//get hotel booked by id 
// only logged in user can access
router.route("/payment/:_id").get(verifyToken,function (req, res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
  }
  else{
  db.collection("hotels")
    .find({ id: req.params._id })
    .toArray((err, results) => {
      if (err) return console.log(err);
      console.log("retrieved hotel details from database");
      res.send(results);
    });
    authData
}
})
});


//BOOKING
//get bookings based on object id in mongodb
//user needs to be logged in !
router.route('/bookings/:_id').get(verifyToken,function ( req,res){
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }
    else{
  db.collection('bookings').findOne({"_id":ObjectId(req.params._id)},(err,results)=>{
    res.send(results);
    console.log(req.params._id)
  })
}
  })

});

//delete booking by object id 
//only if user is logged in
router.route('/bookings/:_id').delete(verifyToken,function ( req,res){
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }
    else{
  db.collection('bookings').deleteOne({"_id":ObjectId(req.params._id)},(err,results)=>{
    res.send(results);
  });
}
  });
});

// user/admin/hotelAdmmin can create post butttt need token for verification of their login
router.route("/bookings").post(verifyToken,function (req,res){
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }
    else{

      db.collection('bookings').insertOne(req.body,(err,results)=>{
        console.log('saved  to database');
        res.send(results);
        });
        authData
  }
  })
 
})
//get bookings based on customer's username.
//user need to logged in with a token whether is on the frontend or in the postman:)
router.route("/bookings").get(verifyToken,function ( req,res){
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }
    else{
      db.collection('bookings').find({"customerId":authData.username}).toArray((err, results) => {
        if (err) return console.log(err);
        console.log("retrieved booking details from database");
        res.send(results);
        console.log(results)
    
      });
      authData
  }
})
});

//user has no rights to edit his/her bookings
/*//update bookings based on id 
router.route('/bookings/:_id').put(function(req,res){
  //from collection quotes = > update a selected record by 1 from the quotes collection based on id
  db.collection('bookings').updateOne({"_id":ObjectId(req.params._id)},{
    $set: req.body } , (err,results)=>{
      res.send(results);
  });
});
*/


//get all users for admin database.
//user needs to be logged in and has a token role of "admin"
router.route("/users").get(verifyToken,function (req,res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
      console.log(authData)
    }
    if( authData.role != 'admin'){
      res.sendStatus(403);
      console.log(authData.role)
    }
    else{

  db.collection("users")
    .find()
    .toArray((err, results) => {
      res.send(results);
    });
}
  });
});

//delete user by id
//user needs to be logged in and has a token role of "admin"
router.route('/users/:_id').delete(verifyToken,function (req,res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
      console.log(authData)
    }
    if( authData.role != 'admin'){
      res.sendStatus(403);
      console.log(authData.role)
    }
    else{
  db.collection('users').deleteOne({"_id":ObjectId(req.params._id)},(err,results)=>{
    res.send(results);
  });
}
  });
});

//put user by id //edit user in admin page
//only if user is logged in and the user role is ADMIN
router.route('/users/:_id').put(verifyToken,function (req,res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
      console.log(authData)
    }
    if( authData.role != 'admin'){
      res.sendStatus(403);
      console.log(authData.role)
    }
    else{
  var username = req.body.username;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var mobileNum = req.body.mobileNum;
  var email = req.body.email;
  var user = req.body;
  var role = req.body.role;

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
  //from collection quotes = > update a selected record by 1 from the quotes collection based on id
  db.collection('users').updateOne({"_id":ObjectId(req.params._id)}, { $set: {"firstName":firstName, "lastName" : lastName, "mobileNum": mobileNum,"email":email, "username" : username, "password" : hash,
  "role" : role}} , (err,results)=>{
    console.log(results);
    res.send(results)
    if (err) return console.log(err)
    });
});
}
  });
});

// insert new user 
//onnly if user is logged in with a token role of "admin"
router.route("/users").post(verifyToken,function (req,res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
      console.log(authData)
    }
    if( authData.role != 'admin'){
      res.sendStatus(403);
      console.log(authData.role)
    }
    else{ 
  var username = req.body.username;
   var password = req.body.password;
   var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   var mobileNum = req.body.mobileNum;
   var email = req.body.email;
   var user = req.body;
   var role = req.body.role;
  bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
   db.collection('users').insertOne({"firstName":firstName, "lastName" : lastName, "mobileNum": mobileNum,"email":email, "username" : username, "password" : hash,
  "role" : role }, (err, result) => {
    console.log(user);
  if (err) return console.log(err)
  });
});
}
  });
});

// authenticate login & generate JWT
router.route('/authuser').post(function(req,res2){
  var username = req.body.username;
  var password = req.body.password;
  var user = req.body;
   db.collection('users').findOne({"username":username},{password:1,role:1,_id:0},function(err,result){
    console.log(result)
      if(result == null) res2.send([{"auth":false}]);
      else{
          bcrypt.compare(password,result.password,function(err,res){
              if(err || res == false){
                  res2.send([{"auth":false}]);
              }
              
              else{
                //bind username and role into this token generated!
                  var token = jwt.sign({ "username":result.username ,"role":result.role},secret,{expiresIn:'24h'});
                  res2.send([{"auth":true,"role":result.role,"email":user.email,"token":token,"username":user.username,"firstName":result.firstName}]);
                 
                 
              }
          })
      }
      
  });
});
//regiseter usser into mongodb
router.route('/reguser').post(function(req, res) {
  var username = req.body.username;
   var password = req.body.pwSet.password;
   
   var firstName = req.body.firstName;
   var lastName = req.body.lastName;
   var mobileNum = req.body.mobileNum;
   var email = req.body.email;
   var user = req.body;
  var role = req.body.role;
  bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
   db.collection('users').insertOne({"firstName":firstName, "lastName" : lastName, "mobileNum": mobileNum,"email":email, "username" : username, "password" : hash,
  "role" : role }, (err, result) => {
    console.log(user);
  if (err) return console.log(err)
  else{
  console.log('user registered')
  //var token = jwt.sign({ "username":result.username },'123',{expiresIn:'24h'});
  res.send([{"auth":true,"role":user.role,"username":user.username}]);
  }
   });
  });
  });

  //get profile data based on user  baased on user's username
// token is required to access the url or the page.
router.route("/profile").get(verifyToken,function ( req,res){
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
    }
    else{
      db.collection('users').find({"username":authData.username}).toArray((err, results) => {
        if (err) return console.log(err);
        console.log("retrieved booking details from database");
        res.send(results);
        console.log(results)
     
      });
      authData
  }
})
});
 //edit profile data 
// token is required to access the url or the page.
router.route('/profile/:_id').put(verifyToken,function (req,res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);
      console.log(authData)
    }
    else{
  var username = req.body.username;
  var password = req.body.password;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var mobileNum = req.body.mobileNum;
  var email = req.body.email;
  var user = req.body;
  var role = req.body.role;

  bcrypt.hash(password, BCRYPT_SALT_ROUNDS, function(err, hash) {
  //from collection quotes = > update a selected record by 1 from the quotes collection based on id
  db.collection('users').updateOne({"_id":ObjectId(req.params._id)}, { $set: {"firstName":firstName, "lastName" : lastName, "mobileNum": mobileNum,"email":email, "username" : username, "password" : hash,
  "role" : role}} , (err,results)=>{
    console.log(results);
    res.send(results)
    if (err) return console.log(err)
    });
});
}
  });
});

// Authorization: Bearer <access_token> --> formation of the token
//function verify token -> where header is authorization, split the token from the bearer via space , and get the token.
  function verifyToken(req,res,next){
    // get the auth header value 
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined 
    if(typeof bearerHeader !== 'undefined'){
      // take token out of the bearer --> split by space -> becomes an array
      const bearer = bearerHeader.split(' ');
      //get token from array 
      const bearerToken = bearer[1];
      //set the token 
      req.token = bearerToken;
      //next middleware
      next();

    }
    else{
      //Forbiddin
      res.sendStatus(403);

    }

  }

//to get card token using stripe
//only for those users who are logged in and has a BEARER token.
router.route('/getCardToken').post(verifyToken,function (req,res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);

    }
    else{
  var card = {
    number:req.body.number,
    exp_month:req.body.exp_month,
    exp_year:req.body.exp_year,
    cvc:req.body.cvc

  };
  stripe.tokens.create({card},function(err,data){
   if(err){
     res.send(err);
     console.log({card})
   }
   else{
     res.send({
       "message":"Token generated successfully",
       "data":data
     })
   }
})
}
  })
});


// to charge user based on booked hotel payment with the card token generated.
//only for those users who are logged in and has a BEARER token.
router.route('/chargeUser').post(verifyToken,function (req,res) {
  jwt.verify(req.token,secret,(err,authData)=>{
    if(err){
      res.sendStatus(403);

    }
    else{ 
  var charge = {
 
    amount: (req.body.amount)*100,
    currency:"sgd",
    source:req.body.token,
    description:req.body.hotelName
  }
  stripe.charges.create(charge,function(err,data){
   if(err){
     res.send(err);
    // console.log({card})
   }
   else{
     res.send({
       "message":"Charged Successfully",
       "data":data
     })
   }
})
}
  })
});


module.exports = router;
