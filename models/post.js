var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema(
  {
    title: {type: String, required: true, maxlength: 100},
    timestamp: {type: Date, required: true, default: Date.now},
    message: {type: String},
    userId: [{type: Schema.Types.ObjectId, ref: 'User'}]
  }
);

// Virtual for author's URL
PostSchema
.virtual('url')
.get(function () {
  return '/post/' + this._id;
});

//Export model
module.exports = mongoose.model('post', PostSchema);

