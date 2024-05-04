const { generateNextCode, sendSMS } = require("../middleware/utils");
const {
  sequelize,
  User,
  SpiritualProfile,
  Church,
  Department,
  Statistics,
} = require("../models");

//validations middleware
const { validateUserFields } = require("./validateUser");

const { validateProfile } = require("./validateSprofile");
const { validateChurchData } = require("./churchValidations");
const { validateEmploymentChurchData } = require("./churchValidation2");
// const { validateStatisticsData } = require("./validateStatistics");
const { validateAssistantData } = require("./validateAssistant");
const { validateProfessionalData } = require("./validateDepartment");

const bcrypt = require("bcrypt");
const saltRounds = 10;

async function saveUserData(req, res, reqBody) {
  const nextEmpCode = await generateNextCode();
  let healthCheck = 0;
  const currentDate = new Date().toISOString();
  const hashed_password = await bcrypt.hash("glory@2024", saltRounds);
  const t = await sequelize.transaction(); // Start a transaction

  var errors = [];

  try {
    //validate the user fields before we begin

    const errors = await validateUserFields(reqBody);

    if (errors.length > 0) {
      // Return validation errors
      console.log("user fields error", errors);
      errors.push(...errors);
    }

    // Save data into User table
    const user = await User.create(
      {
        title: reqBody.title,
        firstName: reqBody.firstname,
        lastName: reqBody.lastname,
        email: reqBody.email,
        emailVerificationToken: "",
        emailVerificationTokenExpiresAt: currentDate,
        password: hashed_password,
        phoneNumber: reqBody.phone,
        otherName: reqBody.otherName,
        gender: reqBody.genderMale ? "male" : "female",
        dateOfBirth: reqBody.dateOfBirth,
        professional: reqBody.professionalQualification,
        maritalStatus: reqBody.maritalStatus,
        highestQualification: reqBody.highestQualification,
        dateOfBirth: reqBody.dateOfBirth,
        stateOfOrigin: reqBody.stateOfOrigin,
        lgaOfOrigin: reqBody.lgaOfOrigin,
        homeTown: reqBody.homeTown,
        spouseName: reqBody.spouseName,
        spousePhoneNumber: reqBody.spousePhoneNumber,
        spouseDateOfBirth: reqBody.spouseDateOfBirth,
        nextOfKinName: reqBody.nextOfKinName,
        nextOfKinPhoneNumber: reqBody.nextOfKinPhoneNumber,
        nextOfKinRelationship: reqBody.nextOfKinRelationship,
        residentialAddress: reqBody.residentialAddress,
        stateOfResidence: reqBody.stateOfResidence,
        lgaOfResidence: reqBody.lgaOfResidence,
        employmentCategory: reqBody.employmentCategory,
        occupation: reqBody.occupation,
        employeeId: nextEmpCode,
        userId: reqBody.id,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      { transaction: t }
    );

    healthCheck++;
    console.log(healthCheck);

    // Validate spiritual profile fields
    const errorsSp = await validateProfile(reqBody);

    if (errorsSp.length > 0) {
      console.log("spiritual qualifications error:", errorsSp);
      errors.push(...errorsSp);
      // Return validation errors
    }
    // Save data into SpiritualProfile table
    const spiritualProfile = await SpiritualProfile.create(
      {
        yearBornAgain: parseInt(reqBody.yearBornAgain),
        yearWaterBaptized: parseInt(reqBody.waterBaptized),
        holyGhostBaptism: parseInt(reqBody.holyghostBaptism),
        yearJoinedSOTSM: parseInt(reqBody.joinedSotsm),
        yearBecameWorker: parseInt(reqBody.becameWorker),
        yearBecameMinister: parseInt(reqBody.becameMinister),
        yearDeaconDns: parseInt(reqBody.ordainedDcns),
        yearOrdainedPastor: parseInt(reqBody.becamePastor),
        yearSeniorPastor: parseInt(reqBody.becameSnrPastor),
        yearOrdainedElder: parseInt(reqBody.ordainedElder),
        yearBishop: parseInt(reqBody.ordainedBishop),
        lastOrdinationDate: reqBody.lastOrdinationDate,
        yearGraduatedIBCOMS: parseInt(reqBody.IBSCOMS),
        yearGraduatedWOOCOME: parseInt(reqBody.WOOCOME),
        yearGraduatedILS: parseInt(reqBody.ILS),
        yearGraduatedNGBTI: parseInt(reqBody.NGBTI),
        employeeId: nextEmpCode,
        UserId: user.id,
        createdAt: currentDate,
        updatedAt: currentDate,
      },
      { transaction: t }
    );

    healthCheck++;
    console.log(healthCheck);

    // Conditionally Logic for Full-Time/PartTime pastor or Assistant
    if (reqBody.pastor === true) {
      try {
        // Check if placeOfAssignment is empty
        if (
          !reqBody.placeOfAssignment ||
          reqBody.placeOfAssignment.trim() === ""
        ) {
          errors.push("parish codes cannot be empty");
        }

        const searchedChurch = await Church.findOne({
          where: { parishCode: reqBody.placeOfAssignment },
          transaction: t,
        });

        const churchErrors = await validateChurchData(reqBody);
        if (churchErrors.length > 0) {
          // If there are validation errors, send them to the frontend
          errors.push(...churchErrors);
          console.log("church sumitted error", churchErrors);
        }

        if (searchedChurch) {
          if (reqBody.assistant === false) {
            searchedChurch.alias = searchedChurch.placeOfAssignment;
            searchedChurch.churchState = reqBody.stateChurch;
            searchedChurch.churchLGA = reqBody.lgaChurch;
            searchedChurch.churchAddress = reqBody.placeOfAssignmentAddress;
            searchedChurch.churchCountry = reqBody.countryChurch;
            searchedChurch.dateOfEstablishment = reqBody.dateEstablished;
            searchedChurch.propertyStatus = reqBody.churchProperty;
            searchedChurch.estimatedValue = reqBody.propertyEstimatedValue;
            searchedChurch.building = reqBody.clcBuilding;
            searchedChurch.paymentFrequency = reqBody.leaseType;
            searchedChurch.pastorOffice = reqBody.pastorOffice;
            searchedChurch.employeeId = nextEmpCode;
            await searchedChurch.save({ transaction: t });

            healthCheck++;

            console.log(healthCheck);

            // const statisticsErrors = await validateStatisticsData(reqBody);
            // if (statisticsErrors.length > 0) {
            //   console.log("statistics error", statisticsErrors);
            //   errors.push(...statisticsErrors);
            // }

            //Add Statistics table
            const statistics = await Statistics.create(
              {
                numberOfAdult: parseInt(reqBody.avgadult),
                numberOfYouth: parseInt(reqBody.avgyouth),
                numberOfChildren: parseInt(reqBody.avgchildren),
                totalMembers: parseInt(reqBody.total),
                numberOfWorkers: parseInt(reqBody.totalWorkers),
                workersInTraining: parseInt(reqBody.workersInTraining),
                totalWorkers:
                  parseInt(reqBody.totalWorkers) +
                  parseInt(reqBody.workersInTraining),
                totalUnordainedLeaders: parseInt(reqBody.unordainedLeaders),
                numberOfMinisters: parseInt(reqBody.noofMinisters),
                numberOfDeaconsDeaconesses: parseInt(reqBody.noofdcns),
                numberOfPastors: parseInt(reqBody.noofpastor),
                numberOfSeniorPastors: reqBody.noofsnrpastor,
                numberOfElders: parseInt(reqBody.noofelder),
                numberOfBishops: parseInt(reqBody.noofbishops),
                parishCode: reqBody.placeOfAssignment,
                createdAt: currentDate,
                updatedAt: currentDate,
              },
              { transaction: t }
            );

            healthCheck++;
            console.log(healthCheck);
          } else if (reqBody.assistant === true) {
            const assistantErrors = await validateAssistantData(reqBody);
            if (assistantErrors.length > 0) {
              errors.push(...assistantErrors);
              console.log("assistant error", assistantErrors);
            }

            searchedChurch.assistantId = nextEmpCode;
            searchedChurch.pastorOffice = reqBody.pastorOffice;

            await searchedChurch.save({ transaction: t });
            healthCheck++;
            console.log(healthCheck);
          }
        } else {
          // Handle error: Church not found
          console.log("Church not found");
        }
      } catch (error) {
        console.error("Error in findOne query:", error);
      }
    }

    // Conditionally Logic for Professional, Professional Pastoring, or Assistant
    if (reqBody.professional === true) {
      const professionalError = await validateProfessionalData(reqBody);

      if (professionalError.length > 0) {
        errors.push(...professionalError);
        console.log("professional error", professionalError);
      }

      const department = await Department.create(
        {
          placeOfAssignment: reqBody.nameOfDepartment,
          departmentAddress: reqBody.deptAdress,
          departmentState: reqBody.stateOrg,
          departmentLGA: reqBody.lgaOrg,
          departmentCountry: reqBody.countryOrg,
          yearEmployed: reqBody.yrEmployed,
          gradeLevel: reqBody.gradeLevel,
          stepLevel: reqBody.stepLevel,
          jobTitle: reqBody.jobTitle,
          employeeId: nextEmpCode,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { transaction: t }
      );
      healthCheck++;

      console.log("this is an employee staff");
      console.log(healthCheck);

      if (reqBody.ispastor_parish === "Yes") {
        try {
          if (
            !reqBody.placeOfAssignment ||
            reqBody.placeOfAssignmentc.trim() === ""
          ) {
            console.log("Place of assignment cannot be empty");
            errors.push("Place of assignment cannot be empty");
          }

          const churchErrors = await validateEmploymentChurchData(reqBody);
          if (churchErrors.length > 0) {
            // If there are validation errors, send them to the frontend
            errors.push(...churchErrors);
            console.log("church sumitted error", churchErrors);
          }

          const searchedEmploymentChurch = await Church.findOne({
            where: { parishCode: reqBody.placeOfAssignmentc },
            transaction: t, // Pass the transaction object to the query
          });

          if (searchedEmploymentChurch) {
            if (reqBody.assitantc === false) {
              searchedEmploymentChurch.alias = searchedChurch.placeOfAssignment;
              searchedEmploymentChurch.churchState = reqBody.stateChurchc;
              searchedEmploymentChurch.churchLGA = reqBody.lgaChurchc;
              searchedEmploymentChurch.churchAddress = reqBody.churchAdressc;
              searchedEmploymentChurch.churchCountry = reqBody.countryChurchc;
              searchedEmploymentChurch.dateOfEstablishment =
                reqBody.dateEstablished;
              searchedEmploymentChurch.propertyStatus = reqBody.churchProperty;
              searchedEmploymentChurch.estimatedValue =
                reqBody.propertyEstimatedValue;
              searchedEmploymentChurch.building = reqBody.clcBuilding;
              searchedEmploymentChurch.paymentFrequency = reqBody.leaseType;
              searchedEmploymentChurch.pastorOffice =
                reqBody.careerPastoroffice;
              searchedEmploymentChurch.employeeId = nextEmpCode;
              await searchedEmploymentChurch.save({ transaction: t });
              healthCheck++;



              // Add Statistics table
              const statistics = await Statistics.create(
                {
                  numberOfAdult: parseInt(reqBody.avgadult),
                  numberOfYouth: parseInt(reqBody.avgyouth),
                  numberOfChildren: parseInt(reqBody.avgchildren),
                  totalMembers: parseInt(reqBody.total),
                  numberOfWorkers: parseInt(reqBody.totalWorkers),
                  workersInTraining: parseInt(reqBody.workersInTraining),
                  totalWorkers:
                    parseInt(reqBody.totalWorkers) +
                    parseInt(reqBody.workersInTraining),
                  totalUnordainedLeaders: parseInt(reqBody.unordainedLeaders),
                  numberOfMinisters: parseInt(reqBody.noofMinisters),
                  numberOfDeaconsDeaconesses: parseInt(reqBody.noofdcns),
                  numberOfPastors: parseInt(reqBody.noofpastor),
                  numberOfSeniorPastors: reqBody.noofsnrpastor,
                  numberOfElders: parseInt(reqBody.noofelder),
                  numberOfBishops: parseInt(reqBody.noofbishops),
                  parishCode: reqBody.placeOfAssignment,
                  createdAt: currentDate,
                  updatedAt: currentDate,
                },
                { transaction: t }
              );
              console.log("employee staff is also main parish pastor");
              console.log(healthCheck);

            } else if (reqBody.assitantc === true) {
              searchedEmploymentChurch.assistantId = nextEmpCode; //update assistant Colunm and exit
              searchedEmploymentChurch.pastorOffice = reqBody.pastorOffice;
              await searchedEmploymentChurch.save({ transaction: t });
              healthCheck++;
              console.log("employee staff is also assistant pastor");
              console.log(healthCheck);
            } else {
              console.log("Church not Found");
              res.json({
                status: "error",
                message: "Church search was not found ! please fix",
              });
            }
          }


        } catch (error) {
          console.error("Error in findOne query:", error);
          res.json({
            status: "error",
            message: `Error in findOne query:y! ${error} `,
          });
        }
      } else {
        // Handle error: Invalid scenario
        console.log("this is a career officer");
      }
    }

    await t.commit(); // Commit the transaction if all operations are successful
    console.log("returned health check -> ", healthCheck);

    const message = `Dear ${reqBody.firstname} ${reqBody.lastname}, Your enrollment code is: ${nextEmpCode}.Please use this code for accessing the SOTSM portal.Thank you."`;
    const formattedPhoneNumber = `234${reqBody.phone
      .trim()
      .replace(/\s/g, "")
      .substring(1)}`;
    sendSMS(formattedPhoneNumber, message);

    console.log(errors);
    res.json({
      status: "success",
      message: `Registrant enrollment Successful Code: ${nextEmpCode}`,
      redirectUrl: `/confirmation/${nextEmpCode}`,
    });
  } catch (err) {
    console.log(err);
    await t.rollback(); // Rollback the transaction if any error occurs
    console.log(errors);
    return res.status(400).json({ status: "error", message: errors, errors });
  }
}

module.exports = { saveUserData };

/***
 * 
 * 
 * 
 * Sequelize CLI [Node: 21.7.3, CLI: 6.6.2, ORM: 6.37.2]

migrations folder at "/home/dharmy/sotsm-portal/migrations" already exists.
New migration was created at /home/dharmy/sotsm-portal/migrations/20240502215112-create-statistics.js .
dharmy@SOTSM:~/sotsm-portal$ sudo nano /home/dharmy/sotsm-portal/migrations/20240502215112-create-statistics.js
dharmy@SOTSM:~/sotsm-portal$ npx sequelize-cli migration:generate --name create-spiritual-profile

Sequelize CLI [Node: 21.7.3, CLI: 6.6.2, ORM: 6.37.2]

migrations folder at "/home/dharmy/sotsm-portal/migrations" already exists.
New migration was created at /home/dharmy/sotsm-portal/migrations/20240502215553-create-spiritual-profile.js .
dharmy@SOTSM:~/sotsm-portal$ npx sequelize-cli migration:generate --name create-departments

Sequelize CLI [Node: 21.7.3, CLI: 6.6.2, ORM: 6.37.2]

migrations folder at "/home/dharmy/sotsm-portal/migrations" already exists.
New migration was created at /home/dharmy/sotsm-portal/migrations/20240502215638-create-departments.js .
dharmy@SOTSM:~/sotsm-portal$ npx sequelize-cli migration:generate --name create-church

Sequelize CLI [Node: 21.7.3, CLI: 6.6.2, ORM: 6.37.2]

migrations folder at "/home/dharmy/sotsm-portal/migrations" already exists.
New migration was created at /home/dharmy/sotsm-portal/migrations/20240502215653-create-church.js .
dharmy@SOTSM:~/sotsm-portal$ npx sequelize-cli migration:generate --name create-faith-table

Sequelize CLI [Node: 21.7.3, CLI: 6.6.2, ORM: 6.37.2]

migrations folder at "/home/dharmy/sotsm-portal/migrations" already exists.
New migration was created at /home/dharmy/sotsm-portal/migrations/20240502215748-create-faith-table.js .
dharmy@SOTSM:~/sotsm-portal$ npx sequelize-cli migration:generate --name create-household

Sequelize CLI [Node: 21.7.3, CLI: 6.6.2, ORM: 6.37.2]

migrations folder at "/home/dharmy/sotsm-portal/migrations" already exists.
New migration was created at /home/dharmy/sotsm-portal/migrations/20240502215805-create-household.js .
 {
  "development": {
    "username": "brvcase",
    "password": "Briefcase123",
    "database": "sotsm",
    "host": "brvcase.postgres.database.azure.com",
    "dialect": "postgres", 
    "port": 5432,
    "dialectOptions": {
        "ssl": {
            "require": false
        }
     }
  },



*/
