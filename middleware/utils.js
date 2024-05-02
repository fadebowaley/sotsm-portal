//middleware/utils
const { Zone, Diocese, Division } = require("../models");



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



// Function to generate the next available code for Parish
async function generateNextChurchCode() {
    try {
        // Assuming you have access to the Sequelize model
        const { Church } = require('../models'); // Adjust the path as needed

        // Logic to find the highest existing code
        const maxCode = await Church.max('parishCode');

        // If no code exists, start from PR2183000001
        if (!maxCode) {
            return "PR2183000001";
        }

        // Extract the numeric part and increment it
        const prefix = maxCode.slice(0, 8); // Extracts the prefix "PR21830"
        const numericPart = parseInt(maxCode.slice(8), 10); // Extracts the numeric part after "PR21830"
        const nextNumericPart = numericPart + 1;

        // Format the next code
        const formattedCode = `${prefix}${String(nextNumericPart).padStart(5, '0')}`;

        return formattedCode;
    } catch (error) {
        // Handle errors
        console.error('Error generating church code:', error);
        throw new Error('Error generating church code');
    }
}



async function getParishNames(zoneCode, dioceseCode, divisionCode) {
  try {
    const zone = await Zone.findOne({ where: { zoneCode } });
    const diocese = await Diocese.findOne({ where: { dioceseCode } });
    const division = await Division.findOne({ where: { divisionCode } });

    const parishNames = {
      zoneName: zone ? zone.zoneName : null,
      dioceseName: diocese ? diocese.dioceseName : null,
      divisionName: division ? division.divisionName : null,
    };

    return parishNames;
  } catch (error) {
    throw new Error("Error retrieving parish names");
  }
}








// Export the function to be used as middleware
module.exports = {
    generateNextCode,
    generateNextChurchCode,
    capitalizeWords,
    deleteDirectoryRecursive,
    sendVerificationEmail
};
