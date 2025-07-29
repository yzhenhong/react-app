/*
 * @Author: yangzhenhong
 * @Date: 2025-07-29 11:49:57
 * @LastEditors: yangzhenhong
 * @LastEditTime: 2025-07-29 13:59:08
 * @FilePath: \react-app\src\App.tsx
 * @Description: 
 */

import React from 'react';
import logo from '@/assets/images/logo.svg';
import '@/assets/styles/App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
