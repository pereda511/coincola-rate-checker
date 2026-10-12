export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const { type } = req.query || { type: 'BUY' };
  try {
    const usdtRes = await fetch(`https://coincola.com{type}`);
    const btcRes = await fetch(`https://coincola.com{type}`);
    const usdtData = await usdtRes.json();
    const btcData = await btcRes.json();
    const liveUsdt = usdtData.data && usdtData.data.length > 0 ? usdtData.data.price : 1450.00;
    const liveBtc = btcData.data && btcData.data.length > 0 ? btcData.data.price : 124500000.00;
    return res.status(200).json({ success: true, usdt: parseFloat(liveUsdt), btc: parseFloat(liveBtc) });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
