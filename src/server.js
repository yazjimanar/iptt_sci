const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3005;

app.use(cors());
app.use(bodyParser.json());

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

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
