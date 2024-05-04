function validateProfile(reqBody) {
  const errors = [];

  // Validate yearBornAgain
  if (!reqBody.yearBornAgain || isNaN(parseInt(reqBody.yearBornAgain))) {
    errors.push("Year born again is required and must be a valid number.");
  }

  // Validate yearWaterBaptized
  if (!reqBody.waterBaptized || isNaN(parseInt(reqBody.waterBaptized))) {
    errors.push("Year water baptized is required and must be a valid number.");
  }

  // Validate holyGhostBaptism
  if (!reqBody.holyghostBaptism || isNaN(parseInt(reqBody.holyghostBaptism))) {
    errors.push(
      "Year of Holy Ghost baptism is required and must be a valid number."
    );
  }

  // Validate yearJoinedSOTSM
  if (!reqBody.joinedSotsm || isNaN(parseInt(reqBody.joinedSotsm))) {
    errors.push("Year joined SOTSM is required and must be a valid number.");
  }

  // Validate yearBecameWorker
  if (!reqBody.becameWorker || isNaN(parseInt(reqBody.becameWorker))) {
    errors.push("Year became worker is required and must be a valid number.");
  }

  // Validate yearBecameMinister
  if (!reqBody.becameMinister || isNaN(parseInt(reqBody.becameMinister))) {
    errors.push("Year became minister is required and must be a valid number.");
  }

  // Validate yearDeaconDns
  if (!reqBody.ordainedDcns || isNaN(parseInt(reqBody.ordainedDcns))) {
    errors.push("Year ordained deacon is required and must be a valid number.");
  }

  // Validate yearOrdainedPastor
  if (!reqBody.becamePastor || isNaN(parseInt(reqBody.becamePastor))) {
    errors.push("Year ordained pastor is required and must be a valid number.");
  }

  // Validate yearSeniorPastor
  if (!reqBody.becameSnrPastor || isNaN(parseInt(reqBody.becameSnrPastor))) {
    errors.push(
      "Year became senior pastor is required and must be a valid number."
    );
  }

  // Validate yearOrdainedElder
  if (!reqBody.ordainedElder || isNaN(parseInt(reqBody.ordainedElder))) {
    errors.push("Year ordained elder is required and must be a valid number.");
  }

  // Validate yearBishop
  if (!reqBody.ordainedBishop || isNaN(parseInt(reqBody.ordainedBishop))) {
    errors.push("Year ordained bishop is required and must be a valid number.");
  }

  // Validate lastOrdinationDate
  if (!reqBody.lastOrdinationDate) {
    errors.push("Last ordination date is required.");
  }

  // Validate yearGraduatedIBCOMS
  if (!reqBody.IBSCOMS || isNaN(parseInt(reqBody.IBSCOMS))) {
    errors.push(
      "Year graduated from IBCOMS is required and must be a valid number."
    );
  }

  // Validate yearGraduatedWOOCOME
  if (!reqBody.WOOCOME || isNaN(parseInt(reqBody.WOOCOME))) {
    errors.push(
      "Year graduated from WOOCOME is required and must be a valid number."
    );
  }

  // Validate yearGraduatedILS
  if (!reqBody.ILS || isNaN(parseInt(reqBody.ILS))) {
    errors.push(
      "Year graduated from ILS is required and must be a valid number."
    );
  }

  // Validate yearGraduatedNGBTI
  if (!reqBody.NGBTI || isNaN(parseInt(reqBody.NGBTI))) {
    errors.push(
      "Year graduated from NGBTI is required and must be a valid number."
    );
  }

  return errors;
}

module.exports = {
  validateProfile: validateProfile,
};