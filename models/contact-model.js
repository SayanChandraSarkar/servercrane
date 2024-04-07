const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  company: { type: String, required: true },
  shockAbsorber: { type: Number },
  model: { type: String },
  price: { type: Number },
  spare: [
    {
      name: { type: String},
      price: { type: Number },
    },
  ],
  series: { type: String},
  originalPrice: { type: String },
  currency: { type: String},

  AdditionalAccessories: [
    {
      name: { type: String},
    },
  ],
  drawing: { type: Boolean },
  drawingFormat: { type: String },
});

const Crane = new model("Crane", contactSchema);

module.exports = Crane;
