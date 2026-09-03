const http = require("http");
const { MongoClient } = require("mongodb");

const connectionString =
    "mongodb+srv://akhunov43_db_user:rqsEfyORCqdoCQH9@cluster0.zctnulj.mongodb.net/Reja?retryWrites=true&w=majority";

MongoClient.connect(
    connectionString,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            console.log("ERROR on connection to MongoDB");
            console.log(err);
            process.exit(1);
        } else {
            console.log("MongoDB connection succeed");
            const db = client.db();

            module.exports = client;
            module.exports.db = () => db;

            // Start the server only AFTER the database connects successfully
            const app = require("./app");
            const server = http.createServer(app);
            const PORT = 3000;

            server.listen(PORT, function () {
                console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
            });
        }
    }
);