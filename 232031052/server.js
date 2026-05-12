const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Server is working");
});

app.get("/student", (req, res) => {
    res.json({
        id: "232031052",
        name: "Noyon",
        department: "CSE"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});