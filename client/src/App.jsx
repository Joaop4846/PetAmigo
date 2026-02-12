import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Pets from './pages/Pets';
import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/pets" element={<Pets />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
