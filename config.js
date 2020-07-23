module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 5000,
    URL: process.env.BASE_URL || 'http://localhost',
   // MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/cmvc',
    MONGODB_URI: process.env.MONGODB_URI || "mongodb+srv://abc123:abc12345@iotviana.seajs.mongodb.net/iotviana?retryWrites=true&w=majority",
    JWT_SECRET: process.env.JWT_SECRET || 'secret1'
}