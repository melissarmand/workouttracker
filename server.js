const express = require ("express");
const mongoose = require("mongoose");
const router = require("./routes");

const PORT = process.env.PORT || 3010;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    //useFindAndModify: false
});

app.use(router);





app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});