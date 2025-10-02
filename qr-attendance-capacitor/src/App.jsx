import React from 'react'
import { useState } from 'react'
import Scanner from './components/Scanner.jsx'
import History from './components/History.jsx'

function ErrorBoundary({ children }) {
  return children
}

export default function App() {
  const [last, setLast] = useState('')

  return (
    <ErrorBoundary>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 16, display: 'grid', gap: 16 }}>
        <h1>QR Attendance</h1>
        <p style={{ marginTop: -8, color: '#666' }}>Quét QR có dạng <code>ATTEND:&lt;MSSV&gt;</code>. Ví dụ: <code>ATTEND:21T1023456</code></p>

        <section style={{ display: 'grid', gap: 12 }}>
          <h2>Scanner</h2>
          <Scanner onScanned={setLast} />
          {last && <div><b>Vừa quét:</b> {last}</div>}
        </section>

        <section style={{ display: 'grid', gap: 12 }}>
          <h2>Lịch sử điểm danh</h2>
          <History />
        </section>

        <footer style={{ marginTop: 24, fontSize: 12, color: '#888' }}>
          Tip: Nếu camera không mở, hãy cấp quyền camera cho trình duyệt/app.
        </footer>
      </div>
    </ErrorBoundary>
  )
}