var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
    },

    avatar_url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
