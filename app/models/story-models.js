var mongoose = require('mongoose');



var Schema = mongoose.Schema;



var StorySchema = new Schema({

  //link this story Schema to the user schema

  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  content: String,
  created: {
    type: Date,
    default: Date.now
  }


});

module.exports = mongoose.model('Story', StorySchema);