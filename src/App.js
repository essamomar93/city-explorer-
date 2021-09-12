import React, { Component } from 'react';
import Form from './component/Form';
import Location from './component/Location';
import axios from 'axios';

class App extends Component {
 

  render() {
    return (
      <div>
        <Form  />
        
         
          <Location 
          />
       

      </div>
    )
  }
}

export default App
