const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const cors = require('cors');
const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

//  HTML routess

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
  });

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");
});

// API routes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(response);
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.log(response);
    } else {
      const notes = JSON.parse(data);
      const newNote = req.body;

      newNote.id = uuidv4();

      // Adds the notes
      notes.push(newNote);

      // saves the notes back to the file
      fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
          console.log(response);
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

// Starts the server
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
