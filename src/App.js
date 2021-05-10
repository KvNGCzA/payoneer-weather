import { Fragment } from "react";
import Main from "./components/main/Main";
import Header from "./components/header/Header";
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
