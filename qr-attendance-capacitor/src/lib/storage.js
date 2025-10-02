export function loadHistory() {
  try {
    const raw = localStorage.getItem('attendance_history')
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveHistory(list) {
  localStorage.setItem('attendance_history', JSON.stringify(list))
}

export function addAttendance(item) {
  const list = loadHistory()
  // Tránh trùng ngay lập tức: nếu cùng MSSV trong 2s, bỏ qua
  const last = list[0]
  if (last && last.mssv === item.mssv) {
    const t1 = new Date(last.time).getTime()
    const t2 = new Date(item.time).getTime()
    if (Math.abs(t2 - t1) < 2000) return
  }
  list.unshift(item)
  saveHistory(list)
}

export function clearHistory() {
  localStorage.removeItem('attendance_history')
}
