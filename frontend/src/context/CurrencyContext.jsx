import { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext({
  currency: null,
});

export const useCurrency = () => useContext(CurrencyContext);

const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency');
  });

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export { CurrencyContext, CurrencyProvider };
