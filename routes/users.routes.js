const express = require("express");
const { User, validate } = require("./../models/user.schema");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");

let Router = express.Router();

// localhost:3000/users/

/**
 * No 1
 * Register User
 */
Router.post("/", async (req,res)=>{

    try {
        const { error } = validate(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        // find exist user
        const existUser = await User.findOne({ email: req.body.email });
        if (existUser) return res.status(400).send("Invalid email, already exists");
        
        const user = new User(req.body);

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        res.send(user);
    } catch (error) {
        console.log('error', error);
        res.send("An error occured");
    }
});

/**
 * No 2
 * User Login
 */
Router.post("/login", async (req,res)=>{

    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) { 
            return res.status(400).send("Invalid email or password");
        }

        console.log('user', user);

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
Router.get("/", [auth.verifyToken, auth.isAdmin], async (req, res, next)=>{

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
Router.get("/:id", [auth.verifyToken], async (req,res, next) => {

    try {
        const data = await User.findById(req.params.id);
        if(!data) return res.status(400).send("User doesn't exist");

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
Router.put("/:id", [auth.verifyToken], async (req,res)=>{

    try {
        const res = await User.findByIdAndUpdate(req.params.id, { $set: { ...req.body } });
        
        res.json(res);
    }
    catch(error) {
        return res.json(error);
    };

});

/**
 * No 6
 * Change isBusiness status (by id)
 */
Router.patch("/:id", [auth.verifyToken], async (req,res)=>{

    try {
        const res = await User.findByIdAndUpdate(req.params.id, { isBusiness: req.body.isBusiness }); 
        
        res.json(data);
    }
    catch(error) {
        res.json(error);
    }
    
});

/**
 * No 7
 * Delete user (by id)
 */
Router.delete("/:id", [auth.verifyToken], async (req,res)=>{
    
    try {
        const data = await User.deleteOne({ _id: req.params.id});

        res.json(data);
    }
    catch(error){
        return res.json(error);  
    }
});

module.exports = Router;
