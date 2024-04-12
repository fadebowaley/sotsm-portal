const { UserData } = require("../models");
const { CareerMinistry } = require("../models");
const { Church } = require("../models");
const { Department } = require("../models");
const { MonthlyReport } = require("../models");
const { SpiritualProfile } = require("../models");
const { Statistics } = require("../models");
const { User } = require("../models");
const { VitalStatistics } = require("../models");

//code for employee code generation


const indexController = {
  getHomePage: async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];
    const currentUser = req.user;

    try {
      res.render("pages/index", {
        errorMsg,
        successMsg,
        currentUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  getConfirmation: async (req, res) => {
    const successMsg = req.flash("success")[0];
    const errorMsg = req.flash("error")[0];
    const currentUser = req.user;

    try {
      res.render("pages/confirm", {
        errorMsg,
        successMsg,
        currentUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  postData: async (req, res) => {
    const data = req.body;
    console.log(req.body);
    /***
    console.log(req.body);
    const {
      title,
      firstname,
      lastname,
      gender,
      dateOfBirth,
      highestQualification,
      professionalQualification,
      maritalStatus,
      StateOfOrigin,
      localGovtOrigin,
      spouseName,
      spousePhoneNumber,
      spouseDateOfBirth,
      nextOfKinName,
      nextOfKinRelationship,
      residentialAddress,
      residentialState,
      empcategory,
      occupation,
     
 * Email
Password
Other Name (if applicable)
Phone Number
Home Town
State of Residence
LGA of Residence
Employee ID (if manually entered)
Created At (not typically entered by the user, but could be automatically generated based on current date and time)
Updated At (same as Created At)
 * 
 */
    /*
      //Spiritual Profile
      yearBornAgain,
      waterBaptized,
      holyghostBaptism,
      joinedSotsm,
      becameWorker,
      becameMinister,
      ordainedDcns,
      becamePastor,
      becameSnrPastor,
      ordainedElder,
      ordainedBishop,
      lastOrdinationDate,
      IBSCOMS,
      WOOCOME,
      ILS,
      NGBTI,
      //if career officer alone
      statusOfEmployment,
      nameOfDivision,
      nameOfDiocese,
      nameOfZone,
      placeOfAssignment,
      lgaOfAssignment,
      stateOfAssignment,
      placeOfAssignmentAddress,
      countryChurch,
      career,
      //career officer
      nameOfDepartment,
      yrEmployed,
      designation,
      gradeLevel,
      stepLevel,
      deptAdress,
      deptState,
      deptLGA,
      countryOrg,

      ispastor_parish, //Yes
      //if carrer officer  and career or only pastor  --church data and vital statistics
      careerPastorOffice,
      churchProperty,
      clcBuilding,
      leaseType,
      avgadult,
      avgyouth,
      avgchildren,
      totalAttedance,
      totalWorkers,
      workersInTraining,
      unordainedLeaders,
      noofMinisters,
      noofdcns,
      noofpastor,
      noofsnrpastor,
      noofelder,
      noofbishops,
    } = req.body;
*/
    // Step 1: Generate an employeeCode (You can implement your own logic to generate employeeCode)

    // Step 2: Post data into UserData table
    /** 
const newUser = await UserData.create({
firstName,
lastName,
email,
emailVerificationToken,
emailVerificationTokenExpiresAt,
password,
title,
otherName,
phoneNumber,
gender,
dateOfBirth,
highestQualification,
professional,
maritalStatus,
stateOfOrigin,
lgaOfOrigin,
homeTown,
spouseName,
spousePhoneNumber,
spouseDateOfBirth,
nextOfKinName,
nextOfKinRelationship,
residentialAddress,
stateOfResidence,
lgaOfResidence,
employmentCategory,
occupation,
employeeId,
createdAt,
updatedAt
    });
*/

    /*
// Step 3: Post spiritual data into SpiritualProfile table
    const newSpiritualProfile = await SpiritualProfile.create({
      // Populate SpiritualProfile fields here based on data received in req.body
      employeeId: newUser.employeeCode, // Assuming employeeId is the foreign key linking SpiritualProfile to UserData
    });
*/

    /*
    // Step 4: Post career data into Department table if career check is true for professional
    if (data.career) {
      const newDepartment = await Department.create({
        // Populate Department fields here based on data received in req.body
        employeeId: newUser.employeeCode, // Assuming employeeId is the foreign key linking Department to UserData
      });
    }
*/

    /*
    // Step 5: Post church data into Church if the employee career check is full/time pastor
    if (data.careerPastorOffice === "full/time pastor") {
      const newChurch = await Church.create({
        // Populate Church fields here based on data received in req.body
        employeeId: newUser.employeeCode, // Assuming employeeId is the foreign key linking Church to UserData
      });
    }
*/

    /*
    // Step 6: Post Vital statistics into Statistics table if career check is professional and pastor
    if (data.career && data.careerPastorOffice) {
      const newStatistics = await Statistics.create({
        // Populate Statistics fields here based on data received in req.body
        employeeId: newUser.employeeCode, // Assuming employeeId is the foreign key linking Statistics to UserData
      });
    }
*/
    //perform validation
    //submit to table as linked with conditional statement
    //Generate a code, if user has email, send a code to Email address

    res.json({ status: "successfully submitted", redirectUrl: "/confirmation" });
    try {

    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  },

  getDivision: async (req, res) => {
    try {
      const divisions = await Church.findAll({
        attributes: ["divisionCode", "parishOrPlaceOfAssignment"], // Specify the attributes you want to fetch
        where: { hqStatus: "division" }, // Filter rows where hqStatus is 'division'
      });
      res.json(divisions);
    } catch (error) {
      console.error("Error fetching divisions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getDioceseByDivision: async (req, res) => {
    const { divisionId } = req.params;
    console.log("you are called right now-id", divisionId);
    try {
      const dioceses = await Church.findAll({
        attributes: ["dioceseCode", "parishOrPlaceOfAssignment"], // Specify the attributes you want to fetch
        where: { divisionCode: divisionId }, // Filter rows where hqStatus is 'diocese'
      });
      res.json(dioceses);
    } catch (error) {
      console.error("Error fetching dioceses:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getZoneByDiocese: async (req, res) => {
    const { dioceseId } = req.params;
    try {
      const zones = await Church.findAll({
        attributes: ["zonalCode", "parishOrPlaceOfAssignment"], // Specify the attributes you want to fetch
        where: { dioceseCode: dioceseId }, // Filter rows where hqStatus is 'diocese'
      });
      console.log(zones);
      res.json(zones);
    } catch (error) {
      console.error("Error fetching zones:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getParishByZone: async (req, res) => {
    const { zoneId } = req.params;
    try {
      const parishes = await Church.findAll({
        attributes: ["parishCode", "parishOrPlaceOfAssignment"], // Specify the attributes you want to fetch
        where: { zonalCode: zoneId }, // Filter rows where hqStatus is 'diocese'
      });
      res.json(parishes);
    } catch (error) {
      console.error("Error fetching parishes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};





module.exports = indexController;


/***
 * CAREER STAFF ONLY
 * {
 * //PERSONAL DATA
 * 
  title: 'Mrs',
  firstname: 'demola',
  lastname: 'adebowale',
  male: 'on',
  dateOfBirth: '2024-04-12',
  highestQualification: 'PGD',
  professionalQualification: 'ANIM',
  maritalStatus: 'Separated',
  StateOfOrigin: 'Ogun',
  localGovtOrigin: 'Egbado North',
  spouseName: 'ademola sde',
  spousePhoneNumber: '09123454667',
  spouseDateOfBirth: '2024-04-10',
  nextOfKinName: 'ademola adebowale',
  nextOfKinRelationship: 'Father',
  residentialAddress: '90 adebowale ',
  residentialState: 'AkwaIbom',
  residentialLGA: 'Eket',

  empCategory: 'Part-Time Pastor',
  occupation: 'Actor',
  yearBornAgain: '2024',
  waterBaptized: '2024',
  holyghostBaptism: '2024',
  joinedSotsm: '2022',
  becameWorker: '2022',
  becameMinister: '2023',
  ordainedDcns: '0',
  becamePastor: '0',
  becameSnrPastor: '2023',
  ordainedElder: '2023',
  ordainedBishop: '2019',
  lastOrdinationDate: '2024-04-04',
  IBSCOMS: '2024',
  WOOCOME: '0',
  ILS: '2023',
  NGBTI: '2022',
  professional: 'professionalStatus',

  statusOfEmployment: 'part-time',
  nameOfDivision: 'RG2183385',
  stateOfAssignment: '',
  lgaOfAssignment: '',
  placeOfAssignmentAddress: '',
  countryChurch: 'Nigeria',
  nameOfDepartment: 'Mathematics Department',
  yrEmployed: '2024-04-12',
  jobTitle: 'Teacher',
  gradeLevel: '8',
  stepLevel: '3',
  deptAdress: 'location ikorodu',
  deptState: 'Adamawa',
  deptLGA: 'Ganye',
  countryOrg: 'Nigeria',
  ispastor_parish: 'No',
 
}
 * 
 * 
 * 
 */