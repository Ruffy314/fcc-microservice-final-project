const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/static/index.html");
});

app.get("/api/timestamp/:timestring", (req, res) => {
  const str = req.params.timestring;
  let date;
  const fmtStr = "ddd, DD MMM YYYY HH:mm:ss Z";
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

app.listen(3000);
console.log("Server listens on port 3000");