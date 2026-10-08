import { copyText } from './ui.jsx'
import { generateBatchIdeas, CATEGORIES, TONES, PLATFORMS } from '../lib/generator.js'
import { useState } from 'react'

export default function BatchView({ toast }) {
  const [category, setCategory] = useState('ai')
  const [tone, setTone] = useState('exciting')
  const [platform, setPlatform] = useState('tiktok')
  const [ideas, setIdeas] = useState(() => generateBatchIdeas({ category: 'ai' }, 7))
  const [loading, setLoading] = useState(false)

  const gen = () => {
    setLoading(true)
    setTimeout(() => {
      setIdeas(generateBatchIdeas({ category, tone, platform }, Date.now()))
      setLoading(false)
      toast('تم توليد ١٠ أفكار جديدة 🎲')
    }, 700)
  }

  return (
    <div>
      <div className="card">
        <h3>🎲 مولّد الأفكار — ١٠ أفكار دفعة واحدة</h3>
        <p className="desc">اختر المجال والنبرة واحصل على ١٠ أفكار، كل فكرة: عنوان + هوك + زاوية فيروسية.</p>
        <div className="field"><label>المجال</label>
          <div className="seg">{Object.entries(CATEGORIES).map(([k, v]) => (
            <button key={k} type="button" className={category === k ? 'sel' : ''} onClick={() => setCategory(k)}>{v}</button>))}
          </div>
        </div>
        <div className="field"><label>النبرة</label>
          <div className="seg">{Object.entries(TONES).map(([k, v]) => (
            <button key={k} type="button" className={tone === k ? 'sel' : ''} onClick={() => setTone(k)}>{v}</button>))}
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: '100%' }} onClick={gen} disabled={loading}>
          {loading ? '⏳ جارٍ توليد الأفكار…' : '🎲 ولّد ١٠ أفكار'}
        </button>
      </div>

      <div className="grid2" style={{ marginTop: 14 }}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
            <div className="skel" key={i}><div className="shimmer" style={{ width: '60%' }} /><div className="shimmer" /><div className="shimmer" style={{ width: '80%' }} /></div>))
          : ideas.map((d) => (
            <article className="card" key={d.id} aria-label={'فكرة ' + d.n}>
              <h3>💡 {d.n}. {d.title}</h3>
              <p className="kv"><span className="k">⛔ الهوك: </span>{d.hook}</p>
              <p className="kv"><span className="k">📁 الموضوع: </span>{d.topic}</p>
              <p className="kv"><span className="k">🚀 الزاوية الفيروسية: </span>{d.viralAngle}</p>
              <p className="desc">{d.description}</p>
              <div className="card-actions">
                <button className="chip-btn" onClick={() => copyText(`${d.title}\nالهوك: ${d.hook}\nالموضوع: ${d.topic}\nالزاوية: ${d.viralAngle}\n${d.description}`, toast)}>📋 نسخ الفكرة</button>
              </div>
            </article>
          ))}
      </div>
      <p className="hint" style={{ textAlign: 'center', marginTop: 12 }}>منصة مستهدفة: {PLATFORMS[platform]?.label} • {CATEGORIES[category]} • نبرة {TONES[tone]}</p>
    </div>
  )
}
