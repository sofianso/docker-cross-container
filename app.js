const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const mongoose = require("mongoose");

const Favorite = require("./models/favorite");

const app = express();

app.use(bodyParser.json());

app.get("/favorites", async(req, res) => {
    const favorites = await Favorite.find();
    res.status(200).json({
        favorites: favorites,
    });
});

https: app.post("/favorites", async(req, res) => {
    const favName = req.body.name;
    const favType = req.body.type;
    const favUrl = req.body.url;

    try {
        if (favType !== "movie" && favType !== "character") {
            throw new Error('"type" should be "movie" or "character"!');
        }
        const existingFav = await Favorite.findOne({ name: favName });
        if (existingFav) {
            throw new Error("Favorite exists already!");
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    const favorite = new Favorite({
        name: favName,
        type: favType,
        url: favUrl,
    });

    try {
        await favorite.save();
        res
            .status(201)
            .json({ message: "Favorite saved!", favorite: favorite.toObject() });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.get("/movies", async(req, res) => {
    try {
        const response = await axios.get("https://swapi.dev/api/films");
        res.status(200).json({ movies: response.data });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.get("/people", async(req, res) => {
    try {
        const response = await axios.get("https://swapi.dev/api/people");
        res.status(200).json({ people: response.data });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

// app.listen(3000);

// Disabling mongoose to check whether or not movies can be retrieved from the API HINT = use Postman to check
// host.docker.internal is a special URL that allows Docker to communicate to host machine
// 172.17.0.2 is the IP address of my MongoDB container (it can differ when running with other systems)
// BEST SOLUTION: mongodb is now usable since it is not using the same favorites-net as the other container
mongoose.connect(
    "mongodb://mongodb:27017/swfavorites", { useNewUrlParser: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            app.listen(3000);
        }
    }
);