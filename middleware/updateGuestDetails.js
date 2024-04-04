const Guest = require("../models/guest");


async function updateGuestDetails(req, res, next) {
  try {

    const {
      title,
      firstname,
      lastname,
      email,
      phoneNumber,
      residential,
      city,
      state,
      country,
      identification,
      purpose,
      occupation,
      nextOfKinTitle,
      nextOfKin,
      nextOfKinSurname,
      nokEmail,
      nokTel,
      relationship,
      nokAddress,
    } = req.body;
    // Search for existing guest by email
    let existingGuest = await Guest.findOne({ email: email });

    if (existingGuest) {
      // Update existing guest with non-empty fields
      if (title) existingGuest.title = title;
      if (firstname) existingGuest.first_name = firstname;
      if (lastname) existingGuest.last_name = lastname;
      if (phoneNumber) existingGuest.phone_number = phoneNumber;
      if (residential) existingGuest.residential = residential;
      if (city) existingGuest.city = city;
      if (state) existingGuest.state = state;
      if (country) existingGuest.country = country;
      if (identification) existingGuest.identification = identification;
      if (purpose) existingGuest.purpose = purpose;
      if (occupation) existingGuest.occupation = occupation;
      if (nextOfKinTitle) existingGuest.nextOfKinTitle = nextOfKinTitle;
      if (nextOfKin) existingGuest.nextOfKin = nextOfKin;
      if (nextOfKinSurname) existingGuest.nextOfKinSurname = nextOfKinSurname;
      if (nokEmail) existingGuest.nokEmail = nokEmail;
      if (nokTel) existingGuest.nokTel = nokTel;
      if (relationship) existingGuest.relationship = relationship;
      if (nokAddress) existingGuest.nokAddress = nokAddress;

      await existingGuest.save();
    } else {
      // Create new guest
      existingGuest = new Guest({
        title,
        first_name: firstname,
        last_name: lastname,
        email,
        phone_number: phoneNumber,
        residential,
        city,
        state,
        country,
        identification,
        purpose,
        occupation,
        nextOfKinTitle,
        nextOfKin,
        nextOfKinSurname,
        nokEmail,
        nokTel,
        relationship,
        nokAddress,
      });

      await existingGuest.save();
    }
    req.updatedGuest = existingGuest;
    next();
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}


module.exports = updateGuestDetails;
