import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from '../store';

import Todos from './Todos'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Todos />
        </div>
      </Provider>
    );
  }
}

export default App
