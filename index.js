const express = require("express");
const app = express();
require("dotenv").config();

const cookieParser = require("cookie-parser");
const cors = require("cors");

const PORT = process.env.PORT || 4000; // fallback if .env is missing

// ✅ Middleware
app.use(cors({
  origin: true, // ✅ allow all origins temporarily
  credentials: true
}));


app.use(cookieParser());

// 🔧 Increase payload limit to handle large base64 images
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ✅ DB Connection
require("./DBConn/conn");

// ✅ Routes
const GymRoutes = require("./Routes/gym");
const MembershipRoutes = require("./Routes/membership");
const MemberRoutes = require("./Routes/member");

app.use("/auth", GymRoutes);
app.use("/plans", MembershipRoutes);
app.use("/members", MemberRoutes);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
