const express = require("express");
const middleware = require("../middleware/confirm");
const indexController = require("../controller/indexController");
const router = express.Router();



router.get("/", indexController.getHomePage);
router.get("/confirmation", indexController.getConfirmation);
router.post("/receiveData", indexController.postData);
router.get("/divisions", indexController.getDivision);
router.get("/divisions/:divisionId/dioceses", indexController.getDioceseByDivision);
router.get("/dioceses/:dioceseId/zones", indexController.getZoneByDiocese);
router.get("/zones/:zoneId/parishes", indexController.getParishByZone);



module.exports = router;
