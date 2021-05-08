import { Fragment } from "react";
import Main from "./components/Main/Main";
import Header from "./components/Header/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
