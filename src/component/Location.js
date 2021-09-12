import React, { Component } from 'react'

class Location extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.display_name}</h1>
                <h3>{this.props.lat}</h3>
                <h3>{this.props.lon}</h3>
            </div>
        )
    }
}

export default Location
