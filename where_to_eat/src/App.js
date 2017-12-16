import React, { Component } from 'react';
import './App.css';
import Catalog from './example.js';

export default class App extends Component {
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
