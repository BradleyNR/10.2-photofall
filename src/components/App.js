import React, { Component } from 'react';
import '../styles/App.css';
import ImageBoard from './Image.js';



class App extends Component {
  render() {
    return (
      <div className="App">
        <ImageBoard />
      </div>
    );
  }
}

export default App;
