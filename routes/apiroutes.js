const fs = require('fs');
const path = require('path');

module.exports = function(app) {
  app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const notes = JSON.parse(data);
        res.json(notes);
      }
    });
  })};
