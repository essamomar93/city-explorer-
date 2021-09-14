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
      weatherData: []
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
        axios.get(`http://${process.env.REACT_APP_BACKEND_URL}/witherData?city_name=${locationName}&lat=${this.state.lat}&lon=${this.state.lon}`)

          .then((res) => {
            console.log(res)
            this.setState({
              weatherData: res.data
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
        {this.state.weatherData.map((i) => {
          return (
            <>
              <h3>Date</h3>
              <p> {i.date}</p>
              <h3> Description</h3>
              <p>  {i.description}</p>
            </>
          );
        })}


      </div>
    );
  }
}

export default App;
