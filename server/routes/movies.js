const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");
const movies = require("../config/movies.json");

// GET endpoint to fetch movies
router.get("/movies", async (req, res, next) => {
  try {
    // Extracting query parameters with defaults
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "rating";
    let genre = req.query.genre || "All";

    // Genre options
    const genreOptions = [
      "Action",
      "Romance",
      "Fantasy",
      "Drama",
      "Crime",
      "Adventure",
      "Thriller",
      "Sci-fi",
      "Music",
      "Family",
    ];

    // Handling genre filter
    genre === "All"
      ? (genre = [...genreOptions])
      : (genre = req.query.genre.split(","));

    // Handling sort filter
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    // Creating sort object
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    // Querying the database
    const movies = await Movie.find({
      name: { $regex: search, $options: "i" }, // Search by movie name (case insensitive)
    })
      .where("genre")
      .in([...genre]) // Filter by genres
      .sort(sortBy) // Sort results
      .skip(page * limit) // Pagination
      .limit(limit); // Limit number of results

    // Counting total number of documents matching the query
    const total = await Movie.countDocuments({
      genre: { $in: [...genre] },
      name: { $regex: search, $options: "i" },
    });

    // Creating the response object
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      genres: genreOptions,
      movies,
    };

    // Sending response
    res.status(200).json(response);
  } catch (err) {
    console.log("Error occurred while getting request", err);
    res.status(500).json({
      error: true,
      message: "Internal server error",
    });
  }
});

// //Function to insert movies from a JSON file into the database
// const insertMovies = async () => {
//   try {
//     const docs = await Movie.insertMany(movies);
//     return Promise.resolve(docs);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// //Uncomment to run the insertion
// insertMovies().then(docs => console.log(docs)).catch(err => console.log(err));

module.exports = router;
