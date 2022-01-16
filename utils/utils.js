const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicGh1Y3EtaW5zIiwiYSI6ImNreWJqMm1tdDBmdjcyb2s0czU2MWF2b20ifQ.RUCZulpyCkgovquNycl82g&limit=1`;

  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to mapbox service !", undefined);
    } else if (body.features.length === 0) {
      callback("Check the address !", undefined);
    } else {
      const data = {
        longtitude: body.features[0].center[0],
        latitude: body.features[0].center[1],
        place: body.features[0].place_name,
      };
      callback(undefined, data);
    }
  });
};

const forecast = (long, lat, place, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=6c76900540116cbc9e4b3e05fa0b3249&query=${lat},${long}`;
  request({ url: url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to server !", undefined);
    } else if (body.error) {
      callback("Check the address !", undefined);
    } else {
      console.log(
        `The weather in ${place} is currently ${body.current.temperature} degrees.It feels like ${body.current.feelslike} degrees out.`
      );
      const data = {
        place: place,
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      };
      callback(undefined, data);
    }
  });
};

module.exports = { geocode, forecast };
