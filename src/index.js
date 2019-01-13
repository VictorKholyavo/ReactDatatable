import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

class Main extends React.Component {

  render() {
    return (
      <div>
        <h1>Users List</h1>
        <App />
        <h3>Data from: </h3>
        <a href="http://jsonplaceholder.typicode.com/users">http://jsonplaceholder.typicode.com/users</a>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
