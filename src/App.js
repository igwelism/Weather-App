import React, {Component} from 'react';
import Weather from './app_component/weather.component'
import Form from './app_component/form.component'
import DateTime from './app_component/date.component'
import 'bootstrap/dist/css/bootstrap.min.css'
import "weather-icons/css/weather-icons.css"
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      city: '',
      country: '',
      icon: '',
      main: '',
      celsius: '',
      temp_max: '',
      temp_min: '',
      description: '',
      error: false,
      timer: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.weatherIcon = {
      Thunderstorm: "wi wi-thunderstorm display-1",
      Drizzle: "wi wi-sleet display-1",
      Rain: "wi wi-storm-showers display-1",
      Snow: "wi wi-snow display-1",
      Atmosphere: "wi wi-fog display-1",
      Clear: "wi wi-day-sunny display-1",
      Clouds: "wi wi-day-fog display-1"
    }
  }

  get_WeatherIcon(rangeId) {
    switch(true) {
      case rangeId >= 200 && rangeId <= 232:
        this.setState({icon: this.weatherIcon.Thunderstorm})
        break;
      case rangeId >= 300 && rangeId <= 321:
          this.setState({icon: this.weatherIcon.Drizzle})
          break;
      case rangeId >= 500 && rangeId <= 531:
          this.setState({icon: this.weatherIcon.Rain})
          break;
      case rangeId >= 600 && rangeId <= 622:
          this.setState({icon: this.weatherIcon.Snow})
          break;
      case rangeId >= 701 && rangeId <= 781:
          this.setState({icon: this.weatherIcon.Atmosphere})
          break;
      case rangeId === 800:
          this.setState({icon: this.weatherIcon.Atmosphere})
          break;
      case rangeId >= 801 && rangeId <= 804:
          this.setState({icon: this.weatherIcon.Clouds})
          break;
      default:
          this.setState({icon: this.weatherIcon.Clouds})
    }
  }

  calCelsius(temp) {
    return Math.floor(temp - 273.15)
  }

  handleSubmit(event) {
    event.preventDefault()
    const city = event.target.elements.city.value
    const country = event.target.elements.country.value
    if(city && country) {
      fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + ',' + country + '&appid=d9928df11630649d1c40503151956514')
      .then(response => response.json())
      .then(data => {
        if(data.cod == 200) {
          this.setState({
            city: data.name + ", " + data.sys.country,
            celsius: this.calCelsius(data.main.temp),
            temp_max: this.calCelsius(data.main.temp_max),
            temp_min: this.calCelsius(data.main.temp_min),
            description: data.weather[0].description,
            error: false
          })
          this.get_WeatherIcon(data.weather[0].id)
        } else {
          this.setState({error:true})
        }
        
      })
    } else {
      this.setState({error:true})
    }
  }


  render() {
    return (
      <div className="App">
        <DateTime />
        <Form 
          handleSubmit={this.handleSubmit}
          error={this.state.error} 
        />
        <Weather 
          city={this.state.city} 
          country={this.state.country}
          tempCelsius={this.state.celsius} 
          tempMax={this.state.temp_max}
          tempMin={this.state.temp_min}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
      </div>
    )
  }
}

export default App;
