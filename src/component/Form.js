import React, { Component } from 'react'

class Form extends Component {
    render() {
        return (
            <div>
                <form>
                    <input type="text"
                        placeholder="Please enter a city name..."
                        
                    />
                    <input type="submit" value="Explore" />
                </form>
            </div>
        )
    }
}

export default Form
