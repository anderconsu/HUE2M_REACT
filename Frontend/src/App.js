import './App.css';

import React from 'react';
import GptForm from './gpt/response';
import Header from './header/header';
function App() {
  return (
    <div className="App">
      <Header />
      <GptForm />

    </div>
  );
}

export default App;
