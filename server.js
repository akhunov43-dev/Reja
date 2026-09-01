const http = require("http");
const app = require("./app");
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
      console.log("ERROR: on connection to MongoDB");
      console.log(err);
      process.exit(1);
    } else {
      console.log("MongoDB connection succeed");

     module.exports = client;
     
      const db = client.db("Reja");
      

      const server = http.createServer(app);
      const PORT = 3000;

      server.listen(PORT, function () {
        console.log(`The server is running successfully on port: ${PORT}, http://localhost:${PORT}`);
      });
    }
  }
);