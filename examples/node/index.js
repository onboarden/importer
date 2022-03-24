const express = require("express");
const jwt = require("jsonwebtoken");
const addMinutes = require("date-fns/addMinutes");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));

const API_KEY = "YOUR API KEY"; // change this

app.set("view engine", "html");
app.set("views", __dirname);
app.engine("html", require("ejs").renderFile);

app.get("/", async (_req, res) => {
  const userId = "user-id-of-your-app";
  const token = jwt.sign(
    { sub: userId, exp: addMinutes(new Date(), 60).getTime() / 1000 },
    Buffer.from(API_KEY, "base64").toString(),
    { algorithm: "RS256" }
  );
  return res.json({ token });
});

app.listen(8000);
