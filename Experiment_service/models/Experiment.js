const mongoose = require("mongoose");
const { Schema } = mongoose;

const ExperimentSchema = new Schema({
  procedureId: {
    type: String,
    required: true,
  },
  procedurename: {
    type: String,
  },
  testobjective: {
    type: String,
  },
  dueDate:{
    type: Date,
  },
  status: {
    type: String,
    enum: ["not started", "opened", "completed"],
    default: "opened",
  },
  table: {
    type: Schema.Types.Mixed
  },
  datas: {
    type: String,
  },
  grade: {
    type: String,
  },
  remark: {
    type: String,
  },
  expresult: {
    type: String,
  },
  organization:{
    type: String,
  },
  department: {
    type: String,
  },
  labType: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  assignTo: [
    {
      userId: String,
      date: String,
    },
  ],
}, { timestamps: true });

module.exports = Experiment = mongoose.model("experiment", ExperimentSchema);
