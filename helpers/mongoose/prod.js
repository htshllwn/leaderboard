const mongoDB = {
    connectionURI: process.env.MONGO_DB_URI,
    secret: process.env.APP_SECRET
}

module.exports = mongoDB;
