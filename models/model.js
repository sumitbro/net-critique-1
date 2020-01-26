var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var blogSchema = new Schema({
//   title:  String, // String is shorthand for {type: String}
//   author: String,
//   body:   String,
// });

// module.exports = blogSchema;

var MovieSchema = new Schema({
  Title: String, // String is shorthand for {type: String}
  Year: Date,
  Rated: String,
  Released: String,
  Runtime: String,
  Genre: String,
  Director: String,
  Writer: String,
  Actors: String,
  Plot: String,
  Language: String,
  Country: String,
  Awards: String,
  Poster: String,
  Ratings: Array,
  Metascore: String,
  imdbRating: String,
  imdbVotes: String,
  imdbID: String,
  Type: String,
  DVD: String,
  BoxOffice: String,
  Production: String,
  Website: String,
  Response: String,
});

module.exports = MovieSchema;