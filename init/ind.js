const mongoose=require("mongoose");
const Listing=require("../models/listing.js");
const initdata=require("./data.js")



let url="mongodb://localhost:27017/wanderlust"
main().then((res)=>{
  console.log("conected to db")
});

async function main() {
    await mongoose.connect(url);
}

const initdb=async()=>{
await Listing.deleteMany({});
console.log("deleted"); 
initdata.data=initdata.data.map((listing)=>{
    return {
        ...listing,
        owner:"69fed267f5b5424c0361f26e"
    }
});                                                                                                                                                                                                        
await Listing.insertMany(initdata.data);
console.log("inserted");
}
initdb();                               //  title:"rameha", description:"namkuri", price:2300,   location:"ranchi"  