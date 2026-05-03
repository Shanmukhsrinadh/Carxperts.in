import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CompareBar from './components/CompareBar';
import SellModal from './components/SellModal';
import Home from './pages/Home';
import CarDetail from './pages/CarDetail';
import Compare from './pages/Compare';

export default function App() {
  const [compareList, setCompareList] = useState([]);
  const [sellOpen, setSellOpen] = useState(false);

  function handleToggleCompare(car) {
    setCompareList(prev => {
      const exists = prev.some(c => c.id === car.id);
      if (exists) return prev.filter(c => c.id !== car.id);
      if (prev.length >= 3) return prev;
      return [...prev, car];
    });
  }

  function handleRemoveCompare(id) {
    setCompareList(prev => prev.filter(c => c.id !== id));
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar onSellClick={() => setSellOpen(true)} />

        <main className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<Home compareList={compareList} onToggleCompare={handleToggleCompare} />}
            />
            <Route
              path="/car/:id"
              element={<CarDetail compareList={compareList} onToggleCompare={handleToggleCompare} />}
            />
            <Route
              path="/compare"
              element={<Compare compareList={compareList} onRemove={handleRemoveCompare} />}
            />
          </Routes>
        </main>

        <Footer onSellClick={() => setSellOpen(true)} />

        <CompareBar
          compareList={compareList}
          onRemove={handleRemoveCompare}
          onClear={() => setCompareList([])}
        />

        {sellOpen && <SellModal onClose={() => setSellOpen(false)} />}
      </div>
    </BrowserRouter>
  );
}
