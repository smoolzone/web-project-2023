const Joi = require('joi');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken"); 


let userSchema = new Schema(
    {
        // _id: { type: mongoose.SchemaTypes.ObjectId },
        name: {
            first: {
                type: String,
                required: true,
            },
            middle: {
                type: String,
                required: false,
            },
            last: {
                type: String,
                required: true,
            },
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        address: {
            state: {
                type: String,
                required: false,
            },
            country: {
                type: String,
                required: false,
            },
            city: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            street: {
                type: String,
                required: true,
            },
            zip: {
                type: Number,
                required: false,
            },
            houseNumber: {
                type: Number,
                required: false,
            },
            image: {
                url: {
                    type: String,
                    required: false,
                },
                alt: {
                    type: String,
                    required: false,
                },
            }
        },
        isAdmin: {
            type: Boolean
        },
        isBusiness: {
            type: Boolean
        }
    },
    {
        collection: 'users'
    }
);

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isBusiness: this.isBusiness, isAdmin: this.isAdmin }, process.env.JWTPRIVATEKEY);
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