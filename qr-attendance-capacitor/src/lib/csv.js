export function toCSV(rows) {
  if (!rows || rows.length === 0) return 'mssv,time\n'
  const header = 'mssv,time'
  const body = rows.map(r => `${escapeCSV(r.mssv)},${escapeCSV(r.time)}`).join('\n')
  return header + '\n' + body + '\n'
}

function escapeCSV(v) {
  const s = String(v ?? '')
  if (/[",\n]/.test(s)) {
    return '"' + s.replace(/"/g, '""') + '"'
  }
  return s
}

export function downloadCSV(filename, csv) {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
