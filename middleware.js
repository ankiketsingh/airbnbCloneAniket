let Listing=require("./models/listing.js");
let Review=require("./models/review.js");
const expressError=require("./util/expressError.js")
const {listingSchema , reviewSchema }=require("./schemajoi.js");


module.exports.validating = (req,res,next)=>{
   let result= listingSchema.validate(req.body);
   //joi ke help se,server side validation ke liye ye method use karenge ye listingSchema ko use karke req.body ko validate karega aur agar error aata hai to usko handle karega
  //  console.log(result.error)//agr error  nhi rahega to undefine print hoga
     if(result.error){
      throw new expressError(400,result.error.message)
     }
     else{
      next();
     }
}

module.exports.isLoggedIn=(req,res,next)=>{
  if(!req.isAuthenticated()){
    req.session.redirectUrl=req.originalUrl; //ye hai user jis urlbpe login hone ke baad jana 
    // chahata hai us url ko session me store krne ke liye taki login hone ke
    //  baad wapas us url pe redirect kr sake

    req.flash("error","you must be logged in first");
    return res.redirect("/users/login");
  }
  next(); 
  //isAuthenticated() ek methode hai jo check karta hai ki user login hai ya nhi
  //  agar login hai to true return karega nhi to false return karega
  //req.isAuthenticated() ye req.user ko check kr leta hai internaly 
  //agar user login hai to req.user me user ka data store hota hai agar login nhi hai to req.user undefined hota hai
  //
}

module.exports.saveRedirectUrl=(req,res,next)=>{
  if(req.session.redirectUrl){
    res.locals.redirectUrl=req.session.redirectUrl;
    
  }
  next();
}

module.exports.isOwner= async (req,res,next)=>{
    let { id } = req.params;
  let listing = await Listing.findById(id);
  if(!res.locals.currentUser._id.equals(listing.owner)){
    req.flash("error","you are not the owner of this listing");
    return res.redirect(`/listings/${id}`);
  }
  next();
  //iss se authorization ka kaam hoga ki jo user listing create karega wahi us
  //  listing ko edit aur delete kar payega
}

module.exports.isReviewAuthor= async (req,res,next)=>{
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if(!res.locals.currentUser._id.equals(review.author)){
    req.flash("error","you are not the author of this review");
    return res.redirect(`/listings/${id}`);
  }
  next();
}
