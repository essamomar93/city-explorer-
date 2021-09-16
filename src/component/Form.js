import React, { Component } from 'react'
import App from '../App.css'

class Form extends Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit} id="form">
                    <input type="text"
                        placeholder="Please enter a city name..."
                        onChange={this.props.handleLocation}
                    id="input1"/>
                    <input type="submit" value="Explore" id="input2" />
                </form>
            </div>
        )
    }
}

export default Form;
