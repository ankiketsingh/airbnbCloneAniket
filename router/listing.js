if (process.env.NODE_ENV !== "production") {
require('dotenv').config();
}

// console.log(process.env.SECRET);

let express=require("express")
let router=express.Router();
const Listing=require("../models/listing.js");
const Review=require("../models/review.js")
const wrapAsync=require("../util/wrapAsync.js")
const multer=require("multer");
const {storage}=require("../cloudconfig.js");
const upload=multer({storage});

const {isLoggedIn,isOwner,validating}=require("../middleware.js");
const listingcontroller=require("../controllers/listings.js");



router.get("/", 
 wrapAsync(listingcontroller.index));


//New Route
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

//show specific data
router.get("/:id", 
 wrapAsync( listingcontroller.showListing));

//Create Route
router.post("/", upload.single("listing[image]"), validating,
  wrapAsync(listingcontroller.createListing  ));
// router.post("/",upload.single("listing[image]"),(req,res)=>{
//   res.send(req.file);
// })

//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,
  wrapAsync(listingcontroller.editListingForm ));

//Update Route
router.put("/:id", upload.single("listing[image]"), validating,isLoggedIn,isOwner,
  wrapAsync(listingcontroller.updateListing  ));

//Delete Route
router.delete("/:id",isLoggedIn,isOwner,
  wrapAsync(listingcontroller.destroyListing ));


module.exports=router;