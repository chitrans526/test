const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(
    cors({
        origin: ["http://localhost:3001", "https://testfronend-two.vercel.app"],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.get("/set-cookie", (req, res) => {
    res.cookie("token", "abc123", {
        httpOnly: true,   // JS can't access it
        secure: false,    // true only for HTTPS
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.send("Cookie has been set 🍪");
});

app.get("/get-cookie", (req, res) => {
    res.json({
        cookies: req.cookies
    });
});

app.get("/clear-cookie", (req, res) => {
    res.clearCookie("token");
    res.send("Cookie cleared");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
