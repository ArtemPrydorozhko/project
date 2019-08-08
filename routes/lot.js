const express = require('express');
const router = express.Router();
const multer = require('multer');

const Bid = require('../models/bid'),
    Lot = require('../models/lot'),
    User = require('../models/user');


// ==================
//  multer settings
// ==================
const storage = multer.diskStorage({
    destination: './user_data/img',
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + '_' + file.originalname)
    }
})
const upload = multer({ storage: storage, limits: 1000000 });

// send lots with json
router.get('/lot', async (req, res) => {
    const { search, category, sort, fmin, fmax } = req.query;

    // data for main page 
    if (Object.keys(req.query).length === 0) {
        try {
            const data = await Lot.find({ sold: false }).sort({ $natural: 1 }).limit(12);
            res.json(data);

        } catch (error) {
            console.error(error);
            res.send(error);
        }
    } else {

        let queryObject = { sold: false };
        let sortObject = {};

        if (search) {
            queryObject.title = new RegExp(search, "i");
        } else if (category) {
            queryObject.category = category
        }

        if (fmin) {
            queryObject.currentPrice = {};
            queryObject.currentPrice.$gte = Number(fmin);
        }

        if (fmax) {
            if (!queryObject.currentPrice)
                queryObject.currentPrice = {};
            queryObject.currentPrice.$lte = Number(fmax);
        }

        switch (sort) {
            case '2':
                sortObject.currentPrice = 1;
                break;
            case '3':
                sortObject.currentPrice = -1;
                break;
            case '4':
                sortObject.title = 1;
                break;
            case '5':
                sortObject.title = -1;
                break;
        }

        try {
            const data = await Lot.find(queryObject).sort(sortObject);
            // console.log(data);
            res.json(data);
        } catch (error) {
            console.error(error);
            res.send(error);
        }
    }
});


// send specific lot
router.get('/lot/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const lot = await Lot.findById(id).populate('bids').exec(); console.log(lot);
        res.render('lot', { lot });
    } catch (error) {
        console.log(error);
    }
});


// update lot with new bid
router.put('/lot/:id', async (req, res) => {
    const lotId = req.params.id;
    const { username, password, price } = req.body;
    try {
        const userId = (await User.findOne({ username, password }))._id;
        const bid = await Bid.create(
            {
                userId,
                lotId,
                price,
                user: username,
                time: Date.now()
            });

        await Lot.findByIdAndUpdate(lotId, { $push: { bids: bid._id }, currentPrice: price });
        await User.findByIdAndUpdate(userId, { $push: { bids: bid._id } });

        res.redirect(`/lot/${lotId}`);
    } catch (error) {
        console.log(error);
        res.send('error');
    }
});


// update lot to sold
router.put('/lot/:id/sell', async (req, res) => {
    const id = req.params.id;
    const lot = await Lot.findById(id).populate('bids');
    const bid = await Bid.findOne({ _id: lot.bids }).sort({ price: -1 });
    await Lot.findByIdAndUpdate(id, { $set: { sold: true, buyerId: bid.userId } });
    res.redirect(`/user/${lot.sellerId}`);
});


// delete lot
router.delete('/lot/:id', async (req, res) => {
    const id = req.params.id;
    const lot = await Lot.findByIdAndDelete(id);
    const bids = await Bid.find({ lotId: lot._id });
    Bid.deleteMany({ lotId: id }).exec();

    bids.forEach(bid => {
        User.update({ bids: bid._id }, { $pull: { bids: bid._id } });
    });

    res.redirect(`/user/${lot.sellerId}`);
});

// create new lot
router.post('/lot', upload.single('image'), async (req, res) => {
    const { title, price, description, category, username } = req.body;
    try {
        const userId = (await User.findOne({ username }))._id;
        const lot = await Lot.create({
            title,
            description,
            image: '/img/' + req.file.filename,
            currentPrice: price,
            category,
            sellerId: userId,
            seller: username,
            addingTime: Date.now(),
            sold: false
        });
        res.redirect(`/lot/${lot._id}`);
    } catch (error) {
        console.log(error);
        res.send('error');
    }
});

module.exports = router;