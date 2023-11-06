const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cardSchema = new Schema({
    user_id: {
        type: String
    },
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    description: {
        type: String
    },
    imageAlt: {
        type: String
    },
    state: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    zip: {
        type: Number
    },
    houseNumber: {
        type: Number
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    webUrl: {
        type: String
    },
    imageUrl: {
        type: String
    },
    likes: {
        type: Array,
        default: []
    },
    address:{}

}, {
        collection: 'cards'
    });


const Card = mongoose.model("cards", cardSchema);

module.exports = { Card };