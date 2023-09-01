const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.port || 3001;

app.use(express.json());

app.use(express.static("public"));

//  HTML routess
app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html");
});

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// API routes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

app.post("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const notes = JSON.parse(data);
      const newNote = req.body;

      //   Generates a unique ID for the note
      newNote.id = uuidv4();

      // Adds the notes to the array
      notes.push(newNote);

      // This saves the notes back to the file
      fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
        if (err) {
          console.error(err);
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
