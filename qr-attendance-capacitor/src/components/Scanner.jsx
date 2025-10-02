import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { BrowserMultiFormatReader } from '@zxing/library'
import { addAttendance } from '../lib/storage.js'

const ATTEND_REGEX = /^ATTEND:([A-Za-z0-9]+)$/

export default function Scanner({ onScanned }) {
  const videoRef = useRef(null)
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    let active = true
    const reader = new BrowserMultiFormatReader()

    async function start() {
      try {
        setRunning(true)
        await reader.decodeFromVideoDevice(
          undefined,
          videoRef.current,
          async (result, err) => {
            if (!active) return
            if (result) {
              const text = result.getText().trim()
              const m = text.match(ATTEND_REGEX)
              if (m) {
                const mssv = m[1]
                const now = new Date().toISOString()
                addAttendance({ mssv, time: now })
                setMessage(`Đã điểm danh: ${mssv}`)
                onScanned?.(mssv)
              } else {
                setMessage('QR không đúng định dạng ATTEND:<MSSV>')
              }
            }
          }
        )
      } catch (e) {
        console.error(e)
        setMessage('Không thể mở camera. Hãy cấp quyền camera hoặc thử trình duyệt khác.')
      }
    }

    start()
    return () => {
      active = false
      try { reader.reset() } catch {}
      setRunning(false)
    }
  }, [])

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <video ref={videoRef} style={{ width: '100%', borderRadius: 8, background: '#000' }} />
      <div style={{ fontSize: 14, color: '#555' }}>{message}</div>
      {!running && <div>Đang khởi tạo camera...</div>}
    </div>
  )
}