const express = require("express");
const middleware = require("../middleware/confirm");
const indexController = require("../controller/indexController");
const router = express.Router();
const userService = require("../controller/clcUser")
const clcService = require("../controller/clcChurch")
const houseHoldController = require("../controller/houseHold");



router.get("/", indexController.getHomePage);
router.get("/pastors", indexController.getPastors);
router.get("/confirmation", indexController.getConfirmation);
router.get("/confirmation/:userId", indexController.getCon);
router.post("/receiveData", indexController.postData);
router.get("/divisions", indexController.getDivision);
router.get("/divisions/:divisionId/dioceses", indexController.getDioceseByDivision);
router.get("/dioceses/:dioceseId/zones", indexController.getZoneByDiocese);
router.get("/zones/:zoneId/parishes", indexController.getParishByZone);
router.get("/searchUser", indexController.searchUser);

//routes for basic Administrations

// Route Definitions for User
router.get('/users', userService.getUsers);
router.get('/auth/users', userService.getAuthUsers);

//Routes to create Authenticated User and Users
router.post("/createAuthUser", userService.postCreateAuthUser);
router.post("/createUser", userService.postCreateUser);

router.post("/createUser", userService.postCreateUser);
router.put("/updateUser/:userId", userService.postCreateUser);

router.delete("/deleteUser/:userId", userService.deleteUser);
router.delete("/deleteAuthUser/:userId", userService.deleteAuthUser);



router.get("/church/parishes", clcService.getParishes);
router.get("/church/zones", clcService.getZones);
router.get("/church/dioceses", clcService.getDiocese);
router.get("/church/divisions", clcService.getDivision);
router.get("/church/missions", clcService.getMission);


// router.get("/church/region");
// router.get("/church/campuses");
// router.get("/church/nations");

router.get("/get-church-data", clcService.getChurchDataById);
router.post('/createChurch', clcService.updateOrCreateChurch);
router.put('/updateChurch/:churchId', clcService.updateOrCreateChurch);
router.delete("/deleteChurch/:id", clcService.deleteChurch);



// Create a new household
router.post("/households", houseHoldController.create);
// Retrieve all households
router.get("/households", houseHoldController.getAll);
// Retrieve a single household by ID
router.get("/households/:id", houseHoldController.getById);
// Update a household by ID
router.put("/households/:id", houseHoldController.updateById);
// Delete a household by ID
router.delete("/households/:id", houseHoldController.deleteById);





module.exports = router;
