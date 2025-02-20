import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ViewTemplate from "./components/ViewTemplate";
import { ToastContainer } from "react-toastify";
import EditTemplate from "./components/EditTemplate";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view/:id" element={<ViewTemplate />} />
        <Route path="/edit/:id" element={<EditTemplate />} />
      </Routes>
    </>
  );
}

export default App;
