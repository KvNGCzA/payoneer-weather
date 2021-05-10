import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from './components/main/Main';
import Header from './components/header/Header';

function App() {
  return (
    <Fragment>
      <ToastContainer />
      <Header />
      <Main />
    </Fragment>
  );
}

export default App;
