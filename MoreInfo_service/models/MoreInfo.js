const mongoose = require("mongoose");
const { Schema } = mongoose;

//const data = require("../seed/moreinfos.json")

const MoreInfoSchema = new Schema(
  {
    userId: {
      type: String,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    firstname: {
      type: String
    },
    lastname: {
      type: String
    },
    email: {
      type: String,
    },
    mobile: {
      type: String
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
