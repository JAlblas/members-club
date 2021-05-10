var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, required: true, maxlength: 100},
    email: {type: String, required: true},
    password: {type: String},
    member: {type: String, required: true, enum: ['No', 'Member', 'Admin'], default: 'No'},
    created: {type: Date, default: Date.now}
  }
);

// Virtual for author's URL
UserSchema
.virtual('url')
.get(function () {
  return '/user/' + this._id;
});

//Export model
module.exports = mongoose.model('user', UserSchema);

