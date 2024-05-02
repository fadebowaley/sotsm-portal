import { getDiocese } from "../controller/clcChurch";
import { generateNextCode } from "./utils";

//career information
export async function saveUserData(reqBody) {
    const nextEmpCode = generateNextCode();
    let healthCheck =  0 ;
    //const searchedChurch = await church.findOne({'parisCode': reqBody.placeOfAssignment });

    try {
        // Save data into User table
        const user = await User.create({
            title: reqBody.title,
            firstName: reqBody.firstname,
            lastName: reqBody.lastname,
            email: reqBody.email,
            emailVerificationToken: '',
            emailVerificationTokenExpiresAt:'',
            password:'password1234',
            phoneNumber: reqBody.phone,
            otherName: reqBody.otherName,
            gender: reqBody.genderMale === 'true' ? 'male':'female',
            dateOfBirth:reqBody.dateOfBirth,
            professional :reqBody.professionalQualification,
            maritalStatus: reqBody.maritalStatus,
            highestQualification: reqBody.highestQualification,
            dateOfBirth: reqBody.dateOfBirth,
            StateOfOrigin: reqBody.StateOfOrigin,
            lgaOfOrigin:reqBody.lgaOfOrigin,
            homeTown:reqBody.homeTown,
            spouseName: reqBody.spouseName,
            spousePhoneNumber: reqBody.spousePhoneNumber,
            spouseDateOfBirth: reqBody.spouseDateOfBirth,
            nextOfKinName: reqBody.nextOfKinName,
            nextOfKinPhoneNumber:reqBody.nextOfKinPhoneNumber,
            nextOfKinRelationship: reqBody.nextOfKinRelationship,
            residentialAddress: reqBody.residentialAddress,
            stateOfResidence: reqBody.stateOfResidence,
            lgaOfResidence: reqBody.lgaOfResidence,
            employmentCategory: reqBody.employmentCategory,
            occupation: reqBody.occupation,
            eployee_id: nextEmpCode,
            userId: req.user.id,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });
        healthCheck++;

         const spiritualProfile = await SpiritualProfile.create({
            yearBornAgain  : reqBody.yearBornAgain,
            yearWaterBaptized : reqBody.waterBaptized,
            holyGhostBaptism : reqBody.holyghostBaptism,
            yearJoinedSOTSM : reqBody.joinedSotsm,
            yearBecameWorker : reqBody.becameWorker,
            yearBecameMinister : reqBody.becameMinister,
            yearDeaconDns : reqBody.ordainedDcns,
            yearOrdainedPastor : reqBody.becamePastor,
            yearSeniorPastor : reqBody.becameSnrPastor,
            yearOrdainedElder : reqBody.ordainedElder,
            yearBishop : reqBody.ordainedBishop,
            lastOrdinationDate : reqBody.lastOrdinationDate,
            yearGraduatedIBCOMS : reqBody.IBSCOMS,
            yearGraduatedWOOCOME : reqBody.WOOCOME,
            yearGraduatedILS : reqBody.ILS,
            yearGraduatedNGBTI : reqBody.NGBTI,
            employeeId : nextEmpCode,
            createdAt : Date.now(),
            updatedAt : Date.now(),
         });
        healthCheck++;



        if(reqBody.pastor === true && reqBody.assistant === false) { //pastor is a full-time or part-time pastor 
        // const searchChurch = placeOfAssignment: 'PR2183400027
        const searchedChurch = await church.findOne({'parisCode': reqBody.placeOfAssignment });
        
        searchedChurch.zoneName = getZoneName
        searchedChurch.dioceseRegionName =getDioceseName
        searchedChurch.divisionName = getDivisionName

        searchedChurch.alias = searchedChurch.placeOfAssignment
        searchedChurch.churchState =  reqBody.stateChurch;
        searchedChurch.churchLGA =  reqBody.lgaChurch;
        searchedChurch.churchAddress = reqBody.placeOfAssignmentAddress;
        searchedChurch.churchCountry = reqBody.countryChurch;
        searchedChurch.dateOfEstablishment = reqBody.dateEstablished;
        searchedChurch.propertyStatus = reqBody.churchProperty;
        searchedChurch.estimatedValue = reqBody. propertyEstimatedValue;
        searchedChurch.building = reqBody.clcBuilding;
        searchedChurch.paymentFrequency = reqBody.leaseType;
        searchedChurch.leaseRentAgreement = reqBody.leaseType;
        searchedChurch.pastorOffice = reqBody.pastorOffice
        searchedChurch.employeeId = nextEmpCode;

        healthCheck++;

        //create a table= 

        //ADD VITAL STATS: creata
        const statistics = await Statistics.create({
        numberOfAdult : parseInt(reqBody.avgadult),
        numberOfYouth : parseInt(reqBody.avgyouth),
        numberOfChildren : parseInt(reqBody.avgchildren),
        totalMembers : parseInt(reqBody.total),
        numberOfWorkers : parseInt(reqBody.totalWorkers),
        workersInTraining : parseInt(reqBody.workersInTraining),
        totalWorkers  : parseInt(reqBody.totalWorkers) + parseInt(reqBody.workersInTraining),
        totalUnordainedLeaders : parseInt(reqBody.unordainedLeaders),
        numberOfMinisters : parseInt(reqBody.noofMinisters),
        numberOfDeaconsDeaconesses : parseInt(reqBody.noofdcns),
        numberOfPastors : parseInt(reqBody.noofpastor),
        numberOfSeniorPastors : reqBody.noofsnrpastor,
        numberOfElders : parseInt(reqBody.noofelder),
        numberOfBishops : parseInt(reqBody.noofbishops),
        parishCode : reqBody.placeOfAssignment,
        createdAt : Date.now(),
        updatedAt : Date.now(),
});
    } else if(reqBody.pastor === true && assistant === true){
     searchedChurch.assistantId = nextEmpCode; //update assistant Colunm and exit
     searchedChurch.pastorOffice = reqBody.pastorOffice;

    }else if(reqBody.ispastor_parish === 'Yes' &&  reqBody.assitantc === true ){ //pastor is a career officer and also assist ministerially
     searchedEmploymentChurch =await church.findOne({'parisCode': reqBody.placeOfAssignmentc });
     searchedEmploymentChurch.assistantId = nextEmpCode; //update assistant Colunm and exit
     searchedEmploymentChurch.pastorOffice = reqBody.pastorOffice;

    }else if (reqBody.ispastor_parish === 'Yes' && reqBody.assistantc === false){ //pastor is a career professional and also pastor a parish
       
        searchedEmploymentChurch =await church.findOne({'parisCode': reqBody.placeOfAssignmentc });
        searchedEmploymentChurch.zoneName = getZoneName
        searchedEmploymentChurch.dioceseRegionName =getDioceseName
        searchedEmploymentChurch.divisionName = getDivisionName
        searchedEmploymentChurch.alias = searchedChurch.placeOfAssignment
        searchedEmploymentChurch.churchState =  reqBody.stateChurchc;
        searchedEmploymentChurch.churchLGA =  reqBody.lgaChurchc;
        searchedEmploymentChurch.churchAddress = reqBody.churchAdressc;
        searchedEmploymentChurch.churchCountry = reqBody.countryChurchc;
        searchedEmploymentChurch.dateOfEstablishment = reqBody.dateEstablished;
        searchedEmploymentChurch.propertyStatus = reqBody.churchProperty;
        searchedEmploymentChurch.estimatedValue = reqBody. propertyEstimatedValue;
        searchedEmploymentChurch.building = reqBody.clcBuilding;
        searchedEmploymentChurch.paymentFrequency = reqBody.leaseType; 
        searchedEmploymentChurch.leaseRentAgreement = reqBody.leaseType;
        searchedEmploymentChurch.pastorOffice = reqBody.careerPastoroffice;

    }else if(reqBody.professional === true){ //update  if professional is selected 
        const department =  await Department.create({
        placeOfAssignment : reqBody.nameOfDepartment,
        departmentAddress : reqBody.deptAdress,
        departmentState:reqBody.stateOrg,
        departmentLGA:reqBody.lgaOrg,
        departmentCountry:reqBody.countryOrg,
        yearEmployed: reqBody.yrEmployed,
        gradeLevel :reqBody.gradeLevel,
        stepLevel:reqBody.stepLevel,
        jobTitle: reqBody.jobTitle,
        employeeId: nextEmpCode,
        createdAt:Date.now(),
        updatedAt:Date.now(),
        })

    }
     healthCheck++;

}
