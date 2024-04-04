


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
