import { useEffect, useMemo, useState } from 'react'
import Landing from './components/Landing.jsx'
import GeneratorForm from './components/GeneratorForm.jsx'
import ResultsView from './components/ResultsView.jsx'
import BatchView from './components/BatchView.jsx'
import HistoryView, { ProView } from './components/HistoryPro.jsx'
import { useToast } from './components/ui.jsx'
import { generatePackage, regenerateField } from './lib/generator.js'
import {
  getProjects, saveProject, deleteProject, getUsage, remainingGenerations,
  consumeGeneration, getTheme, setTheme, DAILY_FREE_LIMIT,
} from './lib/storage.js'

const DEFAULT_FORM = { platform: 'tiktok', category: 'ai', tone: 'exciting', duration: 60, topic: '', audience: '' }

export default function App() {
  const [view, setView] = useState('landing') // landing|create|result|history|batch|pro
  const [form, setForm] = useState(DEFAULT_FORM)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [pkg, setPkg] = useState(null)
  const [saved, setSaved] = useState(false)
  const [projects, setProjects] = useState(() => getProjects())
  const [remaining, setRemaining] = useState(() => remainingGenerations())
  const [usageCount, setUsageCount] = useState(() => getUsage().count)
  const [theme, setThemeState] = useState(() => getTheme())
  const [toast, toastEl] = useToast()

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.dir = 'rtl'
    document.documentElement.lang = 'ar'
    setTheme(theme)
  }, [theme])

  const tabs = useMemo(() => [
    { id: 'landing', label: 'الرئيسية', ic: '🏠' },
    { id: 'create', label: 'إنشاء', ic: '⚡' },
    { id: 'batch', label: 'الأفكار', ic: '🎲' },
    { id: 'history', label: 'مشاريعي', ic: '💾' },
    { id: 'pro', label: 'Pro', ic: '👑' },
  ], [])

  const validate = () => {
    const e = {}
    if (!form.topic.trim()) e.topic = 'فضلًا أدخل موضوع الفيديو.'
    else if (form.topic.trim().length < 4) e.topic = 'الموضوع قصير جدًا — أضف تفاصيل أكثر.'
    if (remaining <= 0) e.limit = `وصلت للحد اليومي المجاني (${DAILY_FREE_LIMIT}/يوم). جرّب غدًا أو اكتشف Pro 👑`
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const doGenerate = (input, variant = Date.now()) => {
    setLoading(true)
    setErrors({})
    setTimeout(() => {
      try {
        const fresh = generatePackage(input, variant)
        const u = consumeGeneration()
        setUsageCount(u.count)
        setRemaining(Math.max(0, DAILY_FREE_LIMIT - u.count))
        setPkg(fresh)
        setSaved(false)
        setView('result')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        toast('تم إنشاء المحتوى بنجاح 🎉')
      } catch {
        setErrors({ topic: 'حدث خطأ أثناء التوليد — حاول مرة أخرى.' })
      } finally { setLoading(false) }
    }, 1100)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    doGenerate(form)
  }

  const onRegenAll = () => {
    if (remaining <= 0) { setErrors({}); toast('انتهت توليدات اليوم المجانية — عُد غدًا أو جرّب Pro 👑'); setView('pro'); return }
    doGenerate(pkg.input)
  }

  const onRegenField = (field, index = null) => {
    setPkg((prev) => {
      if (!prev) return prev
      if (field === 'script' || field === 'voiceOver') {
        if (remaining <= 0) { toast('انتهت توليدات اليوم — التعديل اليدوي متاح ✏️'); return prev }
        const next = regenerateField(prev, field)
        toast('تم توليد نسخة جديدة 🎲')
        return next
      }
      toast('تم توليد نسخة جديدة 🎲')
      return regenerateField(prev, field, index)
    })
  }

  const onSave = () => {
    if (!pkg) return
    setProjects(saveProject(pkg))
    setSaved(true)
    toast('تم حفظ المشروع 💾')
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-in">
          <div className="logo" onClick={() => setView('landing')} role="button" tabIndex={0} aria-label="الصفحة الرئيسية">
            <span className="logo-mark">🎥</span>
            <span>مُنشئ المحتوى العربي</span>
          </div>
          <nav className="nav" aria-label="التنقل الرئيسي">
            {tabs.map((t) => (
              <button key={t.id} className={view === t.id || (view === 'result' && t.id === 'create') ? 'active' : ''} onClick={() => setView(t.id)}>{t.label}</button>
            ))}
          </nav>
          <button className="icon-btn" onClick={() => setThemeState(theme === 'dark' ? 'light' : 'dark')} aria-label="تبديل الوضع الليلي">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="wrap">
        <div className="usage" role="status" aria-live="polite" style={{ marginBottom: 14 }}>
          <span>⚡ {remaining} من {DAILY_FREE_LIMIT} توليدات مجانية اليوم</span>
          <span className="bar"><i style={{ width: `${(remaining / DAILY_FREE_LIMIT) * 100}%` }} /></span>
          {remaining === 0 && <button className="chip-btn" onClick={() => setView('pro')}>👑 Pro</button>}
        </div>

        {view === 'landing' && <Landing onStart={() => setView('create')} onBatch={() => setView('batch')} onPro={() => setView('pro')} />}

        {view === 'create' && (
          <GeneratorForm value={form} setValue={setForm} errors={errors} onSubmit={onSubmit} loading={loading} remaining={remaining} />
        )}

        {loading && view === 'create' && (
          <div className="loader-wrap" role="status" aria-live="polite">
            <div className="spinner" />
            <b>جارٍ صياغة حزمة المحتوى…</b>
            <p className="hint">نكتب الهوك والسكربت والمشاهد والهاشتاقات ✨</p>
          </div>
        )}

        {view === 'result' && pkg && (
          <ResultsView pkg={pkg} setPkg={setPkg} onRegenField={onRegenField} onRegenAll={onRegenAll} onSave={onSave} saved={saved} toast={toast} />
        )}

        {view === 'history' && (
          <HistoryView projects={projects}
            onOpen={(p) => { setPkg(p); setSaved(true); setView('result'); window.scrollTo({ top: 0 }) }}
            onDelete={(id) => setProjects(deleteProject(id))}
            onNew={() => setView('create')} toast={toast} />
        )}

        {view === 'batch' && <BatchView toast={toast} />}
        {view === 'pro' && <ProView onStart={() => setView('create')} toast={toast} />}
      </main>

      <nav className="bottomnav" aria-label="تنقل سفلي">
        {tabs.map((t) => (
          <button key={t.id} className={view === t.id || (view === 'result' && t.id === 'create') ? 'active' : ''} onClick={() => setView(t.id)}>
            <span className="ic">{t.ic}</span>{t.label}
          </button>
        ))}
      </nav>

      {toastEl}
    </>
  )
}
