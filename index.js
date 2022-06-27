//Библиотеки
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const errorMiddleware = require("./Middleware/error-middleware");
const dataBase = require("./Models/ConnectDB");

const PORT = process.env.Server_Port;
const app = express();

let whitelist = [
  "http://iotmirtech.ru",
  "http://128.68.56.25",
  "http://localhost:3000",
  undefined,
];

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    
  })
);

//Роутеры
const authRouter = require("./Routes/authRouter");
app.use("/auth", authRouter);
const devicesRouter = require("./Routes/devicesRouter")
app.use("/api", devicesRouter)
app.use("/img", express.static("Images"));

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await dataBase.authenticate().then(() => {
      console.log(
        "Connection with Data Base has been established successfully."
      );
    });
    await dataBase.sync();
    await app.listen(PORT, () => {
      console.log(`Server started on PORT = ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
