const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    path = require('path'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override');

const Bid = require('./models/bid'),
    Lot = require('./models/lot'),
    User = require('./models/user');

const lotRouter = require('./routes/lot'),
    userRouter = require('./routes/user');


// ==================
//  mongoose settings
// ==================
mongoose.connect('mongodb://localhost/au4u', { useNewUrlParser: true });


// ==================
//  express settings
// ==================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));
app.use(lotRouter);
app.use(userRouter);
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'user_data')));

app.set('views', path.resolve(__dirname, 'dist/views'));
app.set('view engine', 'ejs');



app.get('/', async (req, res) => {
    const lot = await Lot.find({sold: false}).sort({ $natural: -1 }).limit(12);
    res.render('index', { lot });
});


app.get('*', (req, res) => {
    res.redirect('/');
});


app.listen(3000, () => {
    console.log('listening on port 3000')
})