const express = require('express');
const router = express.Router();

const Bid = require('../models/bid'),
    Lot = require('../models/lot'),
    User = require('../models/user');

router.post('/user', async (req, res) => {
    const username = req.query.u;
    const password = req.query.p;

    try {
        const user = await User.create({ username, password });
        res.redirect(`/user/${user._id}`);
    } catch (err) {
        console.log(err);
        res.redirect('/register');
    }
});

router.get('/user/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        const userLots = await Lot.find({ sellerId: user._id }).sort({ sold: -1 });
        const userBoughtLots = await Lot.find({ buyerId: user._id, sold: true });
        res.render('user', { userLots, userBoughtLots });

    } catch (error) {
        console.log(error);
        res.send('error');
    }
});

router.get('/userRegister', async (req, res) => {
    const username = req.query.u;

    try {
        const result = await User.find({ username });
        if (result.length) {
            return res.json(false);
        } else {
            return res.json(true);
        }
    } catch (err) {
        console.log(err);
        res.send('error');
    }
});

router.get('/userLogin', async (req, res) => {
    const username = req.query.u;
    const password = req.query.p;

    try {
        const result = await User.find({ username, password });
        if (result.length) {
            return res.json(result[0]._id);
        } else {
            return res.json(false);
        }
    } catch (err) {
        console.log(err);
        res.send('error');
    }
});

module.exports = router;