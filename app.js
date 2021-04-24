const express = require('express');//this returns a func. 
const mongoose = require('mongoose');

const blogRoutes = require('./routes/blogRoutes');

//express app
//invoke the func. to create an instance 
const app = express();

//connect to mongodb
const dbURI = 'mongodb+srv://vipul:Vipul@123@nodetut.lxxgy.mongodb.net/Nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURI,  { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))//listen for requests 
.catch((err) => {console.log('err')});

//register view engine ejs
app.set('view engine', 'ejs');



//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended : true}));


//handling get requests
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/',(req, res) => {
	res.redirect('/blogs');
});

app.get('/about', (req, res) => {
	//res.sendFile('./views/about.html', { root: __dirname});
	res.render('about', { title: 'About' });
})

// blog routes
app.use('/blogs', blogRoutes);

//404 - if none of the above page matches
//fires if code reaches here
app.use((req, res) => {
	res.status(404).render('404', { title: '404' });
});