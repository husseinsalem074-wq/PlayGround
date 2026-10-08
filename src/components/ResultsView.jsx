import { useState } from 'react'
import { copyText, SectionCard } from './ui.jsx'
import { fullPackageText } from '../lib/storage.js'
import { CATEGORIES, PLATFORMS } from '../lib/generator.js'

export default function ResultsView({ pkg, setPkg, onRegenField, onRegenAll, onSave, saved, toast }) {
  const [editing, setEditing] = useState(null)
  const [draft, setDraft] = useState('')

  if (!pkg) return null
  const startEdit = (key, current, idx = null) => { setEditing({ key, idx }); setDraft(current) }
  const saveEdit = () => {
    if (!editing) return
    const clone = JSON.parse(JSON.stringify(pkg))
    if (editing.key === 'titles') clone.titles = draft.split('\n').map((s) => s.trim()).filter(Boolean).slice(0, 5)
    else if (editing.key === 'hashtags') clone.hashtags = draft.split(/[\s#،,]+/).map((s) => s.trim()).filter(Boolean).map((s) => (s.startsWith('#') ? s : '#' + s))
    else if (editing.key === 'scene') clone.scenes[editing.idx].voice = draft
    else clone[editing.key] = draft
    setPkg(clone)
    setEditing(null)
    toast('تم حفظ التعديل 💾')
  }
  const isEd = (key, idx = null) => editing?.key === key && (idx === null ? editing.idx == null : editing.idx === idx)

  const sceneText = (s) => `المشهد ${s.n} (${s.time})\n🎬 ${s.visual}\n📝 نص الشاشة: ${s.onScreen}\n🗣️ ${s.voice}\n🎨 برومبت الصورة: ${s.imagePrompt}`

  return (
    <div className="grid2" style={{ gridTemplateColumns: undefined }}>
      <div className="card" style={{ borderColor: 'rgba(236,72,153,.4)' }}>
        <h3>✅ حزمة المحتوى جاهزة!</h3>
        <p className="desc">
          {PLATFORMS[pkg.input.platform]?.label} • {CATEGORIES[pkg.input.category]} • {pkg.input.duration} ثانية • {pkg.input.topic}
        </p>
        <div className="card-actions" style={{ marginTop: 0 }}>
          <button className="chip-btn" onClick={() => copyText(fullPackageText(pkg), toast)}>📦 نسخ المحتوى كاملًا</button>
          <button className="chip-btn" onClick={onRegenAll}>🎲 توليد نسخة أخرى</button>
          <button className="chip-btn" onClick={onSave}>{saved ? '★ محفوظ في مشاريعي' : '💾 حفظ المشروع'}</button>
        </div>
      </div>

      <SectionCard icon="⛔" title="الهوك — أول ٣ ثوانٍ" text={pkg.hook}
        onCopy={() => copyText(pkg.hook, toast)} onRegen={() => onRegenField('hook')}
        onEdit={() => startEdit('hook', pkg.hook)} editing={isEd('hook')}
        editValue={draft} setEditValue={setDraft} onSaveEdit={saveEdit} />

      <SectionCard icon="📝" title="السكربت الكامل" desc="انسخه للتصوير مباشرة."
        text={pkg.script} onCopy={() => copyText(pkg.script, toast)}
        onRegen={() => onRegenField('script')}
        onEdit={() => startEdit('script', pkg.script)} editing={isEd('script')}
        editValue={draft} setEditValue={setDraft} onSaveEdit={saveEdit} />

      <section className="card" aria-label="تقسيم المشاهد">
        <h3>🎞️ تقسيم المشاهد</h3>
        <p className="desc">كل مشهد: الصورة + نص الشاشة + التعليق الصوتي + برومبت توليد الصورة.</p>
        {pkg.scenes.map((s, i) => (
          <div className="scene" key={s.n}>
            <b className="t">{s.title} • ⏱️ {s.time}</b>
            <p className="kv"><span className="k">🎬 بصري: </span>{s.visual}</p>
            <p className="kv"><span className="k">📝 على الشاشة: </span>{s.onScreen}</p>
            {isEd('scene', i)
              ? <textarea className="edit-area" value={draft} onChange={(e) => setDraft(e.target.value)} aria-label={'تحرير صوت المشهد ' + s.n} />
              : <p className="kv"><span className="k">🗣️ صوتي: </span>{s.voice}</p>}
            <p className="kv" style={{ color: 'var(--muted)', fontSize: 12.5 }}><span className="k">🎨 برومبت: </span><span dir="ltr">{s.imagePrompt}</span></p>
            <div className="card-actions">
              <button className="chip-btn" onClick={() => copyText(sceneText(s), toast)}>📋 نسخ المشهد</button>
              <button className="chip-btn" onClick={() => onRegenField('scene', i)}>🔄 توليد جديد</button>
              {isEd('scene', i)
                ? <button className="chip-btn" onClick={saveEdit}>💾 حفظ</button>
                : <button className="chip-btn" onClick={() => startEdit('scene', s.voice, i)}>✏️ تعديل الصوت</button>}
            </div>
          </div>
        ))}
      </section>

      <SectionCard icon="🎙️" title="سكربت التعليق الصوتي" desc="جاهز للصقه في أدوات تحويل النص إلى صوت."
        text={pkg.voiceOver} onCopy={() => copyText(pkg.voiceOver, toast)}
        onRegen={() => onRegenField('voiceOver')}
        onEdit={() => startEdit('voiceOver', pkg.voiceOver)} editing={isEd('voiceOver')}
        editValue={draft} setEditValue={setDraft} onSaveEdit={saveEdit} />

      <SectionCard icon="📌" title="٣ عناوين بديلة"
        onCopy={() => copyText(pkg.titles.join('\n'), toast)} onRegen={() => onRegenField('titles')}
        onEdit={() => startEdit('titles', pkg.titles.join('\n'))} editing={isEd('titles')}
        editValue={draft} setEditValue={setDraft} onSaveEdit={saveEdit}>
        <div className="content-box">{pkg.titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}</div>
      </SectionCard>

      <SectionCard icon="✍️" title="الكابشن + الهاشتاقات" text={`${pkg.caption}\n\n${pkg.hashtags.join(' ')}`}
        onCopy={() => copyText(`${pkg.caption}\n\n${pkg.hashtags.join(' ')}`, toast)}
        onRegen={() => onRegenField('caption')} onEdit={() => startEdit('caption', pkg.caption)}
        editing={isEd('caption')} editValue={draft} setEditValue={setDraft} onSaveEdit={saveEdit} />

      <SectionCard icon="#️⃣" title="الهاشتاقات"
        onCopy={() => copyText(pkg.hashtags.join(' '), toast)} onRegen={() => onRegenField('hashtags')}
        onEdit={() => startEdit('hashtags', pkg.hashtags.join(' '))} editing={isEd('hashtags')}
        editValue={draft} setEditValue={setDraft} onSaveEdit={saveEdit}>
        <div className="content-box">{pkg.hashtags.join('  ')}</div>
      </SectionCard>

      <SectionCard icon="🖼️" title="فكرة الثمبنيل" text={pkg.thumbnail}
        onCopy={() => copyText(pkg.thumbnail, toast)} onRegen={() => onRegenField('thumbnail')}
        onEdit={() => startEdit('thumbnail', pkg.thumbnail)} editing={isEd('thumbnail')}
        editValue={draft} setEditValue={setDraft} onSaveEdit={saveEdit} />

      <SectionCard icon="📣" title="الدعوة لاتخاذ إجراء (CTA)" text={pkg.cta}
        onCopy={() => copyText(pkg.cta, toast)} onRegen={() => onRegenField('cta')}
        onEdit={() => startEdit('cta', pkg.cta)} editing={isEd('cta')}
        editValue={draft} setEditValue={setDraft} onSaveEdit={saveEdit} />
    </div>
  )
}
