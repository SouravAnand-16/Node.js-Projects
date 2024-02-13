const express = require("express");
const NoteModel = require("../model/noteModel");
const auth = require("../middleware/auth");

const NoteRouter = express.Router();

NoteRouter.post("/create",auth,async(req,res)=>{
    try{
        console.log(req.body);
        const note = new NoteModel(req.body);
        await note.save();
        res.status(201).send({"msg":"New notes created..."});
    }catch(error){
        res.status(500).send({"msg":error.message});
    }
});

module.exports = NoteRouter ;