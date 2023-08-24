import './App.scss';
import React from 'react';
import { Outlet } from "react-router-dom";
import Header from './components/header/header';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
