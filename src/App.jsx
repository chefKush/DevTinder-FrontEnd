import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/body";
import Signup from "./components/signup";
import Login from "./components/login";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Profile from "./components/profile";
import Feed from "./components/feed";
import Error from "./components/Error";
import Connections from "./components/Connections";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              {/* children */}
              <Route path="/" element={<Feed />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />} />
              {/* Error page route for unmatched paths */}
              <Route path="*" element={<Error message="Page not found!" />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
