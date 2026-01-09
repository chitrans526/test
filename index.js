const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * REQUIRED when behind HTTPS proxy (Render / Railway / Vercel / Nginx)
 */
app.set("trust proxy", 1);

/**
 * CORS must allow frontend + credentials
 */
app.use(
    cors({
        origin: "https://testfronend-two.vercel.app",
        credentials: true,
    })
);

app.use(cookieParser());

/**
 * SET COOKIE
 */
app.get("/set-cookie", (req, res) => {
    res.cookie("token", "abc123", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        domain: "testfronend-two.vercel.app",
        maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).send("Cookie set");
});

/**
 * READ COOKIE
 */
app.get("/get-cookie", (req, res) => {
    res.status(200).json({ token: req.cookies.token });
});

/**
 * CLEAR COOKIE
 */
app.get("/clear-cookie", (req, res) => {
    res.clearCookie("token", {
        secure: true,
        sameSite: "none",
    });

    res.status(200).send("Cookie cleared");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
