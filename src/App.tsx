// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SteamContact from "./pages/SteamContact";
import CheckCode from "./pages/CheckCode";
import ConfirmSending from "./pages/ConfirmSending";
import './styles/global.scss';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/steamcontact" element={<SteamContact />} />
        <Route path="/checkcode" element={<CheckCode />} />
        <Route path="/confirmsending" element={<ConfirmSending />} />
      </Routes>
    </Router>
  );
};

export default App;
