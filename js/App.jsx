import React from "react";
import Titles from "./components/Title.jsx";
import Form from "./components/Form.jsx";
import Weather from "./components/Weather.jsx";

const API_KEY = "cbc0082f79abbf0d63622dec372e8a41";

class App extends React.Component {
    state = {
            data: null,
            temperature: undefined,
            city: undefined,
            country: undefined,
            humidity: undefined,
            description: undefined,
            error: null,
    }
    getWeather = (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                if(city && country){
                    this.setState({
                        temperature: data.main.temp,
                        city: data.name,
                        country: data.sys.country,
                        description: data.weather[0].description,
                        humidity: data.main.humidity,
                        error: ""
                    });
                }else{
                    this.setState({
                        temperature: undefined,
                        city: undefined,
                        country: undefined,
                        humidity: undefined,
                        description: undefined,
                        error: "Please choose city and country!"
                    })
                }
            });
    }
    render(){
        return(
            <div>
                <Titles />
                <Form getWeather={this.getWeather}/>
                <Weather 
                    temperature={this.state.temperature}
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                    />
            </div>
        );
    }
}

export default App;