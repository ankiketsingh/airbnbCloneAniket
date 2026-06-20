let express=require("express")
let app=express();
const path=require("path")
let listingsRouter=require("./router/listing.js");
let reviewsRouter=require("./router/review.js");
let userRouter=require("./router/user.js");
let mongoose=require("mongoose");
const Listing=require("./models/listing")
const Review=require("./models/review.js");
const methodoverride=require("method-override");
const ejsmate=require("ejs-mate") //boilerplate ke liye use hota hai,,jo views me hai
const wrapAsync=require("./util/wrapAsync.js")
const expressError=require("./util/expressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo').default;
const flash = require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const passportLocalMongoose=require("passport-local-mongoose");

const User=require("./models/user.js");


const {listingSchema , reviewSchema }=require("./schemajoi.js");




//server on 8080 port
app.listen("8080",()=>{
  console.log("aap is listen on 8080")
});

//connectoin to db
let dburl=process.env.ATLASH_DB_URL;
main().then((res)=>{
  console.log("conected to db")
})

async function main() {
    await mongoose.connect(dburl);
}

//set path 
app.set("view engine","ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodoverride("_method"));
app.engine("ejs",ejsmate);
app.use(express.static("public"))
app.use(express.static(path.join(__dirname,"public")));

let store = MongoStore.create({
  mongoUrl: dburl,
  crypto: {
    secret: process.env.SECRET
  },
  touchAfter: 24 * 3600
});
store.on("error",()=>{
  console.log("store session  error mongo-connect ",error)
})

let sessionOptions={
    store,

  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
   cookie:{
  expires: Date.now()+ 7*24*60*60*1000,
  maxAge:7*24*60*60*1000,
  httOnly:true,
  }
};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use("user-local",new LocalStrategy(User.authenticate()));//ye user model ke liye define huaa hai

// session pe user ka data store aur destore karne ke liye ye dono method use hote hai //halanki ye user model ka karwayega
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




// app.get(("/"),(req,res)=>{
//     res.send("working home")
// })

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  res.locals.currentUser=req.user;
  next();
});




//sample of one data insert into db
// app.get(("/testlisting"), async(req,res)=>{
//   let samplelisting= new Listing({
//     title:" own new property",
//     description:" by the wonder",
//     price:1300,
//     location:"pune",
//     country:"india",  })
//    await  samplelisting.save();

//     res.send("working home")
// })


//show list of store data in db
//
app.use("/users",userRouter);
//listing route
app.use("/listings", listingsRouter);
//review route
app.use("/listings/:id", reviewsRouter);

//review route 
//post review
;

app.use((req,res,next)=>{
  console.log("this is all");
 return next( new expressError(404,"page not found"));
 //custom error yha pe use huaa hai
});

app.use((err,req,res,next)=>{
  console.log("ho rha hai")
  let {status=403,message="something wrong!"}=err;
  // console.log("this is :",err);//iss se pura error detail print hoga
  res.status(status).render("listings/error.ejs",{message});
  // res.send("somthing errror")
  // res.send("something wrong");
});