const express = require("express");
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4000;


const allowedOrigins = [
  "https://gym-app-1-9kqi.onrender.com", // your frontend Render domain
  "http://localhost:3000" // optional for local testing
];


app.use(cors({
  origin: allowedOrigins,
  credentials: true // allow cookies to be sent cross-origin
}));

app.use(cookieParser());

// 🔧 Increase payload limit for images or large forms
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));


require("./DBConn/conn");


app.use("/uploads", express.static("uploads"));

const GymRoutes = require("./Routes/gym");
const MembershipRoutes = require("./Routes/membership");
const MemberRoutes = require("./Routes/member");

app.use("/auth", GymRoutes);
app.use("/plans", MembershipRoutes);
app.use("/members", MemberRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
