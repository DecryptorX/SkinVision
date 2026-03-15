import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Detection from './pages/Detection';
import Prediction from './pages/Prediction';
import Technology from './pages/Technology';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/detect" element={<Detection />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/technology" element={<Technology />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
