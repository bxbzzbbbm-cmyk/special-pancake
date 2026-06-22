const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running"
  });
});

app.get("/get-ram", (req, res) => {
  res.json({
    success: true,
    ramSizes: [
      512,
      1024,
      2048,
      4096,
      1024,
      1024,
      1024,
      1024
    ]
  });
});

app.listen(8080, "0.0.0.0", () => {
  console.log("Server running on http://127.0.0.1:8080");
});
