const express = require("express");
const connectDB = require("./src/Config/database");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "devtinder-frontend-nu.vercel.app"],
    credentials: true,
  }),
);

app.options("*", cors());

app.use(express.json());
app.use(cookieParser());

//routes
const uploadRouter = require("./src/routes/upload");
const authRouter = require("./src/routes/auth");
const profileRouter = require("./src/routes/profile");
const requestRouter = require("./src/routes/request");
const userRouter = require("./src/routes/user");
const initializeSocket = require("./src/utils/socket");

app.use("/api", uploadRouter);
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

const server = http.createServer(app);
initializeSocket(server);

//database connect before server
connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on ` + process.env.PORT);
  });
});

app.get("/", (req, res) => {
  res.send("DevTinder Backend Working 🚀");
});
