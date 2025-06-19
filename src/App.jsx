import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Welcome from "./Welcome";
import Identity from "./identity";
import Name from "./name";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Name />} />
        <Route path="/home" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/identity/:id" element={<Identity />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
