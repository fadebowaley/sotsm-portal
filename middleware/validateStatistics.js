// Validation function for statistics data
function validateStatisticsData(data) {
  const errors = [];

  // Validate numberOfAdult
  if (!data.numberOfAdult) {
    errors.push("Number of adult is required.");
  }

  // Validate numberOfYouth
  if (!data.numberOfYouth) {
    errors.push("Number of youth is required.");
  }

  // Validate numberOfChildren
  if (!data.numberOfChildren) {
    errors.push("Number of children is required.");
  }

  // Validate totalMembers
  if (!data.totalMembers ) {
    errors.push("Total members is required.");
  }

  // Validate numberOfWorkers
  if (!data.numberOfWorkers ) {
    errors.push("Number of workers is required.");
  }

  // Validate workersInTraining
  if (!data.workersInTraining ) {
    errors.push("Workers in training is required.");
  }

  // Validate totalUnordainedLeaders
  if (
    !data.totalUnordainedLeaders 
  ) {
    errors.push("Total unordained leaders is required.");
  }

  // Validate numberOfMinisters
  if (!data.numberOfMinisters ) {
    errors.push("Number of ministers is required.");
  }

  // Validate numberOfDeaconsDeaconesses
  if (
    !data.numberOfDeaconsDeaconesses 
  ) {
    errors.push("Number of deacons/deaconesses is required.");
  }

  // Validate numberOfPastors
  if (!data.numberOfPastors ) {
    errors.push("Number of pastors is required.");
  }

  // Validate numberOfSeniorPastors
  if (!data.numberOfSeniorPastors) {
    errors.push("Number of senior pastors is required.");
  }

  // Validate numberOfElders
  if (!data.numberOfElders ) {
    errors.push("Number of elders is required.");
  }

  // Validate numberOfBishops
  if (!data.numberOfBishops) {
    errors.push("Number of bishops is required.");
  }

  // Validate parishCode
  if (!data.parishCode ) {
    errors.push("Parish code is required.");
  }

  return errors;
}

module.exports = { validateStatisticsData: validateStatisticsData };
