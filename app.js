require("dotenv").config();
require("express-async-errors");
// express
const express = require("express");
const app = express();
// rest of packeges
const cookieParser = require("cookie-parser") // acces to cookies 
const morgan = require("morgan");
// DB
const connectDB = require("./db/connect");
// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// routers 
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")

app.use(morgan("tiny"));
app.use(express.json()); // have acces to json data in req.body
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static("./public")) 

app.get("/api/v1", (req, res) => {
  res.send("the e-commerce api");
});
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
