import React, { Component } from 'react';
import './App.css';
import Catalog from './example.js';

export default class App extends Component {

    static defaultProps = {
        data:[
            {"Name":111,"Price":2.5},
            {"Name":222,"Price":3.5},
        ],
        list:[]
    }

  render() {
    return (
      <div>
          <div><h1>Menu</h1></div>
          <Catalog/>
      </div>

    );
  }

}



//export default App;
