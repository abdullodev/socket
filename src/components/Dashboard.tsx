import { useStockSocket } from "../hooks/useStockSocket";
import useStockStore from "../store/useStockStore";

const StockCard = ({ symbol }) => {
  const price = useStockStore((state) => state.stocks[symbol]);

  return (
    <div className="card">
      <h3>{symbol}</h3>
      <p className="price">${price || "Yuklanmoqda..."}</p>
    </div>
  );
};

export const Dashboard = () => {
  const myStocks = ["AAPL", "BINANCE:BTCUSDT", "TSLA", "AMZN"];
  useStockSocket(myStocks);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
      {myStocks.map((s) => (
        <StockCard key={s} symbol={s} />
      ))}
    </div>
  );
};
