import React from 'react';
import './App.css';

// Higher-Order Component to add a border style
function withBorder(WrappedComponent) {
  return function EnhancedComponent(props) {
    return (
      <div className="hoc-border">
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// A simple component to display a message
function Message({ text }) {
  return <h1>{text}</h1>;
}

// Wrap the Message component with the HOC
const BorderedMessage = withBorder(Message);

function App() {
  return (
    <div className="app">
      <h2 className="title">Higher-Order Component Example</h2>
      <BorderedMessage text="Hello, Thana! This is an HOC example!" />
    </div>
  );
}

export default App;