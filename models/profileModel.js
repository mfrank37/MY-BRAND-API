const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
   names: {
       type: Map,
        required: true
   },
   about: {
       type: String
   },
   avatar: {
       type: String
   },
   email: {
       type: String,
       required: true
   }
});

const Profile = mongoose.model('profile', profileSchema, 'profile');

module.exports = Profile;