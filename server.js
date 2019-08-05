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
        cb(null, file.originalname)
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
    currenPrice: Number,
    category: String,
    sellerId: Number,
    seller: String,
    bids: [{
        userId: Number,
        price: Number
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

app.get('/', (req, res) => {
    res.sendFile(html + 'index.html');
});

app.get('/lot',async (req, res) => {
    const data = await Lot.find({});
    res.json(data);
});

app.get('/lotSearch/:search',async (req, res) => {
    const search = req.params.search;
    try {
        const pattern = new RegExp(search);
        const data = await Lot.find({title: pattern});
        //data.concat( await User.find({title: pattern}))

        res.json(data);
    } catch (error) {
        console.error(error);
    }
});

app.get('/lotCategory/:category',async (req, res) => {
    const category = req.params.category
    try {
        const data = await Lot.find({category});
        res.json(data);
    } catch (error) {
        console.error(error);
    }
});

app.post('/upload', upload.single('image'), (req, res) => {
    if (req.file) {
        res.json(req.file);
    }
    else throw 'error';
});

app.get('/gg', (req, res) => {
    res.json({ name: 'fff' });
});

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'user_data')));

app.get('*', (req, res) => {
    res.redirect('/');
});



app.listen(3000, () => {
    console.log('listening on port 3000')
})