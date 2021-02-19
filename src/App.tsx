import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import DrawChart from './DrawChart';
import store from './store'

const App = () => {
  return (
    <Provider store={store}>
      <DrawChart />
    </Provider>
  );
}

export default App;
