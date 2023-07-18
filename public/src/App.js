import { Header } from './components/Header';
import { Main } from './components/Main';

import { useLikedWines } from './shared/hooks/likedWines';
import { useState } from 'react';

import './App.css';

function App() {
  const [likedProductsIDs, setAmount] = useLikedWines();
  const [busketAmount,  setBusketAmount] = useState(0);

  return (
    <div className="App">
      <Header likedAmount={likedProductsIDs?.length} busketAmount={busketAmount} />
      <Main likedProductsIDs={likedProductsIDs} setAmount={setAmount} setBusketAmount={setBusketAmount} />
    </div>
  );
}

export default App;