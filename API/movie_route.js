const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const request = require('request');
//const MoviesCtrl = require("./movies.controller")
mongoose.connect('mongodb+srv://m220student:m220password@mflix-k1wet.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});



const MovieSchema = require("../models/model");
 const movieModel = mongoose.model('movie', MovieSchema);

let addMovie = (req, res) =>{
    let movie = new movieModel(req.body);
    movie.save((err, movieModel) =>{
        if(err){
            res.send(err);
        }
        res.json(movie);
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



let getMovieByID = (req, res) =>{
    movieModel.findById((req.params.movieId), (err, movie) =>{
        if(err){
            res.send(err);
        }else{
            res.json(movie);
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
    //console.log('error:', error); // Print the error if one occurred
    //console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //console.log('body:', body); // Print the HTML for the Google homepage.
        if(error){
            Data(error);            
            return 0;
        }
        if(response.statusCode==200){
            Data(body);
        }
});
};

let apiRetrival = (req, res) => {
    //console.log(req.body.MovieName);
    CallApi(function (data) {
    //console.log(data);
    if(data.errno=="ENOTFOUND"){
        res.send(data);
        return 0;
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
}


// associate put, delete, and get(id)
router.route("/newMovie").post(addMovie)
router.route("/getMovies").get(getAllMovies)

router
  .route("/movie/:movieId")
  .get(getMovieByID)
  .put(updateMovie)
  .delete(deleteMovie)

router.route('/api').post(apiRetrival)

module.exports = router