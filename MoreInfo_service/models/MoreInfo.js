const mongoose = require("mongoose");
const { Schema } = mongoose;

//const data = require("../seed/moreinfos.json")

const MoreInfoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
    },
    organization: {
      type: String,
    },
    department: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    labtype: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = MoreInfo = mongoose.model("moreInfo", MoreInfoSchema);

//MoreInfo.insertMany(data)
