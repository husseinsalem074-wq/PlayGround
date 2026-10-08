export default function HistoryView({ projects, onOpen, onDelete, onNew, toast }) {
  if (!projects.length) {
    return (
      <div className="card empty">
        <div className="big">📭</div>
        <h3 style={{ justifyContent: 'center' }}>لا توجد مشاريع بعد</h3>
        <p className="desc" style={{ textAlign: 'center' }}>ولّد أول حزمة محتوى وستظهر هنا تلقائيًا — محفوظة على جهازك.</p>
        <button className="btn btn-primary" onClick={onNew}>⚡ أنشئ أول محتوى</button>
      </div>
    )
  }
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {projects.map((p) => (
        <div className="hist-item" key={p.id} onClick={() => onOpen(p)} role="button" tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onOpen(p)} aria-label={'فتح ' + p.input.topic}>
          <div className="logo-mark" style={{ width: 42, height: 42 }}>🎬</div>
          <div style={{ flex: 1 }}>
            <div className="t">{p.input.topic}</div>
            <div className="m">{p.input.duration} ث • {new Date(p.createdAt).toLocaleString('ar')} • {p.scenes.length} مشاهد</div>
          </div>
          <button className="chip-btn" aria-label="حذف المشروع" onClick={(e) => { e.stopPropagation(); onDelete(p.id); toast('تم حذف المشروع 🗑️') }}>🗑️</button>
        </div>
      ))}
    </div>
  )
}

export function ProView({ onStart, toast }) {
  const perks = [
    ['♾️', 'توليدات غير محدودة', 'بدون عدّاد يومي — ولّد بقدر ما تنشر.'],
    ['📦', 'التوليد الجماعي', '١٠ أفكار وحزم كاملة دفعة واحدة.'],
    ['💾', 'مشاريع محفوظة بلا حدود', 'مكتبة أفكارك وقوالبك الخاصة.'],
    ['🧩', 'قوالب محتوى متقدمة', 'سلاسل، تحديات، قصص، مراجعات.'],
    ['📤', 'أدوات التصدير', 'PDF ونسخ منسّق لمنصات النشر.'],
  ]
  return (
    <div>
      <div className="hero" style={{ paddingTop: 10 }}>
        <span className="pill">👑 Pro — قريبًا</span>
        <h1>ارتقِ إلى <span className="grad">Pro</span></h1>
        <p className="sub">كل ما تحتاجه لتصبح آلة محتوى عربية لا تتوقف.</p>
      </div>
      <div className="pro-price">
        <div className="pro-plan"><b>شهري</b><div className="p">$9<small>/شهر</small></div><small>مرونة كاملة</small></div>
        <div className="pro-plan hot"><b>⭐ سنوي</b><div className="p">$79<small>/سنة</small></div><small>وفّر ٢٧٪</small></div>
      </div>
      <div className="card">
        {perks.map(([e, b, s], i) => (
          <div className="perk" key={i}><span style={{ fontSize: 22 }}>{e}</span><div><b>{b}</b><br /><span style={{ color: 'var(--muted)', fontSize: 13 }}>{s}</span></div></div>
        ))}
        <div className="card-actions" style={{ marginTop: 14 }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => toast('🚧 الدفع غير مفعّل بعد — هذه نسخة عرض فقط!')}>🚀 اشترك في Pro</button>
          <button className="btn btn-ghost" onClick={onStart}>متابعة مجانًا</button>
        </div>
        <p className="hint" style={{ textAlign: 'center' }}>الدفع التجريبي غير مفعّل في هذه النسخة — زر الاشتراك للعرض فقط.</p>
      </div>
    </div>
  )
}
