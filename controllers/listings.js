const { get } = require("mongoose");
const Listing=require("../models/listing.js");


module.exports.index= async (req, res) => {
  const allListings = await Listing.find({});
  console.log("get run ");
    // req.flash("success","successfully made a new listing");
  res.render("./listings/index.ejs", { allListings });
}

module.exports.renderNewForm=(req, res) => {

  res.render("listings/new.ejs");
}

module.exports.createListing= async (req, res,next) => {

// geocoding for coordinates..
let getlatt;
let getlongt;
 
let add=req.body.listing.location;
    let getdetails= async (add)=>{
        console.log("add",add);
    let url=`https://geocode.xyz/${add}?json=1&auth=757700736225042843156x75942`;
   let data= await fetch(url);
   let result= await data.json();
 console.log("result",result);
   let {latt,longt}=result;
 getlatt= parseFloat(latt);
 getlongt=parseFloat(longt);

console.log("here",getlatt,getlongt);

 // ✅ Convert to GeoJSON Feature
  const geojsonPoint = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [getlongt, getlatt] // [lng, lat]
    },
    properties: {
      name: add
    }
  }
  return geojsonPoint;
}

//getting listing details from form and saving in database
    console.log(req.body.listing)
    let url=req.file.path;
    let filename=req.file.filename;
    //  if(  !(req.body.listing)){
    //     throw   new expressError(400,"send valid data for listing");
    // }
    // let {error}= listingSchema.validate(req.body.listing);
    // console.log(error.details[0].message);

    
    console.log("runnn");
  const newListing = new Listing(req.body.listing);//here create new listing obj
    // if(!newListing){
    //   return next( err);
    // }

   newListing.owner=req.user._id;  // set ower property to listing
   let activate= async()=>{ //  set geometry property to listing 
newListing.geometry=(await getdetails(add)).geometry;
console.log("active wala geometry",newListing.geometry);
}
await activate();

   newListing.image={url,filename};  
  await newListing.save();   // newlisting save to database
  req.flash("success","successfully made a new listing");
  res.redirect("/listings");
}

module.exports.showListing=  async (req, res) => {
  let { id } = req.params;
  console.log("ye bhi show wala")
  const listing = await Listing.findById(id)
  .populate({path:"reviews",populate:{path:"author"}})
  .populate("owner");
  if(!listing){
    req.flash("error","listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
}

module.exports.editListingForm=  async (req, res,next) => {
  let { id } = req.params;
 
  const listing = await Listing.findById(id);
  //   if(!listing){
  //   return next(new expressError(444,"not found data! enter correct id"));
  // }
    if(!listing){
    req.flash("error","listing you requested for does not exist");
    return res.redirect("/listings");
  } 
  let originalimageurl=listing.image.url;
  originalimageurl=originalimageurl.replace("/upload","/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalimageurl });
}

module.exports.updateListing= async (req, res) => {
     console.log("yha tk")
     // update location by geocoding
     let getlatt;
let getlongt;
 
let add=req.body.listing.location;
    let getdetails= async (add)=>{
        console.log("add",add);
    let url=`https://geocode.xyz/${add}?json=1&auth=757700736225042843156x75942`;
   let data= await fetch(url);
   let result= await data.json();
 console.log("result",result);
   let {latt,longt}=result;
 getlatt= parseFloat(latt);
 getlongt=parseFloat(longt);

console.log("here",getlatt,getlongt);

 // ✅ Convert to GeoJSON Feature
  const geojsonPoint = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [getlongt, getlatt] // [lng, lat]
    },
    properties: {
      name: add
    }
  }
  return geojsonPoint;
}

  let { id } = req.params;
 let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

 if(typeof req.file !== "undefined"){
  let url=req.file.path;
  let filename=req.file.filename;
  listing.image={url,filename};
  console.log("file image ke liye")
  await listing.save();
 }
  let activate= async()=>{ //  set geometry property to listing 
listing.geometry=(await getdetails(add)).geometry;
console.log("active wala geometry",listing.geometry);
}
await activate();
await listing.save();

    req.flash("success","successfully updated the listing");
  res.redirect(`/listings/${id}`);
}

module.exports.destroyListing= async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
      if(!deletedListing){
    req.flash("error","listing you requested for does not exist");
    return res.redirect("/listings");
  }
  console.log(deletedListing);
    req.flash("success","successfully deleted the listing");
  res.redirect("/listings");
}