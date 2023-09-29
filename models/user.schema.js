const { boolean } = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken"); 


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isBusiness: this.isBusiness }, process.env.JWTPRIVATEKEY);
    return token;
};

const User = mongoose.model("user", userSchema);

const validate = (user) => {
    const schema = Joi.object({
        name: Joi.object().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        phone: Joi.string().required(),
        address: Joi.object().required(),
        image: Joi.object().optional(),
        isBusiness: Joi.boolean().required()
    });

    return schema.validate(user);
};

module.exports = { User, validate };

// export default User;