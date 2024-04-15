require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/users");
const port = 3000;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/posts/", postRoutes);
app.use("/users", userRoutes);

// database connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Connected to db and listening on port ${port}...`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

