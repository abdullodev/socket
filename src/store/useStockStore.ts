
import { create } from 'zustand';

const useStockStore = create((set) => ({
  stocks: {}, // { 'AAPL': 150.2, 'BTC': 65000 }
  updateStock: (symbol, price) => 
    set((state) => ({
      stocks: { ...state.stocks, [symbol]: price }
    })),
}));

export default useStockStore;