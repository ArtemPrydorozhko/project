const mongoose = require('mongoose');

var lotSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    currentPrice: Number,
    category: String,
    sellerId: mongoose.SchemaTypes.ObjectId,
    seller: String,
    buyerId: mongoose.SchemaTypes.ObjectId,
    addingTime: Date,
    sold: Boolean,
    bids: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Bid'
    }]
});

module.exports = mongoose.model("Lot", lotSchema);

// Lot.create([
//     {   title: 'firsrt',
//         image: 'user_img/1.png',
//         description: 'ddsfdhgsdhghvufhuivhfuibhvi',
//         currenPrice: 15,
//         sellerId: 1,
//         bids: [{
//             userId: 1,
//             price: 15
//         }]
//     },
//     {   title: 'second',
//         image: 'user_img/1t.png',
//         description: 'ddsfdhgsdhghvufhuivhfuibhvi',
//         currenPrice: 20,
//         sellerId: 2,
//         bids: [{
//             userId: 2,
//             price: 20
//         }]
//     },
// ], (err, res) => {
//     if(err)
//         console.log(err);
// });
