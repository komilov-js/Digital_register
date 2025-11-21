import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/login';
// import Regfister from './components/register/regfister';
import HomePage from './components/home/home';


const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Login />} />
        {/* <Route path="/register" element={<Regfister />} /> */}
      </Routes>
    </>
  );
}

const AppContainer = () => {
  return (
    <>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </>
  );
}

export default AppContainer;
