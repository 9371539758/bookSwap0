require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");
const startServer = async () => {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log("server is running port 3000");
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
