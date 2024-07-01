import React from 'react';
import './App.css';
import CodeEditor from './components/CodeEditor';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple Code Editor</h1>
        <CodeEditor />
      </header>
    </div>
  );
}

export default App;
