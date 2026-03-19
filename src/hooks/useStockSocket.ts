import { useEffect } from 'react';
import useStockStore from '../store/useStockStore';

const API_KEY =`d6tsij1r01qhkb45f030d6tsij1r01qhkb45f03g`

export const useStockSocket = (symbols) => {
  const updateStock = useStockStore((state) => state.updateStock);

  useEffect(() => {
    const socket = new WebSocket(`wss://ws.finnhub.io?token=${API_KEY}`);

    socket.onopen = () => {
      // Bir nechta simvollarga obuna bo'lish
      symbols.forEach(symbol => {
        socket.send(JSON.stringify({ 'type': 'subscribe', 'symbol': symbol }));
      });
    };

    socket.onmessage = (event) => {
      const response = JSON.parse(event.data);
      if (response.type === 'trade') {
        // Finnhub birdaniga bir nechta trade'larni yuborishi mumkin
        console.log('response:', response);
        
        response.data.forEach(trade => {
          updateStock(trade.s, trade.p.toFixed(2));
        });
      }
    };

    return () => socket.close();
  }, [symbols, updateStock]);
};