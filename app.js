require("dotenv").config();
require("express-async-errors");
// express
const express = require("express");
const app = express();
// rest of packeges
const cookieParser = require("cookie-parser") // acces to cookies 
// dev 
// const morgan = require("morgan");
const fileUpload = require("express-fileupload")
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
// DB
const connectDB = require("./db/connect");
// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
// routers 
const authRouter = require("./routes/authRoutes")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const reviewsRouter = require("./routes/reviewRoutes")
const orderRouter = require("./routes/orderRoutes")

// dev 
// app.use(morgan("tiny"));
app.use(express.json()); // have acces to json data in req.body
app.use(cookieParser(process.env.JWT_SECRET))
app.use(express.static("./public")) 
app.use(fileUpload())
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.get("/api/v1", (req, res) => {
  res.send("the e-commerce api");
});
app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRouter)
app.use("/api/v1/product",productRouter)
app.use("/api/v1/reviews",reviewsRouter)
app.use("/api/v1/orders",orderRouter)




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
