import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SocialDept from './pages/SocialDept';
import CorpEmailizer from './pages/CorpEmailizer';
import ExcuseFactory from './pages/ExcuseFactory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/social" element={<SocialDept />} />
        <Route path="/emailizer" element={<CorpEmailizer />} />
        <Route path="/excuse" element={<ExcuseFactory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
