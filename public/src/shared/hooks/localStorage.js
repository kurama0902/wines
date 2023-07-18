import { useState } from "react";

export const useLocalStorage = (name) => {
  const [store, setStore] = useState(JSON.parse(localStorage.getItem(name)));

  const handleUpdateStore = (data) => {
    localStorage.setItem(name, JSON.stringify(data));
    setStore(data);
  }

  return [store, handleUpdateStore]
}