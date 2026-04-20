require('dotenv').config();
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect(process.env.ATLASDB);

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection error: '));
    mongodb.once('open' , () => {
        console.log('===> Connected to MongoDB.');
    });

    return mongodb;
}