import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import './styles/global.scss';

// Simple test component
const TestHome = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Wedding Invitation Test</h1>
      <p>If you can see this, the basic setup is working!</p>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<TestHome />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
