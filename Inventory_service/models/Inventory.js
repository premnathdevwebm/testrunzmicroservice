const mongoose = require("mongoose");
const { Schema } = mongoose;

const InventorySchema = new Schema(
  {
    name: String,
    type: String,
    staticip: String,
    description: String,
    imageUrl: {
      type: String,
      default: "",
    },
    modelNo: String,
    serialNo: String,
    purchasedate: String,
    guarantywaranty: String,
    organisation: String,
    department: String,
    laboratory: String,
    status: { type: Number, default: 0 },
    availability: { type: Number, default: 0 },
    usagehistory: [Date]
  },
  { timestamps: true }
);

module.exports = Inventory = mongoose.model("inventory", InventorySchema);
