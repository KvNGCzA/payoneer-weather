import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Landing from './components/landing/Landing';
import Header from './components/header/Header';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Header />
      <Landing />
    </Fragment>
  );
}

export default App;
