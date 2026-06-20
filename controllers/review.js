const Listing=require("../models/listing.js");
const Review=require("../models/review.js");

module.exports.createReview=async (req, res) => {
  let { id } = req.params;
  console.log(req.body.review);
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author=req.user._id;
  listing.reviews.push(newReview);
    
  console.log(newReview);
  await newReview.save();

  await listing.save();
  
    req.flash("success","successfully made a new review");
  res.redirect(`/listings/${id}`);
}


module.exports.destroyReview=async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success","successfully deleted the review");
  res.redirect(`/listings/${id}`);
}