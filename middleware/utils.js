
//middleware/utils

// function to generate Token
function generateToken() {
  return require("crypto").randomBytes(20).toString("hex");
}


const {
  sendVerificationEmailInBackground,
  sendOrderEmailInBackground,
} = require("../worker/workers");


//send a verification email
async function sendVerificationEmail(email) {
  // Check if the user exists in the database
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User does not exist");
  }

  // Generate a new token and save it to the user's record in the database
  const token = generateToken();
  user.emailVerificationToken = token;
  user.emailVerificationTokenExpiresAt = new Date(
    Date.now() + 24 * 60 * 60 * 1000
  ); // Token expires in 24 hours
  await user.save();

  // Send the verification email to the user
  await sendVerificationEmailInBackground(token, email, user.username);
}

//Capitalized each Words
const capitalizeWords = (str) => {
  return str.toLowerCase().replace(/(^|\s)\S/g, (char) => char.toUpperCase());
};

// Function to delete a directory and its contents recursively
function deleteDirectoryRecursive(directoryPath) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach((file) => {
      const currentPath = path.join(directoryPath, file);

      if (fs.lstatSync(currentPath).isDirectory()) {
        // Recursive call for directories
        deleteDirectoryRecursive(currentPath);
        console.log(`Deleted directory: ${currentPath}`);
      } else {
        // Delete the file
        fs.unlinkSync(currentPath);
        console.log(`Deleted file: ${currentPath}`);
      }
    });

    // Remove the directory itself
    fs.rmdirSync(directoryPath);
    console.log(`Deleted directory: ${directoryPath}`);
  } else {
    console.log(`Directory does not exist: ${directoryPath}`);
  }
}


// util.js

// Function to generate the next available code for EmployeeId
function generateNextCode() {
    // Assuming you have access to the Sequelize model
    const {User} = require('../models'); // Adjust the path as needed

    // Logic to find the highest existing code
    return User.max('employeeId').then(maxCode => {

        // If no code exists, start from 21
        if (!maxCode) {
            return 'CLC000021';
        }

        // Extract the numeric part and increment it
        const numericPart = parseInt(maxCode.slice(3), 10); // Extracts the numeric part after "CLC"
        const nextNumericPart = numericPart + 1;

        // Format the next code
        const formattedCode = `CLC${String(nextNumericPart).padStart(5, '0')}`;

        return formattedCode;
    }).catch(error => {
        // Handle errors
        console.error('Error generating code:', error);
        throw new Error('Error generating code');
    });
}




/*
 *
 * ChurchTier can have up to 10 down-levels; 1,2,3,4,5,6,7,8,9,0 [Band]
 * Each Tier will have a unique name and levels for example :TierLevel  1- National, TierLevel 2 - Division
 * first 3 letter of each Teirlevel name will be used  to generate code  with random 8 Digits-nuban compliant
 * There may be many churchTier  on each TierLevel except for the first Tier
 *
 * How to create the Church Structure
 * Step 1. Create the main Church with church Data, specify its the main church
 * church data is created with churchTierCode 0 generated and fill to tier 9 [0-9]
 * practical examople:
 * id
 * churchName
 *
 * zoneName
 * diocese
 * RegionName
 * divisionName
 *
 * levelTier0
 * levelTier1
 * levelTier2
 * levelTier3
 * levelTier4
 * levelTier5
 * levelTier6
 * levelTier7
 * levelTier8
 * levelTier9
 *
 * labelTier0
 * labelTier1
 * labelTier2
 * labelTier3
 * labelTier4
 * labelTier5
 * labelTier6
 * labelTier7
 * labelTier8
 * labelTier9
 *
 * parishCode
 * zonalCode
 * dioceseCode
 * divisionCode
 * nationalCode
 *
 *
 * alias
 * status
 * hqStatus
 * building
 * churchLGA
 * employeeId
 * churchState
 * churchAddress
 * churchCountry
 * propertyStatus
 * estimatedValue
 * paymentFrequency
 * leaseRentAgreement
 * dateOfEstablishment
 *
 * createdAt
 * updatedAt
 */






// Function to generate the next available code for Parish
function genenrateChurchTierCode() {
    // Assuming you have access to the Sequelize model
    const {Church} = require('../models'); // Adjust the path as needed

    // Logic to find the highest existing code
    return Church.max('parishCode').then(maxCode => {
        // If no code exists, start from 21
        if (!maxCode) {
            return "PR2183040001";
        }
        // Extract the numeric part and increment it
        const numericPart = parseInt(maxCode.slice(3), 10); // Extracts the numeric part after "CLC"
        const nextNumericPart = numericPart + 1;
        // Format the next code
        const formattedCode = `PR${String(nextNumericPart).padStart(5, '0')}`;

        return formattedCode;
    }).catch(error => {
        // Handle errors
        console.error('Error generating parish code:', error);
        throw new Error('Error generating parish code');
    });


}







// Export the function to be used as middleware
module.exports = {
    generateNextCode,
    genenrateChurchTierCode,
    capitalizeWords,
    deleteDirectoryRecursive,
    sendVerificationEmail
};
