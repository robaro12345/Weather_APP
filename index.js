import express from 'express'
import axios from 'axios'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config("./.env")
const app = express()
const port = process.env.PORT

function image(result){
    let rest = (result.weather[0].icon).slice(-1);
    switch(result.weather[0].main){
        case("Thunderstorm"):
            switch(rest){
                case("d"):
                    return "images/thunderstorms-day.svg";
                case("n"):
                    return "images/thunderstorms-night.svg";
            }
        case("Drizzle"):
            return "images/drizzle.svg";
        case("Rain"):
            return "images/rain.svg";
        case("Snow"):
            return "images/snow.svg";
        case("Mist"):
            return "images/mist.svg";
        case("Smoke"):
            return "images/smoke.svg";
        case("Haze"):
            switch("rest"){
                case("d"):
                    return "images/haze-day.svg";
                case("n"):
                    return "images/haze-night.svg";
            }
        case("Dust"):
            switch("rest"){
                case("d"):
                    return "images/dust-day.svg";
                case("n"):
                    return "images/dust-night.svg"
            }
        case("Fog"):
            switch("rest"){
                case("d"):
                    return "images/fog-day.svg";
                case("n"):
                    return "images/fog-night.svg"
            }
        case("Sand"):
            return "images/mist.svg";
        case("Dust"):
            return "images/mist.svg";
        case("Ash"):
            return "images/mist.svg";
        case ("Squall"):
            return "images/mist.svg";
        case("Tornado"):
            return "images/tornado.svg";
        case("Clear"):
            switch("rest"){
                case("d"):
                    return "images/clear-day.svg";
                case("n"):
                    return "images/clear-night.svg";
            }
        case("Clouds"):
            return "images/cloudy.svg";
    }
}

function formatDate(date) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    const dayOfWeek = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${dayOfWeek}, ${day} ${month} ${year}`;
}

const API_key = process.env.API_KEY

app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/",async(req,res)=>{
    const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=Panvel,IN&appid=${API_key}&units=metric`)
    const result = response.data
    var image_link = image(result);
    const date = new Date();
    const city = "Panvel";
    const countryCode = "IN";
    res.render("index.ejs",{data:result,link:image_link,date:formatDate(date),code:countryCode,city:city})
})

app.post("/submit",async(req,res)=>{
    const countryCode = req.body.Country; 
    const city = req.body.city;
    const response = await axios(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${API_key}&units=metric`)
    const result = response.data
    var image_link = image(result);
    const date = new Date();
    res.render("index.ejs",{data:result,link:image_link,date:formatDate(date),code:countryCode,city:city})
})
app.listen(port,()=>{
    console.log(`Listening to port ${port}`);
})