const express = require("express");
const mongoose = require("mongoose");
const MovieModel = require("../model");
const router = express.Router();

router.get("/",async(req,res)=>{
    try {
        let query = {};
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: 'i' }; 
        }
        if (req.query.rating) {
            query.rating = req.query.rating;
        }
        if (req.query.q) {
            query.title = { $regex: req.query.q, $options: 'i' };
        }
        const sortOption = req.query.sort || 'title' ;
        const sortOrder = req.query.order === 'desc' ? -1 : 1 ;
        let movies;
        if (Object.keys(query).length === 0) {
            movies = await MovieModel.find().sort({[sortOption]:sortOrder});
        } else {
            console.log(query);
            movies = await MovieModel.find(query).sort({[sortOption]:sortOrder});
        }
        res.status(200).json({ message: "Here are the filtered movies:", movies });
    }catch(error){
        console.error("Error fetching movies:", error);
        res.status(500).send("Cannot fetch Movie");
    }
})

router.post("/",async(req,res)=>{
    try{
        const payload = req.body ;
        if(Array.isArray(payload)){
            const newMovies = await MovieModel.insertMany(payload);
            res.status(200).send(`Mutliple movie added successfully and the total no.of new movies are:${newMovies.length}`);
        }else{
            const newMovie = new MovieModel(payload);
            await newMovie.save();
            res.status(200).send(`Single movie added`);
        }
       
    }catch(error){
        res.status(500).send("Error while posting new movie");
    }

})

router.delete("/:id",async(req,res)=>{
   try{
        const {id} = req.params ;
        console.log(id);
        await MovieModel.findByIdAndDelete(id);
        res.status(200).send("movie deleted successfully");
   }catch(error){
        console.log(error);
        res.status(500).send("Error while deleting mavie");
   }
})
module.exports = router ;