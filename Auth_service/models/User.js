const mongoose = require("mongoose");
const moment = require("moment-timezone");

function padNumber(num) {
  return num.toString().padStart(5, "0");
}

const { Schema } = mongoose;

const counterSchema = new Schema({
  _id: { type: String, required: true },
  value: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const UserSchema = new Schema({
  activeStatus: {
    type: Boolean,
    default: true,
  },
  imageUrl: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    default: "",
  },
  lastname: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
  },
  firebaseId: {
    type: String,
    required: true,
    unique: true,
  },
  timeZone: {
    type: String,
    default: "Asia/Calcutta",
  },
  firstuse: { type: Boolean, default: true },
  role: {
    type: String,
    enum: [
      "superadmin",
      "regionaladmin",
      "collegeorinstitueadmin",
      "labadmin",
      "teacher",
      "student",
      "requester",
      "tester",
      "admin",
    ],
    default: "tester",
  },
  counter: {
    type: counterSchema,
    default: { _id: "userCounter", value: 0 },
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

UserSchema.virtual("createdAtWithTZ").get(function () {
  return moment(this.createdAt).tz(this.timeZone).format();
});
UserSchema.virtual("updatedAtWithTZ").get(function () {
  return moment(this.updated_at).tz(this.timeZone).format();
});

UserSchema.pre("save", async function (next) {
  try {
    if (!this.isNew) {
      return next();
    }

    const counter = await Counter.findByIdAndUpdate(
      { _id: "userCounter" },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    );

    this.counter = { ...counter.toObject(), value: padNumber(counter.value) };

    next();
  } catch (err) {
    next(err);
  }
});

module.exports = User = mongoose.model("user", UserSchema);
