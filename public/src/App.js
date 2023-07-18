import { Header } from './components/Header';
import { Main } from './components/Main';

import './App.css';
import { useEffect, useState } from 'react';


function App() {

  let [likedAmount, setAmount] = useState(0);
  let [busketAmount,  setBusketAmount] = useState(0);
  let [likedAmountDisplay, setLikedAmountDisplay] = useState('');
  let [busketAmountDisplay, setBusketAmountDisplay] = useState('')

  useEffect(() => {
    if(localStorage.getItem('LikedIDs') && localStorage.getItem('addedToBusketIDs')) {
      setAmount(JSON.parse(localStorage.getItem('LikedIDs')).length)
      setBusketAmount(JSON.parse(localStorage.getItem('addedToBusketIDs')).length)
      if(likedAmount > 0) {
        setLikedAmountDisplay('flex');
      } else {
        setLikedAmountDisplay('none');
      }
      if(busketAmount > 0) {
        setBusketAmountDisplay('flex');
      } else {
        setBusketAmountDisplay('none');
      }
    } else {
      localStorage.setItem('LikedIDs', JSON.stringify([]))
      localStorage.setItem('addedToBusketIDs', JSON.stringify([]))
      setAmount(JSON.parse(localStorage.getItem('LikedIDs')).length)
      setBusketAmount(JSON.parse(localStorage.getItem('addedToBusketIDs')).length)
      setLikedAmountDisplay('none')
      setBusketAmountDisplay('none')
    }
  }, [likedAmount, likedAmountDisplay, busketAmount, busketAmountDisplay])

  return (
    <div className="App">
      <Header likedAmount={likedAmount} busketAmount={busketAmount} likedAmountDisplay={likedAmountDisplay} busketAmountDisplay={busketAmountDisplay}/>
      <Main setAmount={setAmount} setBusketAmount={setBusketAmount} />
    </div>
  );
}

export default App;