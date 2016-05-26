var db = require('../../db');

var slotSchema = db.Schema({
  date:  Date,
  booked: { type: Boolean, default: false},
});

var Slot = db.model('Slot', slotSchema);

module.exports = Slot;
