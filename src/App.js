import React, { Component } from 'react';
import Form from './component/Form';
import Location from './component/Location';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'


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
      error:{}
    }
  }
  handleLocation = (e) => {
    let display_name = e.target.value;
    this.setState({
      display_name: display_name
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
   
    let config = {
      method: "GET",
      baseURL: `https://api.locationiq.com/v1/autocomplete.php?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.display_name}`
    }
    axios(config).then(res => {
      let responseData = res.data[0]
      this.setState({
        display_name: responseData.display_name,
        lon: responseData.lon,
        lat: responseData.lat,
        showData: true,
      })
    })
    .catch(error=>
      this.setState({
      error: error.toString(), showAlert:true
         }))
    
  }

  render() {
    return (
      <div>
        <h1 id="hederId">Welcome to City explorer</h1>

        <Form handleLocation={this.handleLocation} handleSubmit={this.handleSubmit} />

        {
          this.state.showData &&
          <Location display_name={this.state.display_name}
            lat={this.state.lat}
            lon={this.state.lon}
            err={this.state.error}
          />

        }
        {
          this.state.showAlert &&
          <Alert variant='primary' >
            {this.state.error} 
          </Alert>
        }
        


      </div>
    )
  }
}

export default App
