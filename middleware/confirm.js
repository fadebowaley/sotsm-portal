
let middlewareObject = {};

//a middleware to check if a user is logged in or not
middlewareObject.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
};


middlewareObject.isAdmin = (req, res, next) => {

  if (req.isAuthenticated() && (req.user.role === "admin" || req.user.role === "superUser" || req.user.role === "manager")) {
    const userRole = req.user.role;

    if (userRole === "superUser") {
      req.isSuperUser = true;
    }

    // Retrieve the hotels array from the user object
    const userChurch = req.user.church;

    // Query the hotels collection based on the user's role
    let churchQuery = {};

    if (userRole === "superUser") {
      // No restrictions for superUser, retrieve all hotels
      churchQuery = {};
    } else {
      // Only retrieve hotels from the user's hotels array
      churchQuery = { _id: { $in: userChurch } };
    }

    next(); // Proceed to the next middleware or route handler
  } else {
    res.redirect("error/403");
  }
};


//check if user email is verified before login
middlewareObject.emailVerified  = (req, res, next) => {
  if (req.isAuthenticated() && !req.user.emailVerified) {
    req.flash("success", "please activate your account by checking email:" + req.user.email);
    //check if user.email not verifies
    console.log('error', 'please verify your account first')
    return res.redirect("/");
  }
  next();
}


//check if user is Login as User 
middlewareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Please you need to login to continue");
    res.redirect("/");
  }
};




module.exports = middlewareObject;


