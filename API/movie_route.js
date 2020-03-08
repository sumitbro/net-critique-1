const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');



//const MoviesCtrl = require("./movies.controller")

//mongoose.connect('mongodb+srv://m220student:m220password@mflix-k1wet.mongodb.net/movies?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://localhost:27017/movies', {useNewUrlParser: true, useUnifiedTopology: true});



const MovieSchema = require("../models/model");
const movieModel = mongoose.model('movie', MovieSchema);
const tv_showModel = mongoose.model('Tvshow', MovieSchema);


// let addMovie = (req, res) =>{
    let addMovie = async (req, res) =>{
        const { Title,Type } = req.body
        
        let title = await movieModel.findOne({ Title })
        if(title){
            return res.json(title);
        }
    let movie = new movieModel(req.body);
    movie.save((err, movieModel) =>{
        if(err){
            res.send(err);
        }
    //res.json(movie);
       res.send("data saved")
    })
}



let getAllMovies = (req, res) =>{
    movieModel.find({}, {_id: 0}, (err, movies) =>{ //{_id: 0} excludes ID ad reverse to only include i.e. {_id: 1} Implicitly
        if(err){
            res.send(err);
        }else{
            res.json(movies);
        }
    })
}

//sort for all movies
let getNewMovies1 = (req, res) =>{
    movieModel.find({}, {}, {sort: {Year: -1}}, (err, movies) =>{ //{_id: 0} excludes ID ad reverse to only include i.e. {_id: 1} Implicitly
        if(err){
            res.send(err);
        }else{
           
            res.json(movies);
        }
    }).limit(4)     
}
//sort for all movies
let getTopMovies1 = (req, res) =>{
    movieModel.find({}, {}, {sort: {imdbRating: -1}}, (err, movies) =>{ //{_id: 0} excludes ID ad reverse to only include i.e. {_id: 1} Implicitly
        if(err){
            res.send(err);
        }else{
            res.json(movies);
        }
    }).limit(4)     
}



//sort for new movie
let getNewMovies = (req, res) =>{
    movieModel.find({}, {}, {sort: {Year: -1}}, (err, movies) =>{ //{_id: 0} excludes ID ad reverse to only include i.e. {_id: 1} Implicitly
        if(err){
            res.send(err);
        }else{
           
            res.json(movies);
        }
    }).limit(20)     
}
//sort for top rated movie
let getTopMovies = (req, res) =>{
    movieModel.find({}, {}, {sort: {imdbRating: -1}}, (err, movies) =>{ //{_id: 0} excludes ID ad reverse to only include i.e. {_id: 1} Implicitly
        if(err){
            res.send(err);
        }else{
            res.json(movies);
        }
    }).limit(20)     
}







let getMovieByID = (req, res) =>{
    movieModel.findById((req.params.movieId), (err, data) =>{
        if(err){
            res.send(err);
        }else{
            // console.log(movie)
            res.render('data', {
                Data:data.toJSON()
                // Data: movie,
            // res.status(200).json(movie.Title)

                // Title: data.Title,
                // Year: data.Year,
                // Rated: data.Rated,
                // Released: data.Released,
                // Runtime: data.Runtime,
                // Genre: data.Genre,
                // Director: data.Director,
                // Writer: data.Writer,
                // Actors: data.Actors,
                // Plot: data.Plot,
                // Language: data.Language,
                // Country: data.Country,
                // Awards: data.Awards,
                // Poster: data.Poster,
                // Ratings1: data.Ratings[0].Source,
                // Ratings2: data.Ratings[0].Value,
                // Ratings3: data.Ratings[1].Source,
                // Ratings4: data.Ratings[1].Value,
                // Ratings5: data.Ratings[2].Source,
                // Ratings6: data.Ratings[2].Value,
                // Metascore: data.Metascore,
                // imdbRating: data.imdbRating,
                // imdbVotes: data.imdbVotes,
                // imdbID: data.imdbID,
                // Type: data.Type,
                // DVD: data.DVD,
                // BoxOffice: data.BoxOffice,
                // Production: data.Production,
                // Website: data.Website,
                // Response: data.Response,
              

            });
        
                
        }

    })
}



let updateMovie = (req, res) =>{
    movieModel.findOneAndUpdate({_id: req.params.movieId}, req.body, {new: true}, (err, updatedMovie) =>{
        if(err){
            res.send(err);
        }else{
            res.json(updatedMovie);
        }
    })
}



let deleteMovie = (req, res) =>{
    movieModel.deleteOne({_id: req.params.movieId}, (err) =>{
        if(err){
            res.send(err);
        }else{
            res.json({message: "Movie Deleted Successfully"});
        }
    })
}


function CallApi(Data, Title){
    request('http://www.omdbapi.com/?t='+Title+'&apikey=69aa4d26', {json:true},function (error, response, body) {
    
        if(error){
            Data(error);            
            return 0;
        }
        if(response.statusCode==200){
            Data(body);
        }
});
};
//for search button
let apiRetrival = async (req, res) => {
    // console.log(req.body.MovieName);
    try{
        const { MovieName } = req.body
    
        let title = await movieModel.findOne({ Title: new RegExp('^'+MovieName+'$', "i") })
        console.log(new RegExp('^'+MovieName+'$', "i"))
        if(title){
            return res.render('data', {
                Data: title.toJSON(),              
            });
        }   

        CallApi(function (data) {
            //console.log(data);
            if(data.errno=="ENOTFOUND"){
                return res.send(data);
            }
            if(data.Response!='False'){
                const movie = new movieModel(data);
                movie.save().then(() => console.log('Saved'));
                res.render('data', {
                    Data: data,              
                });
            }
            else{
                res.send('Data not found!');
            }
        }, req.body.MovieName);
    } catch(err){
        console.error(err.message)
        res.status(500).send(`Error. ${err.message}`)
    }
}



let post_comment =(req,res)=>{
    
}







// associate put, delete, and get(id)
router.route("/newMovie").post(addMovie)
router.route("/getMovies").get(getAllMovies)
router.route("/getNewMovies").get(getNewMovies)
router.route("/getTopMovies").get(getTopMovies)
 router.route("/getNewMovies1").get(getNewMovies1)
router.route("/getTopMovies1").get(getTopMovies1)
router.route("/live_comment").post(post_comment)


router
  .route("/movie/:movieId")
  .get(getMovieByID)
  .put(updateMovie)
  .delete(deleteMovie)

router.route('/api').post(apiRetrival)

module.exports = router
