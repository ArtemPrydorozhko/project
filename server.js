const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override'),
    html = path.join(__dirname, 'dist/'),
    Bid = require('./models/bid'),
    Lot = require('./models/lot'),
    User = require('./models/user');



// multer settings ---------------------------------------
const storage = multer.diskStorage({
    destination: './user_data/img',
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + '_' + file.originalname)
    }
})
const upload = multer({ storage: storage, limits: 2000000 });
// -------------------------------------------------------
// mongoose settings ------------------------------------
mongoose.connect('mongodb://localhost/au4u', { useNewUrlParser: true });

// ---------------------------------------

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'user_data')));

app.set('views', path.resolve(__dirname, 'dist/views'));
app.set('view engine', 'ejs');

app.get('/', async (req, res) => {
    const lot = await Lot.find({}).sort({$natural: -1}).limit(12);
    res.render('index', {lot});
});

// app.get('/lot',async (req, res) => {
//     const data = await Lot.find({});
//     res.json(data);
// });

// app.get('/lotSearch/:search', async (req, res) => {
//     const search = req.params.search;
//     try {
//         const pattern = new RegExp(search);
//         const data = await Lot.find({ title: pattern });
//         //data.concat( await User.find({title: pattern}))

//         res.json(data);
//     } catch (error) {
//         console.error(error);
//     }
// });

app.get('/lot', async (req, res) => {
    const { search, category, sort, fmin, fmax } = req.query;

    // data for main page 
    if (Object.keys(req.query).length === 0) {
        try {
            const data = await Lot.find({}).sort({ $natural: 1 }).limit(12);
            res.json(data);

        } catch (error) {
            console.error(error);
            res.send(error);
        }
    } else {

        let queryObject = {};
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

app.get('/lot/:id', async (req, res) => {
    const id = req.params.id;
    try {
        
        const lot = await Lot.findById(id).populate('bids').exec();console.log(lot);
        res.render('lot', { lot });
    } catch (error) {
        console.log(error);
    }
});

app.put('/lot', async (req, res) => {
    const { username, password, lotId, price } = req.body;
    try {
        const userId = (await User.findOne({ username, password }))._id;
        const bid =  await Bid.create(
            {
                userId,
                lotId,
                price,
                user: username,
                time: Date.now()
            });

        await Lot.findByIdAndUpdate(lotId, {$push: {bids: bid._id},currentPrice: price});
        await User.findByIdAndUpdate(userId, {$push: {bids: bid._id}});

        res.redirect(`/lot/${lotId}`);
    } catch (error) {
        console.log(error);
        res.send('error');
    }
});


app.post('/lot', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.post('/user', async (req, res) => {
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

app.get('/user/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);
        res.redirect('/');

    } catch (error) {
        console.log(error);
        res.send('error');
    }
});

app.get('/userRegister', async (req, res) => {
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

app.get('/userLogin', async (req, res) => {
    const username = req.query.u;
    const password = req.query.p;

    try {
        const result = await User.find({ username, password });
        if (result.length) {
            return res.json(true);
        } else {
            return res.json(false);
        }
    } catch (err) {
        console.log(err);
        res.send('error');
    }
});

app.get('/aboutt', (req, res) => {
    res.render('about.ejs', { ee: { data: "fdfnbljufdgyudvbgvy shdsygjsdywevgwj" } });
});



app.get('*', (req, res) => {
    res.redirect('/');
});



app.listen(3000, () => {
    console.log('listening on port 3000')
})