import React, { Component } from 'react';
import '../styles/App.css';
import ImageBoard from './Image.js';

let seederDataForTesting = [
  {'imgURL': 'https://static.pexels.com/photos/37728/pexels-photo-37728.jpeg', 'caption': 'HOOO BUDDY WHAT A GOOD SKY'},
  {'imgURL': 'https://static.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg', 'caption': 'HOOO BUDDY WHAT A GOOD SKY'},
  {'imgURL': 'https://static.pexels.com/photos/37728/pexels-photo-37728.jpeg', 'caption': 'HOOO BUDDY WHAT A GOOD SKY'},
  {'imgURL': 'https://static.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg', 'caption': 'HOOO BUDDY WHAT A GOOD SKY'},
  {'imgURL': 'https://static.pexels.com/photos/37728/pexels-photo-37728.jpeg', 'caption': 'HOOO BUDDY WHAT A GOOD SKY'},
  {'imgURL': 'https://static.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg', 'caption': 'HOOO BUDDY WHAT A GOOD SKY'},
  {'imgURL': 'https://static.pexels.com/photos/37728/pexels-photo-37728.jpeg', 'caption': 'HOOO BUDDY WHAT A GOOD SKY'},
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <ImageBoard seederData={seederDataForTesting} />
      </div>
    );
  }
}

export default App;
