const express = require("express");
const app = express();
const port = process.argv[2] || 3000;
const hostname = process.argv[3] || "localhost";
const path = require("path");

app.use(express.static(path.join(__dirname, "/public")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(port, () => {
    console.log(`Server is now listening at ${hostname}:${port}`);
});