const express = require("express");
const { Card } = require('./../models/card.schema');


let router = express.Router();

// GET localhost:3000/cards/

/**
 * No 1 
 * Get all Users 
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
Router.get("/my-cards", async (req, res, next)=>{

    // TODO 
    // get Id

    try {
        const data = await Card.find({ user_id: req.user.id });
        res.json(data);
    }
    catch(error) {
        return next(error);
    }

});

/**
 * No 3
 * Get user (by id)
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
 * Create user
 */
Router.post("/", async (req,res)=>{

    // TODO
    // Add isBusiyness validation
    // ...

    try {
        const data = new Card(req.body);
        res.json(data);
    }
    catch(error){
        return next(error);  
    }

});

/**
 * No 5
 * Edit user (by id)
 */
Router.put("/:id", async (req,res)=>{

    try {
        const data = Card.findByIdAndUpdate(req.params.id, { ...req.params.body } );
        res.json(data);
    }
    catch(error){
        return next(error);  
    }

});

/**
 * No 6
 * Change likes status (by id)
 */
Router.patch("/:id", async (req,res)=>{

    try {
        const data = await Card.findByIdAndUpdate(req.params.id, { isBusiness: req.params.body.isBusiness });
        res.json(data);
    }
    catch(error){
        return next(error);  
    }
    
});

/**
 * No 7
 * Delete Card (by id)
 */
Router.delete("/:id", async (req,res)=>{
    
    try {
        const data = await Card.delete(req.params.id);
        res.json(data);
    }
    catch(error){
        return next(error);  
    }

});


export default router;
