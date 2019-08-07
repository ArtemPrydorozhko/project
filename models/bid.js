const mongoose = require('mongoose');

var bidSchema = new mongoose.Schema({
    userId: mongoose.SchemaTypes.ObjectId,
    lotId: mongoose.SchemaTypes.ObjectId,
    user: String,
    price: Number,
    time: Date
});

module.exports = mongoose.model("Bid", bidSchema);