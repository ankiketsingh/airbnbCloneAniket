let express=require("express")
let router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController=require("../controllers/user.js");


router
.route("/signup")
.get(userController.renderSignupForm)
.post(saveRedirectUrl,wrapAsync(userController.signup));


router
.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl,passport.authenticate("user-local", { failureRedirect: "/users/login", 
    failureFlash: true }),wrapAsync(userController.login));

     //hmelogin ke liye try catch se logic bnane ki jarurat nhi padti hai kyuki--
    //   yha pe passport.authenticate jaise use kiye to ye sara kaam khud se kar dega log in wala
    // 1. ye check karega ki user exist karta hai ya nhi
    // 2. password sahi hai ya nhi
    // 3. agar dono sahi hai to user ko login kar dega
    // 4. agar koi bhi galat hua to user ko login page pe redirect kar dega
    // 5. agar galat hua to flash message bhi bhej dega
    //imp -- ye user model ke liye hai ye define krta hai "user-local"

    router.get("/logout",userController.logout);
     //req.logout ye passport ka method hai jo user ko logout karwata hai aur callback function leta hai jisme error handle kar sakte hai
        //ye current session ko delete kr deta hai jisse req.user undefined ho jata hai
        // 

module.exports=router;