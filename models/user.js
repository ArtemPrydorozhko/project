const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    lots: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Lot'
    }],
    bids: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Bid'
    }]
});

module.exports = mongoose.model("User", userSchema);

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
