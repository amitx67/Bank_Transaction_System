const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes.js");

const app = express();

// Body parsers and cookie parsing must run before route handlers.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);

// Return JSON for malformed JSON request bodies.
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      message: "Invalid JSON request body",
      status: "failed"
    });
  }

  console.error("Express error:", err);
  return res.status(500).json({
    message: "Internal server error",
    status: "failed"
  });
});

module.exports = app;
