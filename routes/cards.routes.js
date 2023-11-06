const express = require("express");
const auth = require("../middleware/auth");
const { Card } = require('./../models/card.schema');


let Router = express.Router();

// GET localhost:3000/cards/

/**
 * No 1 
 * Get all cards 
 */
Router.get("/", async (req, res, next)=>{

    try {
        const data = await Card.find();
        res.json(data);
    }
    catch(error) {
        return next(error);
    }

});

/**
 * No 2
 * Get User Cards 
 */
Router.get("/my-cards", [auth.verifyToken], async (req, res, next)=>{

    try {
        console.log('my-cards', req.user);
        const data = await Card.find({ user_id: req.user._id });
        res.json(data);
    }
    catch(error) {
       res.json(error);
    }

});

/**
 * No 3
 * Get card (by id)
 */
Router.get("/:id", async (req,res, next) => {

    try {
        const data = await Card.findById(req.params.id);
        res.json(data);
    }
    catch(error){
        return next(error);  
    }

});

/**
 * No 4
 * Create card
 */
Router.post("/", [auth.verifyToken, auth.isBusinessUser], async (req,res)=>{

    try {
        const card = new Card(req.body);
        card.user_id = req.user._id;
        card.save();

        res.json(card);
    }
    catch(error){
        return next(error);  
    }

});

/**
 * No 5
 * Edit card (by id)
 */
Router.put("/:id", [auth.verifyToken], async (req,res)=>{

    try {
        const card = await Card.findById(req.params.id);

        if(card.user_id != req.user._id) return res.status(403).send("Cannot update card");

        const data = await Card.findByIdAndUpdate(req.params.id, { $set: { ...req.body } } );
        res.json(data);
    }
    catch(error){
        res.json(error); 
    }

});

/**
 * No 6
 * Change card likes status (by id)
 */
Router.patch("/:id", [auth.verifyToken], async (req,res)=>{

    try {
        const card = await Card.findById(req.params.id);

        console.log('card', req.user)
        const index = card.likes.findIndex(like => like == req.user._id);
        if(index >= 0) {
            card.likes.splice(index, 1);
        }
        else {
            card.likes.push(req.user._id);
        }
        card.save();
        res.json(card);
    }
    catch(error){
       res.json(error); 
    }
    
});

/**
 * No 7
 * Delete Card (by id)
 */
Router.delete("/:id", [auth.verifyToken], async (req,res)=>{
    
    try {
        const card = await Card.findById(req.params.id);
        if(!card) return res.status(400).json('No card found');
        if(req.user._id !== card.user_id && !req.user.isAdmin)  return res.status(403).json('No Permission');

        const data = await Card.deleteOne({ _id: req.params.id });
        res.json(data);
    }
    catch(error){
        return res.status(400).json(error); 
    }

});


module.exports = Router;
