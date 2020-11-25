const Profile = require('../models/profileModel');

const getProfile = (req, res) => {
  console.log(process.env.profileID);
  Profile.findById(process.env.profileID)
    .then(PROFILE => {
      if (PROFILE) {
        res.status(200).send(PROFILE);
      } else {
        res.status(500).send({
          code: 'server-error',
          message: 'Could not process request due to Server Internal Error'
        });
      }
    }).catch(err => {
      res.status(400).send({
        code: 'error',
        message: 'could not retrieve profile information. Please try again.',
        mongoError: err
      })
    })
}

const updateProfile = () => {

}

module.exports = {
  getProfile,
  updateProfile
}