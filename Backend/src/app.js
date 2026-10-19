const express = require('express');
const connectDB = require('../src/config/database');
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
    origin: "https://frontend-y50p.onrender.com",
    credentials: true
}));

connectDB();


/* Use the all routes here */
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

module.exports = app;