const express = require('express')
const cors = require('cors')
const dbCOnnect = require('./dbConnect');
const dbConnect = require('./dbConnect');
const MovieRoutes = require('./routes/movies')
const app = express();

dbConnect();

app.use(express.json());
app.use(cors());

app.use("/api", MovieRoutes)

const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`App running on port ${port}`)
})