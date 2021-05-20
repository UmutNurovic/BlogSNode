const dotenv = require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
const expresSession = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const fileUpload = require('express-fileupload');
const generateDate = require('./helpers/generateDate').generateDate;
const limit = require('./helpers/limit').limit;
const methodOverride = require('method-override')
const app = express();



// parse applitacion/son
app.use(bodyParser.urlencoded({ extended: false }));

app.use(fileUpload());
//Templates
app.use(express.static('public'));
app.use(methodOverride('_method'));

// handlebars Helpers
const hbs = exphbs.create({
  helpers:{
    generateDate:generateDate,
    limit:limit
  }
});



app.engine('handlebars',hbs.engine);
app.set('view engine', 'handlebars');

// MongoDb bağlantısı
require('./config/database');


// Session 
app.use(expresSession({
    secret: process.env.SEESION_SECRET,
    resave: false,
    saveUninitialized: true,

}));


//flash - Message
app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

// Display Link Middleware
app.use((req,res,next)=>{
const {passport} = req.session;
if(passport){
    res.locals={
        displayLink:true
    }
}else{
    res.locals={
        displayLink:false
    }
}
next(); 
});


app.use(passport.initialize());
app.use(passport.session());

//Routers
const blogRouter = require('./Routers/router');
const postsRouter = require('./Routers/posts');
const adminRouter = require('./Routers/admin/admin');
const contact = require('./Routers/contact');
app.use('/', blogRouter);
app.use('/posts', postsRouter);
app.use('/admin', adminRouter);
app.use('/contact', contact);








app.listen(process.env.PORT, () => {
    console.log(`listen to port ${process.env.PORT}`);
});