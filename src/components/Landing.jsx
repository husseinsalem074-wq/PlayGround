export default function Landing({ onStart, onBatch, onPro }) {
  const feats = [
    { e: '⚡', b: 'توليد في دقيقة', s: 'هوك + سكربت + مشاهد + هاشتاقات دفعة واحدة' },
    { e: '🎬', b: 'جاهز للنشر', s: 'تعليق صوتي وبرومبتات صور لكل مشهد' },
    { e: '📦', b: '١٠ أفكار دفعة واحدة', s: 'مولّد الأفكار بالزاوية الفيروسية' },
    { e: '💾', b: 'مشاريع محفوظة', s: 'سجلّ محلي + نسخ وتعديل لكل بطاقة' },
  ]
  return (
    <div>
      <div className="hero">
        <span className="pill"><span className="dot" /> صُنع لصنّاع المحتوى العرب • يعمل الآن</span>
        <h1>مُنشئ <span className="grad">المحتوى العربي</span> 🎥</h1>
        <p className="sub">حوّل فكرتك إلى محتوى جاهز للنشر في دقيقة.</p>
        <div className="cta-row">
          <button className="btn btn-primary" onClick={onStart}>ابدأ الآن ⚡</button>
          <button className="btn btn-ghost" onClick={onBatch}>🎲 جرّب مولّد الأفكار</button>
        </div>
        <p className="hint" style={{ marginTop: 14 }}>TikTok • Instagram Reels • YouTube Shorts — مجانًا ٣ توليدات يوميًا ✨ <button className="chip-btn" onClick={onPro} style={{ marginInlineStart: 6 }}>اكتشف Pro 👑</button></p>
      </div>

      <div className="feats">
        {feats.map((f, i) => (
          <div className="feat" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="e">{f.e}</div><b>{f.b}</b><span>{f.s}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3>🪄 كيف يعمل؟</h3>
        <p className="desc">٣ خطوات فقط من الفكرة إلى النشر</p>
        <div className="content-box">1️⃣ أدخل موضوعك واختر المنصة والنبرة والمدة{'\n'}2️⃣ اضغط «أنشئ المحتوى» واحصل على حزمة كاملة: هوك + سكربت + مشاهد + عناوين + كابشن + هاشتاقات + ثمبنيل + CTA{'\n'}3️⃣ انسخ، عدّل، احفظ مشروعك، وانشر 🚀</div>
        <div className="card-actions">
          <button className="btn btn-primary btn-sm" onClick={onStart}>ابدأ الآن مجانًا</button>
        </div>
      </div>
    </div>
  )
}
