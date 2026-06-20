const User = require("../models/user.js");

module.exports.renderSignupForm=(req,res)=>{
    res.render("users/signup.ejs")
}

module.exports.signup= async(req,res)=>{
   try{     let {username,email,password}=req.body;
    let newUser=new User({username,email});
    let registeredUser= await User.register(newUser,password);
    console.log(registeredUser);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
    req.flash("success","welcome to wanderlust");
let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
    
        })}catch(e){
    req.flash("error",e.message);
    res.redirect("/users/signup");
}
}

module.exports.renderLoginForm=(req,res)=>{
    res.render("users/login.ejs")
}

module.exports.login= async(req,res)=>{
     req.flash("success","nice to see you on wanderlust");
     let redirectUrl=res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
       
    }

    module.exports.logout=(req,res)=>{
        req.logout(function(err) {
            if (err) { return next(err); }
            req.flash("success","you have been logged out!");
            res.redirect("/listings");
        });
       
    }
