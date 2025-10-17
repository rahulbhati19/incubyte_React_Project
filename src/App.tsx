import { useState } from 'react';
import { stringCalculator } from './stringCalculator';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const preprocess = (raw: string) => raw.replace(/\\n/g, '\n');

  const handleCalculate = () => {
    try {
      const prepared = preprocess(input);
      const sum = stringCalculator(prepared);
      setResult(sum);
      setError(null);
    } catch (err: any) {
      setResult(null);
      setError(err?.message ?? String(err));
    }
  };

  return (
    <div style={{
      background: '#f6f8fb',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 24
    }}>
      <div style={{
        width: '100%',
        maxWidth: 720,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 6px 24px rgba(16,24,40,0.08)',
        padding: 28,
        boxSizing: 'border-box'
      }}>
        <header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img
            src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            width={80}
            height={80}
            alt='calculator decorative'
            style={{ borderRadius: 8, objectFit: 'cover' }}
          />
          <div>
            <h1 style={{ margin: 0, fontSize: 20 }}>String Calculator</h1>
            <p style={{ margin: 0, color: '#666', fontSize: 13 }}>Enter numbers as a string and calculate the sum</p>
          </div>
        </header>

        <main style={{ marginTop: 20 }}>
          <label htmlFor='numbers-input' style={{ display: 'block', marginBottom: 8, fontWeight: 600 }}>
            Numbers
          </label>

          <textarea
            id='numbers-input'
            aria-label='numbers input'
            aria-describedby='instructions'
            style={{ width: '100%', padding: 12, minHeight: 120, borderRadius: 8, border: '1px solid #e6e9ef', fontSize: 15, boxSizing: 'border-box' }}
            placeholder={'Examples: 1,2,3 or 1\\n2,3 or //;\\n1;2'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                handleCalculate();
              }
            }}
          />

          <div id='instructions' style={{ color: '#666', marginTop: 8, fontSize: 13 }}>Tip: You can paste strings like <code>1\n2,3</code> or <code>//;\n1;2</code>.</div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16 }}>
            <button
              type='button'
              onClick={handleCalculate}
              aria-label='Calculate sum'
              disabled={input.trim() === ''}
              style={{ padding: '10px 18px', backgroundColor: '#0066cc', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
            >
              Calculate
            </button>

          </div>

          <div aria-live='polite' style={{ minHeight: 28, marginTop: 16 }}>
            {result !== null ? (
              <p id='result-message' style={{ color: 'green', margin: 0, fontWeight: 600 }}>Result: {result}</p>
            ) : null}
          </div>

          <div role='alert' aria-live='assertive' style={{ minHeight: 28, marginTop: 8 }}>
            {error ? (
              <p id='error-message' style={{ color: 'red', margin: 0 }}>{error}</p>
            ) : (
              <p style={{ color: '#333', margin: 0 }}>Make sure you enter numbers correctly!</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
