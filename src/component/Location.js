import React, { Component } from 'react'


class Location extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.display_name}</h1>
                <h3>{this.props.lat}</h3>
                <h3>{this.props.lon}</h3>
                <img src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center= ${this.props.lat},${this.props.lon}&zoom=1-18`} alt=""></img>
            </div>
        )
    }
}

export default Location
