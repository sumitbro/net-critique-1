const express=require('express');
const app= express();
const path=require('path');
 const exphbs = require('express-handlebars');
const request= require('request');
const bodyParser=require('body-parser');
const movies = require("./api/movie_route");
const io = require("socket.io")();
const Posts = require('./schema/posts');
const Comments = require('./schema/comments');
// const ejs= require ('ejs');






const port = process.env.port || 5000;

//app.set('view engine', 'ejs');


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// app.get('/feedback',function(req,res){
//     Posts.find({}, function(err, posts) {
//         if (err) {
//           console.log(err);
//         } else {
//           res.render('feedback', { posts: posts });
//         }
//     }); 
// });


// app.get('/posts/detail/:id',function(req,res){
//     Posts.findById(req.params.id, function (err, postDetail) {
//         if (err) {
//           console.log(err);
//         } else {
//             Comments.find({'postId':req.params.id}, function (err, comments) {
//                 res.render('post-detail', { postDetail: postDetail, comments: comments, postId: req.params.id });
//             });
//         }
//     }); 
// });


// io.on('connection',function(socket){
//     socket.on('comment',function(data){
//         var commentData = new Comments(data);
//         commentData.save();
//         socket.broadcast.emit('comment',data);  
//     });
 
// });
 

app.use(bodyParser.json());

//Use body parser middleware
app.use(bodyParser.urlencoded({extended: true}));

// Register api routes
app.use("/app", movies)




//The easiest way to control template/view caching is through Express' view cache setting:
app.enable('view cache');


//Set Handlebar Routes
app.get('/', function (req, res) {
    res.render('home', {
        showTitle: true,
        });
});
app.get('/movies', function (req, res) {
    request('http://localhost:5000/app/getNewMovies', {json:true}, function (error, newMov) {   
        request('http://localhost:5000/app/getTopMovies', {json:true}, function (error, topMov) {
            console.log(newMov)
            res.render('movies', {
                data: newMov,
                Top: topMov
            });
        });
    });
});



//route for new movies
app.get('/new', function (req, res) {
    request('http://localhost:5000/app/getNewMovies', {json:true}, function (error, response, body) {
    
        

res.render('new', {
    showTitle: true,
    data: body
    });
});
    
});


//route for top movies
app.get('/top', function (req, res) {
    request('http://localhost:5000/app/getTopMovies', {json:true}, function (error, response, body) {

res.render('top', {
    showTitle: true,
    data: body
    });
});
    
});
  


// app.get('/movies/new', function (req, res) {
//     res.render('new', {
//         showTitle: true,
//         });
// });

// app.get('/movies/top', function (req, res) {
//     res.render('top', {
//         showTitle: true,
//         });


app.get('/movies/best', function (req, res) {
    res.render('best', {
        showTitle: true,
        });
});

app.get('/tvshow', function (req, res) {
    res.render('tvshow', {
        showTitle: true,
        });
});

app.get('/tvshow/tv-new', function (req, res) {
    res.render('tv-new', {
        showTitle: true,
        });
});

app.get('/tvshow/tv-popular', function (req, res) {
    res.render('tv-popular', {
        showTitle: true,
        });
});

app.get('/tvshow/tv-top', function (req, res) {
    res.render('tv-top', {
        showTitle: true,
        });
});



app.get('/data', function (req, res) {
    //console.log(data);
    res.render('data', {
        Title: "The Avengers",
        Year: 2012,
        Rated: "PG-13",
        Released: "04 May 2012",
        Runtime: "143 min",
        Genre: "Action, Adventure, Sci-Fi",
        Director: "Joss Whedon",
        Writer: "Joss Whedon (screenplay), Zak Penn (story), Joss Whedon (story)",
        Actors: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth",
        Plot: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        Language: "English, Russian, Hindi",
        Country: "USA",
        Awards: "Nominated for 1 Oscar. Another 38 wins & 79 nominations.",
        Poster: "https://m.media-amazon.com/images/M/MV5BNDYxNjQyMjAtNTdiOS00NGYwLWFmNTAtNThmYjU5ZGI2YTI1XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        Ratings1: "Internet Movie Database",
        Ratings2: "8.0/10",
        Ratings3: "Rotten Tomatoes",
        Ratings4: "91%",
        Ratings5: "Metacritic",
        Ratings6: "69/100",
        Metascore: 69,
        imdbRating: 8.0,
        imdbVotes: "1,213,103",
        imdbID: "tt0848228",
        Type: "movie",
        DVD: "25 Sep 2012",
        BoxOffice: "$623,279,547",
        Production: "Walt Disney Pictures",
        Website: "N/A",
        Response: true,
    });
});


//Set Handlebar POST Routes


app.get('/H', (req, res) => res.send('Hello World!'))


//static folder
app.use(express.static(path.join(__dirname, 'public')));





app.listen(port, ()=> console.log("server listining on " + port ));






