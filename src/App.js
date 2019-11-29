import React from 'react';
import Home from './home/index'
import logo from './logo.svg';
import './App.css';
import Sidebar from './sidebar';

function App() {
  return (
    <div className="App">
    <Sidebar></Sidebar>
    <Home></Home>

    </div>
  );
}

export default App;
