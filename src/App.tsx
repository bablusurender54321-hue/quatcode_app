import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import VerifyCertificate from './pages/VerifyCertificate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/verify" element={<VerifyCertificate />} />
    </Routes>
  );
}

export default App;

