import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import About from './components/About/About';
import MyInfo from './components/MyInfo/MyInfo';
import Play from './components/Play/Play';
import Callback from './components/Callback';

function App() {

  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<Home/>} />
         <Route index element={<Home/>} />
         <Route path="/about" element={<About/>} />
         <Route path="/my-info" element={<MyInfo/>} />
         <Route path="/play" element={<Play/>} />
         <Route path="/callback" element={<Callback/>} />
      </Routes>
    </BrowserRouter>
  );

  
}

export default App;
