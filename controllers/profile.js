const Profile = require('../models/profileModel');

const getProfile = (req, res) => {
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

const updateProfile = (req, res) => {
  Profile.findOne({
      _id: process.env.profileID
    })
    .then(PROFILE => {
      PROFILE.names = req.body.names   || PROFILE.names;
      PROFILE.about = req.body.about   || PROFILE.about;
      PROFILE.avatar = req.body.avatar || PROFILE.avatar;
      PROFILE.email = req.body.email   || PROFILE.email;
      PROFILE.save()
        .then(UPDATED => {
          res.status(200).json({
            code: 'updated',
            message: 'the profile was updated successfully'
          });
          res.send();
        })
        .catch(err => {
          res.status(500).send({
            code: 'not-updated',
            message: 'Unexpected error caught while updating profile. Either some fields have invalid data or user profile have been deleted.',
            mongoError: err
          })
        });
    })
    .catch(err => {
      res.status(400).send({
        code: 'bad-request',
        message: 'Bad request. You may not have permission to update profile.',
        mongoError: err
      });
    });
}

module.exports = {
  getProfile,
  updateProfile
}