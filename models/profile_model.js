/* jshint node: true */

var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    profileSchema = new Schema(
        {
            'team_id'     : { type: String, required: true },
            'team_domain' : { type: String, required: true },
            'channel_id'  : { type: String, required: true },
            'channel_name': { type: String, required: true },
            'user_id'     : { type: String, required: true },
            'user_name'   : { type: String, required: true },
            'postText'    : { type: String, required: true },
            'timestamp'   : { type: String, required: true },
            'skills'      : { type: Array,  required: true }
        }
    ),
    Profiles = mongoose.model('Profiles', profileSchema);

module.exports = Profiles;
