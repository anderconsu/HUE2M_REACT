import './App.css';

import React from 'react';
import GptForm from './gpt/response';
import Header from './header/header';
import Form from './main/form'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <GptForm />
        <Form />
      </main>
    </div>
  );
}

export default App;
