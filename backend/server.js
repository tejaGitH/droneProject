const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const missionRoutes = require("./routes/missionRoutes");

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", missionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});