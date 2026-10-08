import { useState } from 'react'

export async function copyText(t, onOk) {
  try {
    await navigator.clipboard.writeText(t)
    onOk('تم النسخ بنجاح ✅')
  } catch {
    const ta = document.createElement('textarea')
    ta.value = t
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy'); onOk('تم النسخ بنجاح ✅') }
    catch { onOk('تعذّر النسخ — حدّد النص يدويًا') }
    ta.remove()
  }
}

export function SectionCard({ icon, title, desc, text, onCopy, onRegen, onEdit, editing, editValue, setEditValue, onSaveEdit, children }) {
  return (
    <section className="card" aria-label={title}>
      <h3><span aria-hidden>{icon}</span> {title}</h3>
      {desc && <p className="desc">{desc}</p>}
      {editing ? (
        <textarea
          className="edit-area" value={editValue} onChange={(e) => setEditValue(e.target.value)}
          aria-label={'تحرير ' + title} autoFocus
        />
      ) : children ? children : (
        <div className="content-box">{text}</div>
      )}
      <div className="card-actions">
        <button className="chip-btn" onClick={onCopy} aria-label={'نسخ ' + title}>📋 نسخ</button>
        {onRegen && <button className="chip-btn" onClick={onRegen} aria-label={'إعادة توليد ' + title}>🔄 توليد جديد</button>}
        {onEdit && (
          editing
            ? <button className="chip-btn" onClick={onSaveEdit}>💾 حفظ التعديل</button>
            : <button className="chip-btn" onClick={onEdit} aria-label={'تعديل ' + title}>✏️ تعديل</button>
        )}
      </div>
    </section>
  )
}

export function useToast() {
  const [msg, setMsg] = useState('')
  const show = (m) => { setMsg(m); clearTimeout(show._t); show._t = setTimeout(() => setMsg(''), 2400) }
  const el = msg ? <div className="toast" role="status" aria-live="polite">{msg}</div> : null
  return [show, el]
}
