import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

function render() {
  try {
    const mount = document.getElementById('root')
    if (!mount) throw new Error('Không tìm thấy #root trong index.html')
    const root = createRoot(mount)
    root.render(<App />)
    console.log('[BOOT] React mounted ok')
  } catch (e) {
    console.error('[BOOT ERROR]', e)
    const pre = document.createElement('pre')
    pre.className = 'err'
    pre.textContent = 'Lỗi khởi động ứng dụng:\n' + (e?.stack || e)
    document.body.appendChild(pre)
  }
}

render()
