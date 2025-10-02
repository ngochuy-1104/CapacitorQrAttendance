import React from 'react'
import { useEffect, useState } from 'react'
import { loadHistory, clearHistory } from '../lib/storage.js'
import { toCSV, downloadCSV } from '../lib/csv.js'

export default function History() {
  const [items, setItems] = useState([])

  function refresh() {
    setItems(loadHistory())
  }

  useEffect(() => { refresh() }, [])

  function handleExport() {
    const csv = toCSV(items)
    downloadCSV('attendance.csv', csv)
  }

  function handleReset() {
    if (confirm('Xoá toàn bộ lịch sử điểm danh?')) {
      clearHistory()
      refresh()
    }
  }

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button onClick={refresh}>Làm mới</button>
        <button onClick={handleExport}>Xuất CSV</button>
        <button onClick={handleReset} style={{ background: '#ffebe8' }}>Reset danh sách</button>
      </div>

      <div style={{ maxHeight: 300, overflow: 'auto', border: '1px solid #eee', borderRadius: 8 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>#</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>MSSV</th>
              <th style={{ textAlign: 'left', padding: 8, borderBottom: '1px solid #ddd' }}>Thời gian (ISO)</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td colSpan="3" style={{ padding: 12, color: '#888' }}>Chưa có lịch sử</td></tr>
            )}
            {items.map((it, i) => (
              <tr key={i}>
                <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>{i + 1}</td>
                <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>{it.mssv}</td>
                <td style={{ padding: 8, borderBottom: '1px solid #f0f0f0' }}>{it.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}