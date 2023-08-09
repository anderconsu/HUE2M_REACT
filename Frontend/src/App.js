import './App.scss';
import React from 'react';
import { Outlet,Link } from "react-router-dom";
import GptForm from './components/gpt/response';
import Header from './components/header/header';
import Form from './components/main/form'

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
