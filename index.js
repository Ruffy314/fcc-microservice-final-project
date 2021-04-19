const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(string = req.method + " " + req.path + " - " + req.ip + "("+req.originalUrl+")");
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/api/timestamp", (req, res) => {
  console.log(string = req.method + " " + req.path + " - " + req.ip + "("+req.originalUrl+")");
  const date = new Date();
  res.json({unix: date.valueOf(), utc: date.toUTCString()});
})

app.get("/api/timestamp/:timestring", (req, res) => {
  console.log(string = req.method + " " + req.path + " - " + req.ip + "("+req.originalUrl+")");
  const str = req.params.timestring;
  let date;
  if (str.match(/^\d+$/)) {
    // unix timestamp
    date = new Date(parseInt(str));
    res.json({unix: date.valueOf(), utc: date.toUTCString()});

  } else if (str.match(/^\d{4}-\d{2}-\d{2}/)) {
    //ISO format
    date = new Date(str);
    res.json({unix: date.valueOf(), utc: date.toUTCString()});

  } else {
    // invalid format
    res.json({error:"Invalid Date"});
  }
  
});

app.get("/api", (req, res) => {
  console.log(string = req.method + " " + req.path + " - " + req.ip + "("+req.originalUrl+")");
  const date = new Date();
  res.json({unix: date.valueOf(), utc: date.toUTCString()});
})

app.get("/api/:timestring", (req, res) => {
  console.log(string = req.method + " " + req.path + " - " + req.ip + "("+req.originalUrl+")");
  const str = req.params.timestring;
  let date;
  if (str.match(/^\d{5,}$/)) {
    // unix timestamp
    date = new Date(parseInt(str));
    res.json({unix: date.valueOf(), utc: date.toUTCString()});

  } else {
    //ISO format
    date = new Date(str);
    if (date === "Invalid Date") {
      res.json({error:"Invalid Date"});
    } else {
      res.json({unix: date.valueOf(), utc: date.toUTCString()});
    }
  } 
  
});

app.listen(3000);
console.log("Server listens on port 3000");