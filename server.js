const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    multer = require('multer'),
    mongoose = require('mongoose'),
    html = path.join(__dirname, 'dist/');


// multer settings ---------------------------------------
const storage = multer.diskStorage({
    destination: './user_data/img',
    filename: function (req, file, cb) {
        cb(null, Date.now().toString() + file.originalname)
    }
})
const upload = multer({ storage: storage, limits: 2000000 });
// -------------------------------------------------------
// mongoose settings ------------------------------------
mongoose.connect('mongodb://localhost/au4u', { useNewUrlParser: true });

var lotSchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    currentPrice: Number,
    category: String,
    sellerId: mongoose.SchemaTypes.ObjectId,
    seller: String,
    bids: [{
        userId: mongoose.SchemaTypes.ObjectId,
        user: String,
        price: Number,
        time: {type: Date, defalut: Date.now()}
    }]
});

var Lot = mongoose.model("Lot", lotSchema);

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

// ---------------------------------------

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.resolve(__dirname, 'dist/views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'user_data')));

app.get('/', (req, res) => {
    res.sendFile(html + 'index.html');
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
        const lot = await Lot.findById(id);
        res.render('lot', {lot});
    } catch (error) {
        console.log(error);
    }
});


app.post('/lot/new', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.get('/aboutt', (req, res) => {
    res.render('about.ejs',{ee: {data: "fdfnbljufdgyudvbgvy shdsygjsdywevgwj"}});
});



app.get('*', (req, res) => {
    res.redirect('/');
});



app.listen(3000, () => {
    console.log('listening on port 3000')
})