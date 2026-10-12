import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [rates, setRates] = useState({ btc: 0, usdt: 0 });
  const [loading, setLoading] = useState(true);
  const [tradeType, setTradeType] = useState('BUY');

  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/get-rates?type=${tradeType}`);
      const data = await res.json();
      if (data.success) setRates({ btc: data.btc, usdt: data.usdt });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 30000);
    return () => clearInterval(interval);
  }, [tradeType]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '450px', margin: '3rem auto', backgroundColor: '#ffffff', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
      <h2 style={{ textAlign: 'center', margin: '0 0 1.5rem 0', color: '#111' }}>CoinCola P2P Rates (NGN)</h2>
      <div style={{ display: 'flex', background: '#f0f0f2', padding: '4px', borderRadius: '8px', marginBottom: '1.5rem' }}>
        <button onClick={() => setTradeType('BUY')} style={{ flex: 1, padding: '0.6rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', background: tradeType === 'BUY' ? '#22c55e' : 'transparent', color: tradeType === 'BUY' ? '#fff' : '#555' }}>🟢 Buy Rates</button>
        <button onClick={() => setTradeType('SELL')} style={{ flex: 1, padding: '0.6rem', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', background: tradeType === 'SELL' ? '#ef4444' : 'transparent', color: tradeType === 'SELL' ? '#fff' : '#555' }}>🔴 Sell Rates</button>
      </div>
      {loading ? <p style={{ textAlign: 'center', color: '#666' }}>Fetching real-time market updates...</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ padding: '1.25rem', border: '1px solid #e4e4e7', borderRadius: '12px', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.9rem' }}><strong>Tether (USDT)</strong><span style={{ color: tradeType === 'BUY' ? '#22c55e' : '#ef4444' }}>{tradeType}</span></div>
            <div style={{ fontSize: '1.9rem', fontWeight: '800', marginTop: '0.5rem' }}>₦{rates.usdt.toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
          </div>
          <div style={{ padding: '1.25rem', border: '1px solid #e4e4e7', borderRadius: '12px', background: '#fafafa' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666', fontSize: '0.9rem' }}><strong>Bitcoin (BTC)</strong><span style={{ color: tradeType === 'BUY' ? '#22c55e' : '#ef4444' }}>{tradeType}</span></div>
            <div style={{ fontSize: '1.9rem', fontWeight: '800', marginTop: '0.5rem' }}>₦{rates.btc.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
          </div>
        </div>
      )}
    </div>
  );
}

const root = createRoot(document.getElementById('root') || document.body);
root.render(<App />);
