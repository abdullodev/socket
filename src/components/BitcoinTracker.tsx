import React, { useState, useEffect } from "react";

const BitcoinTracker = () => {
  const [price, setPrice] = useState<any>(null);
  const [status, setStatus] = useState<string>("Ulanmoqda...");
  const [prevPrice, setPrevPrice] = useState<any>(null);

  useEffect(() => {
    // 1. Soket ulanishini yaratish
    const socket = new WebSocket(
      "wss://stream.binance.com:9443/ws/btcusdt@trade",
    );

    // 2. Ulanish muvaffaqiyatli bo'lsa
    socket.onopen = () => {
      setStatus("Onlayn");
      console.log("Binance soketiga ulandik");
    };

    // 3. Yangi ma'lumot kelganda
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("data", data);

      const currentPrice = parseFloat(data.p).toFixed(2); // 'p' - bu price (narx)

      setPrice((oldPrice: any) => {
        setPrevPrice(oldPrice); // Oldingi narxni saqlab qo'yamiz
        return currentPrice;
      });
    };

    // 4. Xatolik bo'lsa
    socket.onerror = (error) => {
      setStatus("Xatolik yuz berdi");
      console.error("Socket xatosi:", error);
    };

    // 5. Aloqa uzilsa
    socket.onclose = () => {
      setStatus("Aloqa uzildi. Qayta ulanmoqda...");
    };

    // 6. Komponent o'chirilganda (Cleanup)
    return () => {
      socket.close();
    };
  }, []);

  // Narx ko'tarilgan yoki tushganini aniqlash (vizual effekt uchun)
  const priceColor = price >= prevPrice ? "green" : "red";

  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial" }}>
      <h1>Bitcoin (BTC/USDT)</h1>
      <div
        style={{
          fontSize: "1.2rem",
          color: status === "Onlayn" ? "green" : "gray",
        }}
      >
        Status: {status}
      </div>

      {price ? (
        <h2 style={{ fontSize: "4rem", color: priceColor }}>${price}</h2>
      ) : (
        <p>Yuklanmoqda...</p>
      )}
    </div>
  );
};

export default BitcoinTracker;
