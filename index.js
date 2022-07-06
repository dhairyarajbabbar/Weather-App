const bodyParser = require("body-parser");
const express = require ("express");
const app = express();
const https = require ("https");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile( __dirname + "/main.html");
    
});
app.post("/", function(req, res){
    console.log(req.body.cityName);
    const querry=req.body.cityName;
    const apikey="378c43c7811a8bf57116661315fe82ba";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + querry + "&units=" + unit + "&appid=" + apikey;
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p>The weather is currently "+ weatherDescription +"</p>");
            res.write("<h1>the temperature in " + querry + " is " + temp +" degree celcius.</h1>");
            res.write("<img src=" + imageUrl + ">");
            res.send();
        });
    })

    
});

app.listen(3000, function(){
    console.log("app is running on port 3000");
});

