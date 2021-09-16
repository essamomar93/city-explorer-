import React, { Component } from 'react'
import App from '../App.css'


class Location extends Component {
    render() {
        return (
            <div id="loc">
                <h1 id="h1">{this.props.display_name} </h1>
                <h3 id="h3">{this.props.lat}</h3>
                <h3>{this.props.lon}</h3>
                <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center= ${this.props.lat},${this.props.lon}&zoom=1-18`} alt=""></img>
            </div>
        )
    }
}

export default Location;
