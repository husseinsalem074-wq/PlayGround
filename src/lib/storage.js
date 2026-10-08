// ─── التخزين المحلي: المشاريع + الاستهلاك اليومي + الثيم ───
const K = { projects: 'acc_projects_v1', usage: 'acc_usage_v1', theme: 'acc_theme_v1' }
export const DAILY_FREE_LIMIT = 3

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

export function getProjects() {
  try { return JSON.parse(localStorage.getItem(K.projects) || '[]') } catch { return [] }
}
export function saveProject(pkg) {
  const list = getProjects()
  const i = list.findIndex((p) => p.id === pkg.id)
  if (i >= 0) list[i] = pkg
  else list.unshift(pkg)
  localStorage.setItem(K.projects, JSON.stringify(list.slice(0, 100)))
  return list
}
export function deleteProject(id) {
  const list = getProjects().filter((p) => p.id !== id)
  localStorage.setItem(K.projects, JSON.stringify(list))
  return list
}
export function getProject(id) {
  return getProjects().find((p) => p.id === id)
}

export function getUsage() {
  try {
    const u = JSON.parse(localStorage.getItem(K.usage) || '{}')
    if (u.date !== todayKey()) return { date: todayKey(), count: 0 }
    return u
  } catch { return { date: todayKey(), count: 0 } }
}
export function remainingGenerations() {
  return Math.max(0, DAILY_FREE_LIMIT - getUsage().count)
}
export function canGenerate() {
  return remainingGenerations() > 0
}
export function consumeGeneration() {
  const u = getUsage()
  const next = { date: todayKey(), count: u.count + 1 }
  localStorage.setItem(K.usage, JSON.stringify(next))
  return next
}
export function resetUsageForTesting() {
  localStorage.removeItem(K.usage)
}

export function getTheme() {
  return localStorage.getItem(K.theme) || 'dark'
}
export function setTheme(t) {
  localStorage.setItem(K.theme, t)
}

export function fullPackageText(pkg) {
  const L = []
  L.push(`🎬 ${pkg.titles[0]}`)
  L.push(`\n⛔ الهوك (أول ٣ ثوانٍ):\n${pkg.hook}`)
  L.push(`\n📝 السكربت الكامل:\n${pkg.script}`)
  L.push(`\n🎙️ التعليق الصوتي:\n${pkg.voiceOver}`)
  L.push(`\n📌 العناوين البديلة:\n${pkg.titles.map((t, i) => `${i + 1}. ${t}`).join('\n')}`)
  L.push(`\n✍️ الكابشن:\n${pkg.caption}`)
  L.push(`\n#️⃣ الهاشتاقات:\n${pkg.hashtags.join(' ')}`)
  L.push(`\n🖼️ فكرة الثمبنيل:\n${pkg.thumbnail}`)
  L.push(`\n📣 CTA:\n${pkg.cta}`)
  return L.join('\n')
}
