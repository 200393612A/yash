var mongoose = require('mongoose');

var AdvertisementSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        category: String,
        location: String,
        expireDate: Date,
        status: String
    }
);

module.exports = mongoose.model('advertisement', AdvertisementSchema);