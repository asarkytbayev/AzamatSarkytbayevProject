const mongoose = require('mongoose');

let dbURI = 'mongodb://localhost/Hoope';

if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI, {
    useMongoClient: true
});

/**
 * Displays a confirmation message if connection to MongoDB is successful
 */
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbURI}`);
});

/**
 * Displays an error message if connection to MongoDB is unsuccessful
 */
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error: ', err);
});

/**
 * Checks for disconnection and display appropriate message
 */
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

/**
 * Closes connection
 * 
 * @param msg - message to display
 * @param callback - function to call
 */
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close( () => {
        console.log(`Mongoose disconnection through ${msg}`);
        callback();
    });
};

/**
 * Helper function to generate SIGINT signal
 * on Windows machines
 */
const readLine = require('readline');
if (process.platform == 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    rl.on('SIGINT', () => {
        process.emit("SIGINT");
    });
}

/**
 * Listens to nodemon restart signal
 */
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

/**
 * Listen for SIGINT emitted on termination
 */
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

/**
 * Listen for SIGTERM emitted on Heroku
 */
process.on('SIGTERM', () => {
    gracefulShutdown('Heroku app shutdown', () => {
        process.exit(0);
    });
});

require('./pitches');
require('./players');
require('./users');