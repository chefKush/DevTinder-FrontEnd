import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/body";
import Signup from "./components/signup";
import Login from "./components/login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/profile";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              {/* children */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
