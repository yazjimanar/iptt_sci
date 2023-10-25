import "./App.css";
// import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import GeneralInfoScreen from "../src/component/generalInfoScreen";

function App() {
  // <Routes>
  //   <Route path="/" element={<Navbar />}></Route> ;
  // </Routes>;
  return (
    <>
      <Navbar />
      <GeneralInfoScreen />
    </>
  );
}

export default App;
