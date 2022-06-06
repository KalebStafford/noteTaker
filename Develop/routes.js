const express = require("express");
const Express = express();

const path = require("path");
const fs = require("fs");

const input = require("./db/db.json")

module.exports = () => {
  Express.get("/notes", (res, req) => {
    res.sendFile(path.join("./public/notes.html"));
    console.log(res, req);
  });

  Express.get("/api/notes/:id", (req, res) => {
    res.json(JSON.parse(input)[req.params.id]);
    console.log(res, req);
  });

  Express.get("*", (res, req) => {
    res.sendFile(path.join("./public/index.html"));
    console.log(res, req);
  });

  Express.post("/api/notes", (req, res) => {
    req.body.id = JSON.parse(input).length;
    JSON.parse(input).push(req.body);
    res.json(req.body);
    console.log(res, req);
    return fs.writeFileSync("./db/db.json", JSON.stringify("\t"), () => {
      return true;
    });
  });

  fs.readFile("./db/db.json", (input) => {
    Express.get("/api/notes", (res, req) => {
      res.json(JSON.parse(input));
      console.log(res, req);
    });
  });
};
