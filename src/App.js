import React, { Component } from "react";
import Form from "./component/Form";
import Location from "./component/Location";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/Alert";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      type: "",
      lat: "",
      lon: "",
      showData: false,
      showAlert: false,
      error: {},
      weatherData: [],
      movieData: []
    };
  }
  handleLocation = (e) => {
    let display_name = e.target.value;
    this.setState({
      display_name: display_name,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let config = {
      method: "GET",
      baseURL: `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.display_name}&format=json`,
    };
    axios(config)
      .then((res) => {
        let responseData = res.data[0];
        this.setState({
          display_name: responseData.display_name,
          lon: responseData.lon,
          lat: responseData.lat,
          showData: true,
        });
      })
      .catch((error) =>
        this.setState({
          error: error.toString(),
          showAlert: true,
        })
      )

      .then(() => {
        let locationName = this.state.display_name.split(',')[0];
        axios.get(`http://localhost:8000/weather?city=${locationName} &key=${process.env.WEATHER_API_KEY}`)
          .then((res) => {
            console.log(res)
            this.setState({
              weatherData: res.data
            });
          })
      })

      .then(() => {
        let locationName = this.state.display_name.split(',')[0];
        axios.get(`http://localhost:8000/movie?query=${locationName}&key=${process.env.MOVIES_API_KEY}`)
          .then((res) => {
            console.log(res)
            this.setState({
              movieData: res.data
            });
          })
      })
  }
  render() {
    return (
      <div>
        <h1 id="hederId">Welcome to City explorer</h1>
        {this.state.showAlert && (
          <Alert variant="primary">{this.state.error}</Alert>
        )}
        <Form
          handleLocation={this.handleLocation}
          handleSubmit={this.handleSubmit}
        />

        {
          this.state.showData &&
          <Location
            err={this.state.error}
            display_name={this.state.display_name}
            lat={this.state.lat}
            lon={this.state.lon}
          />
        }

        {this.state.weatherData.map((item) => {
          return (
            <>
              <h3>Date :{item.date}</h3>
              <h3> Description : {item.description}</h3>
            </>
          );
        })
        }
        <br />
        <br />
        <br />

        {this.state.movieData.map((item) => {
          return (
            <>
              <h3 id="movieData">Date :{item.date}</h3>
              <h3 id="movieltitle"> title :{item.title}</h3>
              <h3> overview :{item.overview}</h3>
              <h3> vote_average :{item.vote_average}</h3>
              <h3> vote_count :{item.vote_count}</h3>
              <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} ></img>
            </>
          );
        })}

      </div>
    );
  }
}

export default App;
