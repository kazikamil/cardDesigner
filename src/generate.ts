const jwt = require("jsonwebtoken");

const secret = "3bp9Q8S3aTriQ4"; // ⚠️ 

const token = jwt.sign(
    { userId: 123, role: "admin" }, // Payload du token
    secret,
    { expiresIn: "1h" } // Expiration du token
);

console.log("🔑 Ton token JWT :", token);
