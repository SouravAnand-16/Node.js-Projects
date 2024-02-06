const express = require("express");

const {SuperheroModel} = require("../databaseConnection");

const router = express.Router();

router.get("/",async(req,res)=>{
    try{
        const superhero = await SuperheroModel.find();
        res.status(200).send({superhero});
    }catch(error){
        res.status(500).send("Cannot found Superhero");
    }
});

router.post("/",async(req,res)=>{
  try{
    const {name,alias,power,role} = req.body ;
    const newSuperhero = new SuperheroModel({name,alias,power,role});
    await newSuperhero.save();
    res.status(200).send("Superhero added:");
  }catch(error){
    res.status(500).send("Error while adding superhero");
  }
})

router.patch("/:id",async(req,res)=>{
    try{
        const id = req.params.id;
        console.log(id);
        const data = req.body ;
        console.log(data);
        const updatedSuperhero = await SuperheroModel.findByIdAndUpdate(id,data);
        if(!updatedSuperhero){
            res.status(201).send("Superhero not found");
        }
        res.status(200).send("Updated superhero successfully");
    }catch(error){
        res.status(500).send("Error in updating Superhero");
    }
})

module.exports = router ;