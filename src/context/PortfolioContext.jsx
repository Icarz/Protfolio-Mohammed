import { createContext, useContext, useState, useCallback } from 'react';
import { getPortfolioData, savePortfolioData } from '../data/portfolioData';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(() => getPortfolioData());

  const updateData = useCallback((newData) => {
    setData(newData);
    savePortfolioData(newData);
  }, []);

  return (
    <PortfolioContext.Provider value={{ data, updateData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
