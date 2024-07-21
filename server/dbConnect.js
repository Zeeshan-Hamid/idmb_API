const mongoose = require('mongoose')

const dbConnect = () => {
    const connectionParams = { useNewUrlParser: true }
    mongoose.connect(
      "mongodb+srv://zeeshanhamid17:$zee03052002@cluster0.3fhdcu9.mongodb.net/idmbAPI?retryWrites=true&w=majority&appName=Cluster0"
    );

    mongoose.connection.on('connected', () => {
        console.log("connected database successfully")
    })

    mongoose.connection.on("error", (err) => {
      console.log("Error occured", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Connection disconnected")
    });

}

module.exports = dbConnect