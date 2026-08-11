// const express = require('express');

// const app = express();

// //register view engine
// app.set('view engine', 'ejs');
// // app.set('views', 'myviews');

// //listen for requests
// app.listen(3000);

// app.get('/', (req, res)=>{
//     // res.send('<p>Home page</p>');
//     // res.sendFile('./views/index.html', {root: __dirname});//express

//     //using viewjs
//     const blogs = [
//     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
//   ];
//     res.render('index', {title: 'Home', blogs});
// });

// app.get('/about', (req, res)=>{
//     // res.send('<p>About page</p>');
//     //  res.sendFile('./views/about.html', {root: __dirname});//express

//     //using viewjs
//     res.render('about', {title: 'About'});
// });

// //redirects
// // app.get('/about-us', (req, res)=>{
// //     res.redirect('/about',  {title: 'about'});
// // });

// app.get('/blogs/create',(req, res)=>{
//     res.render('create', {title: 'create a new blog'});
// });

// //404 page
// app.use((req, res)=>{
//     // res.status(404).sendFile('./views/404.html',{root:__dirname});
//     res.status(404).render('404', {title:'404'});
// });


const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


// express app
const app = express();

//connect to mongodb
const dbURI ='mongodb+srv://netninja:Test1234@cluster0.liqoqq9.mongodb.net/node-tuts3?appName=Cluster0';
mongoose.connect(dbURI)
    .then((result)=>console.log('connected to db'))
    .catch((err)=>console.log(err));


// listen for requests
app.listen(3000);

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});