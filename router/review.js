const express = require("express");
const router = express.Router({ mergeParams: true });
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../util/wrapAsync.js");
const expressError = require("../util/expressError.js");
const { reviewSchema } = require("../schemajoi.js");
const {isLoggedIn,isReviewAuthor}=require("../middleware.js");
const reviewcontroller=require("../controllers/review.js");



const validateReview = (req,res,next)=>{
   let result= reviewSchema.validate(req.body);
  //  console.log(result.error)//agr error  nhi rahega to undefine print hoga
     if(result.error){
      throw new expressError(400,result.error.message)
     }
     else{
      next();
     }
}

router.post("/reviews",isLoggedIn, validateReview,
wrapAsync(reviewcontroller.createReview ));

//delete review
router.delete("/reviews/:reviewId",isLoggedIn,isReviewAuthor,
wrapAsync(reviewcontroller.destroyReview))

module.exports = router;