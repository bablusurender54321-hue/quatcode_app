import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import PeoplePage from './PeoplePage';
import MomentsPage from './MomentsPage';
import VerifyCertificate from './pages/VerifyCertificate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/people" element={<PeoplePage />} />
      <Route path="/moments" element={<MomentsPage />} />
      <Route path="/verify" element={<VerifyCertificate />} />
    </Routes>
  );
}

export default App;
