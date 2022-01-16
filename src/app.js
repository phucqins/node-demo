const path = require("path");
const express = require("express");
const hbs = require("hbs");
// const request = require("request");
const { geocode, forecast } = require("../utils/utils");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Andrew Mead",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew Mead",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text.",
    title: "Help",
    name: "Andrew Mead",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.location) {
    res.send({ error: "You must provided a location" });
    return;
  }

  geocode(req.query.location, (err, { longtitude, latitude, place } = {}) => {
    if (err) {
      res.send({
        error: err,
      });
      return;
    }
    forecast(longtitude, latitude, place, (err, data) => {
      if (err) {
        res.send({
          error: err,
        });
      }
      res.send({
        title: "This is weather page !",
        forecast: `The weather in ${data.place} is currently ${data.temperature} degrees.It feels like ${data.feelslike} degrees out.`,
        location: `${data.place}`,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    res.send({ error: "You must provided a search term" });
    return;
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Help article not found !",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Page not found !",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000.");
});
