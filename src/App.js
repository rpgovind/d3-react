import React, { Component } from 'react';
import './App.css';
import MultilineChart from './components/MultiineChart';
import mockData from './mockdata/mockdata';

class App extends Component {
  shouldComponentUpdate() {
    return true;
  }
  render() {
    return (
      <div className="App">
        <div className="multilinechart-container">
          <MultilineChart data={mockData} height={500} width={500} />
        </div>
      </div>
    );
  }
}

export default App;
