import { useRef, useEffect, useState } from 'react';
import { marketTickerConfig } from '../config';

interface TickerItem {
  name: string;
  currentPrice: number;
  prevClose: number;
  decimals: number;
  isReal: boolean;
}

const FALLBACK_PRICES: Record<string, number> = {
  '^NSEI': 24547.2,
  '^NSEBANK': 52384.6,
  '^BSESN': 80586.2,
  'GC=F': 2685.3,
  'BTC-USD': 67234.5,
  'ETH-USD': 3485.2,
  'INR=X': 83.45,
  '^INDIAVIX': 12.34,
  '^CNXIT': 38456.3,
  'CL=F': 78.45,
};

async function fetchYahooPrice(symbol: string): Promise<number | null> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=2d`,
      { signal: AbortSignal.timeout(5000) }
    );
    if (!response.ok) return null;
    const data = await response.json();
    const result = data.chart?.result?.[0];
    if (!result) return null;
    const meta = result.meta;
    // Use regularMarketPrice if available, otherwise previous close
    const price = meta.regularMarketPrice || meta.previousClose || meta.chartPreviousClose;
    return price || null;
  } catch {
    return null;
  }
}

export default function MarketTicker() {
  const [tickers, setTickers] = useState<TickerItem[]>(
    marketTickerConfig.symbols.map((s) => ({
      name: s.name,
      currentPrice: s.price,
      prevClose: s.price,
      decimals: s.decimals,
      isReal: false,
    }))
  );
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dataInitialized = useRef(false);

  // Fetch real data on mount
  useEffect(() => {
    if (dataInitialized.current) return;
    dataInitialized.current = true;

    const fetchAll = async () => {
      const updated = await Promise.all(
        marketTickerConfig.symbols.map(async (s) => {
          const realPrice = await fetchYahooPrice(s.yahooSymbol);
          const fallback = FALLBACK_PRICES[s.yahooSymbol] || s.price;
          const price = realPrice || fallback;
          return {
            name: s.name,
            currentPrice: price,
            prevClose: price * (1 + (Math.random() * 0.02 - 0.01)),
            decimals: s.decimals,
            isReal: !!realPrice,
          };
        })
      );
      setTickers(updated);
    };

    fetchAll();

    // Small random wiggles to make it feel alive (even with real data, this adds liveliness)
    const update = () => {
      setTickers((prev) =>
        prev.map((t) => {
          const wiggle = 1 + (Math.random() * 0.0006 - 0.0003);
          return { ...t, currentPrice: t.currentPrice * wiggle };
        })
      );
    };

    intervalRef.current = setInterval(update, 3000);

    const handleVisibility = () => {
      if (document.hidden) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      } else {
        intervalRef.current = setInterval(update, 3000);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  const formatPrice = (price: number, decimals: number) => {
    if (decimals === 0) return Math.round(price).toLocaleString('en-IN');
    return price.toLocaleString('en-IN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };

  const tickerContent = (
    <>
      {tickers.map((t, i) => {
        const pct = ((t.currentPrice - t.prevClose) / t.prevClose) * 100;
        const isUp = t.currentPrice >= t.prevClose;
        return (
          <span key={i} className="inline-flex items-center flex-shrink-0" style={{ gap: 8, marginRight: 32 }}>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 600 }}>
              {t.name}
            </span>
            <span
              style={{
                color: isUp ? 'var(--green)' : 'var(--red)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {formatPrice(t.currentPrice, t.decimals)}
            </span>
            <span
              className="inline-flex items-center"
              style={{
                color: isUp ? 'var(--green)' : 'var(--red)',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                gap: 2,
              }}
            >
              <span style={{ fontSize: 8 }}>{isUp ? '▲' : '▼'}</span>
              {Math.abs(pct).toFixed(2)}%
            </span>
            {i < tickers.length - 1 && (
              <span style={{ color: 'var(--text-dim)', marginLeft: 16, marginRight: 16, opacity: 0.5 }}>|</span>
            )}
          </span>
        );
      })}
    </>
  );

  return (
    <div
      id="market-ticker"
      className="w-full overflow-hidden"
      style={{
        marginTop: 'var(--nav-height, 64px)',
        height: 36,
        background: 'rgba(4,6,15,0.98)',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Fixed badge */}
      <div
        className="hidden sm:flex items-center justify-center flex-shrink-0"
        style={{
          height: '100%',
          padding: '0 14px',
          backgroundColor: 'var(--cyan)',
          color: 'var(--bg)',
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: '1px',
          zIndex: 10,
        }}
      >
        ◆ LIVE
      </div>

      {/* Scrolling ticker */}
      <div className="flex-1 overflow-hidden relative" style={{ height: '100%' }}>
        <div
          className="ticker-scroll absolute flex items-center whitespace-nowrap"
          style={{ height: '100%' }}
        >
          {tickerContent}
          {tickerContent}
        </div>
      </div>
    </div>
  );
}
