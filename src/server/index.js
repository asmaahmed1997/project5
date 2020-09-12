var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const axios = require('axios');
const app = express()

const dotenv = require('dotenv')
dotenv.config()



app.use(express.static('dist'))

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));



// home route
app.get('/', function(req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})

app.get('/getCoordinates', (req, res) => {
    //console.log('hello');

    const url=(` http://api.geonames.org/findNearbyPostalCodesJSON?placename=${req.query.city}&username=${process.env.Geonames_APIKEY}`)

    //console.log(req.query.city);
    axios.get(url).then(res => {
        console.log(res);
      res.end(JSON.stringify(res.data.geonames[0]));
    })
    .catch(err => {
      res.end(JSON.stringify({err : "error"}));
    })
  })

app.get('/getWeather', (req, res) => {
  const url = `https://api.weatherbit.io/v2.0/current?lat=${req.query.lat}&lon=${req.query.long}&key=${process.env.Weatherbit_APIKEY}`;

  axios.get(url).then(res => {
    console.log(res);
    res.end(JSON.stringify(res.data[0]));
  })
  .catch(err => {
    res.end(JSON.stringify({err : "error"}));
  })
})



app.get('/getPhoto', (req, res) => {
  const url = `https://pixabay.com/api/?key=${process.env.pixabay_APIKEY}&q=${req.query.q}&image_type=photo`;
  axios.get(url).then(res => {
    console.log(res);
    res.end(JSON.stringify(res.data.hits[0]));
  })
  .catch(err => {
    res.end(JSON.stringify({err : "error"}));
  })
})

app.listen(8081,  () =>{
    console.log('Example app listening on port 8081')
})

module.exports = app;
