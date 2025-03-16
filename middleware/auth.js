const Permission = require("../mongo/permission");

let middlewareObject = {};

//a middleware to check if a user is logged in or not
middlewareObject.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You are already logged in.");
  res.redirect("/"); // Redirect to home or another appropriate page
};

//check if user is Login as User
middlewareObject.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("error", "Please log in to continue");
    res.redirect("/user/login");
  }
};

//check if user email is verified before login
middlewareObject.emailVerified = (req, res, next) => {
  if (req.isAuthenticated() && !req.user.emailVerified) {
    req.flash(
      "success",
      "please activate your account by checking email:" + req.user.email
    );
    //check if user.email not verifies
    console.log("error", "please verify your account first");
    return res.redirect("/");
  }
  next();
};

middlewareObject.hasChurchRole = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "Please log in to access this page");
    return res.redirect("/user/login");
  }

  const userRole = req.user.role;
  const route = req.route.path;
  const method = req.method;

  try {
    // Check if the route is accessible by the user's role
    const permissionOne = await Permission.find({ method: "POST" });
    //console.log('all permission', permissionOne)

    const permission = await Permission.findOne({ route });
    if (!permission || !permission.roles.includes(userRole)) {
      return res.status(403).render("error/403");
    }

    // Hotel-based access control
    let hotelQuery = {};
    const userHotels = req.user.hotels;

    if (userRole === "superUser") {
      req.isSuperUser = true;
      hotelQuery = {}; // SuperUser has access to all hotels
    } else {
      hotelQuery = { _id: { $in: userHotels } }; // Access limited to assigned hotels
    }

    const hotels = await Hotel.find(hotelQuery)
      .populate("reviews")
      .populate("rooms")
      .populate("food")
      .exec();

    req.filteredHotels = hotels;
    res.locals.hotels = hotels;

    next();
  } catch (error) {
    console.error("Error processing permissions or hotel access:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = middlewareObject;
