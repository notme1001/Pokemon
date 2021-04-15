const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pokelist = new Schema({
    name: String,
    url: String,
});

const users = new Schema({
    username: String,
    password: String,
});

module.exports = {
    pokelist,
    users
}
