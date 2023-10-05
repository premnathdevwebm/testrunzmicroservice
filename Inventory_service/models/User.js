const mongoose = require("mongoose");
const { Schema } = mongoose;

//const data = require("../seed/users.json")

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userCounter: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
  },
  organization: {
    type: Schema.Types.Mixed,
  },
  department: {
    type: Schema.Types.Mixed,
  },
  inventoryIds: [
    {
      type: Schema.Types.ObjectId,
      ref: "inventory",
    },
  ],
});

module.exports = User = mongoose.model("user", UserSchema);

//User.insertMany(data)
