require("dotenv").config();
require("express-async-errors")
// express
const express = require("express");
const app = express();
// rest of packeges 
const morgan = require("morgan")
// DB 
const connectDB = require("./db/connect");
// middleware 
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(morgan("tiny"))
app.use(express.json()) // have acces to json data in req.body 

app.get("/", (req, res) => {
  res.send("the e-commerce api");
});

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000;
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
