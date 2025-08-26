import { BrowserRouter, Route, Routes } from "react-router";
import NavBar from "./navBar";
import Body from "./body";
import Signup from "./signup";
import Login from "./login";

function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            {/* children */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
