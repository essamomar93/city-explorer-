import React, { Component } from 'react';
import Form from './component/Form';
import Location from './component/Location';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display_name: "",
      type: "",
      lat: "",
      lon: "",
      showData: false,
      
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
    
   
  }

  render() {
    return (
      <div>

        <Form handleLocation={this.handleLocation} handleSubmit={this.handleSubmit} />

        {
          this.state.showData &&
          <Location display_name={this.state.display_name}
            lat={this.state.lat}
            lon={this.state.lon}
            err={this.state.error}
          />

        }
     


      </div>
    )
  }
}

export default App
