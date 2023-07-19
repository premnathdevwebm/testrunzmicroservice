const mongoose = require("mongoose");
const { Schema } = mongoose;

//const data = require("../seed/moreinfos.json")

const MoreInfoContentSchema = new Schema(
  {
    organization: {
      type: String,
    },
    department: {
      type: [String],
    },
    labtype: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = MoreInfoContent = mongoose.model("moreInfoContent", MoreInfoContentSchema);

//MoreInfo.insertMany(data)
