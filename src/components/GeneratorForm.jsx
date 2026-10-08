import { PLATFORMS, CATEGORIES, TONES } from '../lib/generator.js'

export default function GeneratorForm({ value, setValue, errors, onSubmit, loading, remaining }) {
  const seg = (key, options, labels) => (
    <div className="seg" role="radiogroup" aria-label={key}>
      {options.map((o) => (
        <button
          key={o} type="button" role="radio" aria-checked={value[key] === o}
          className={value[key] === o ? 'sel' : ''} onClick={() => setValue({ ...value, [key]: o })}
        >{labels ? labels[o] : o}</button>
      ))}
    </div>
  )
  return (
    <form className="card" onSubmit={onSubmit} noValidate aria-label="نموذج توليد المحتوى">
      <h3>🎬 بيانات الفيديو</h3>
      <p className="desc">املأ الحقول التالية وسيولّد لك التطبيق حزمة محتوى كاملة جاهزة للنشر.</p>

      <div className="field">
        <label>المنصة <span className="req">*</span></label>
        {seg('platform', Object.keys(PLATFORMS), Object.fromEntries(Object.entries(PLATFORMS).map(([k, v]) => [k, v.label])))}
        <div className="hint">{PLATFORMS[value.platform]?.hint}</div>
      </div>

      <div className="field">
        <label>التصنيف / المجال <span className="req">*</span></label>
        {seg('category', Object.keys(CATEGORIES), CATEGORIES)}
      </div>

      <div className="field">
        <label>النبرة <span className="req">*</span></label>
        {seg('tone', Object.keys(TONES), TONES)}
      </div>

      <div className="field">
        <label>مدة الفيديو <span className="req">*</span></label>
        <div className="seg" role="radiogroup" aria-label="المدة">
          {[30, 60, 90].map((d) => (
            <button key={d} type="button" role="radio" aria-checked={value.duration === d}
              className={value.duration === d ? 'sel' : ''} onClick={() => setValue({ ...value, duration: d })}>
              {d} ثانية
            </button>
          ))}
        </div>
      </div>

      <div className="field">
        <label htmlFor="topic">موضوع الفيديو <span className="req">*</span></label>
        <textarea id="topic" className="txt" rows={3} maxLength={300}
          placeholder="مثال: كيف تربح من الذكاء الاصطناعي بدون خبرة برمجية"
          value={value.topic} onChange={(e) => setValue({ ...value, topic: e.target.value })} />
        {errors.topic && <div className="err" role="alert">{errors.topic}</div>}
        <div className="hint">{value.topic.length}/300 — كلما كان الموضوع محددًا كانت النتيجة أقوى.</div>
      </div>

      <div className="field">
        <label htmlFor="audience">الجمهور المستهدف (اختياري)</label>
        <input id="audience" className="txt" maxLength={80}
          placeholder="مثال: طلاب الجامعات، صناع المحتوى المبتدئين"
          value={value.audience} onChange={(e) => setValue({ ...value, audience: e.target.value })} />
      </div>

      <button className="btn btn-primary" style={{ width: '100%' }} disabled={loading} type="submit">
        {loading ? '⏳ جارٍ التوليد…' : `⚡ أنشئ المحتوى (${remaining} متبقٍّ اليوم)`}
      </button>
      {errors.limit && <div className="err" role="alert" style={{ marginTop: 8 }}>{errors.limit}</div>}
    </form>
  )
}
