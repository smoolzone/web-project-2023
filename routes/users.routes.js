const express = require("express");
const { User, validate } = require("./../models/user.schema");

let Router = express.Router();

/**
 * No 1
 * Register Login
 */
Router.post("/", async (req,res)=>{

    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("Invalid email or password");

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");

        const token = user.generateAuthToken();
        res.send(token);
    } catch (error) {
        res.send("An error occured");
    }
});


/**
 * No 2
 * User Login
 */
Router.post("/login", async (req,res)=>{


    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    console.log('user', req.body);

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) { 
            return res.status(400).send("Invalid email or password");
        }

        console.log('user');

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword)
            return res.status(400).send("Invalid email or password");

        const token = user.generateAuthToken();
        res.send(token);
    } catch (error) {
        res.send("An error occured");
    }

});

/**
 * No 3 
 * Get all Users 
 */
Router.get("/", async (req, res, next)=>{

    try {
        const data = await User.find();
        res.json(data);
    }
    catch(error) {
        return next(error);
    }

});

/**
 * No 4
 * Get user (by id)
 */
Router.get("/:id", async (req,res, next) => {

    try {
        const data = await User.findById(req.params.id);
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
Router.put("/:id",(req,res)=>{

    User.findByIdAndUpdate(req.params.id, { ...req.params.body } , (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });

});

/**
 * No 6
 * Change isBusiness status (by id)
 */
Router.patch("/:id",(req,res)=>{

    User.findByIdAndUpdate(req.params.id, { isBusiness: req.params.body.isBusiness } , (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    });
    
});

/**
 * No 7
 * Delete user (by id)
 */
Router.delete("/:id", async (req,res)=>{
    
    try {
        const data = await User.delete(req.params.id);
        res.json(data);
    }
    catch(error){
        return next(error);  
    }
});

module.exports = Router;
