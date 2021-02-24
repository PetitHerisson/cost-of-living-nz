import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import './app.css'
import Layout from './Layout';

const App = () => {
  return (
    <Provider store={store}>
      <Layout />
    </Provider>
  );
}

export default App;
