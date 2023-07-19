import { Header } from './components/Header';
import { Main } from './components/Main';

import { useLikedWines } from './shared/hooks/likedWines';
import { useBusketIDs } from './shared/hooks/addedToBusketIDs';
// import { useState } from 'react';

import './App.css';

function App() {
  const [likedProductsIDs, setAmount] = useLikedWines();
  const [busketProductsIDs,  setBusketAmount] = useBusketIDs();

  return (
    <div className="App">
      <Header likedAmount={likedProductsIDs?.length} busketAmount={busketProductsIDs?.length} />
      <Main likedProductsIDs={likedProductsIDs} setAmount={setAmount} busketProductsIDs={busketProductsIDs}  setBusketAmount={setBusketAmount} />
    </div>
  );
}

export default App;