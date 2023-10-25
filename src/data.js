const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.post("/saveData", (req, res) => {
  const data = req.body;
  fs.writeFile("./src/data.js", JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving data");
    } else {
      res.send("Data saved successfully");
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
