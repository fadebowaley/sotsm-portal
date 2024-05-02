const {
  generateNextCode,
  generateNextChurchCode,
  sendSMS,
} = require("../middleware/utils");
const {
  sequelize,
  User,
  SpiritualProfile,
  Church,
  Department,
  Statistics,
} = require("../models");

const bcrypt = require("bcrypt");
const saltRounds = 10;


async function saveUserData(req, res, reqBody) {
  const nextEmpCode = await generateNextCode();
  let healthCheck = 0;
  const currentDate = new Date().toISOString();
  const hashed_password = await bcrypt.hash("glory@2024", saltRounds);
  const t = await sequelize.transaction(); // Start a transaction

  try {
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
          // If empty, handle the error
          console.log("Place of assignment cannot be empty");
          // You might want to throw an error, return a response, or handle it in another appropriate way
          await t.rollback(); // Rollback the transaction if any error occurs
          throw new Error("Place of assignment cannot be empty");
        }

        const searchedChurch = await Church.findOne({
          where: { parishCode: reqBody.placeOfAssignment },
          transaction: t,
        });

        console.log("Search result:", searchedChurch);

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
            searchedChurch.assistantId = nextEmpCode; //update assistant Colunm and exit
            searchedChurch.pastorOffice = reqBody.pastorOffice;
            await searchedChurch.save({ transaction: t });
            healthCheck++;
            console.log("Pastor is full  pastor");
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
            // If empty, handle the error
            console.log("Place of assignment cannot be empty");
            // You might want to throw an error, return a response, or handle it in another appropriate way
            await t.rollback(); // Rollback the transaction if any error occurs
            res.json({
              status: "error",
              message: "Church name cannot be empty! please fix",
              redirectUrl: "/",
            });
          }

          const searchedEmploymentChurch = await Church.findOne({
            where: { parishCode: reqBody.placeOfAssignmentc },
            transaction: t, // Pass the transaction object to the query
          });

          console.log(searchedEmploymentChurch);

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
                redirectUrl: "/",
              });
            }
          }
        } catch (error) {
          console.error("Error in findOne query:", error);
          res.json({
            status: "error",
            message: `Error in findOne query:y! ${error} `,
            redirectUrl: "/",
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

    res.json({
      status: "success",
      message: `Registrant enrollment Successful Code: ${nextEmpCode}`,
      redirectUrl: "/confirmation",
    });
  } catch (err) {
    console.log(err);
    await t.rollback(); // Rollback the transaction if any error occurs
    res.json({
      status: "error",
      message: `Registrant enrollment error, Please attempt again`,
      redirectUrl: "/",
    });
  }
}


module.exports = { saveUserData };
