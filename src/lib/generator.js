// ─── مولّد حزم المحتوى العربي (يعمل محليًا بالكامل) ───

export const PLATFORMS = {
  tiktok: { label: 'TikTok', hint: 'إيقاع سريع + هوك صادم + تكرار مشاهدة' },
  reels: { label: 'Instagram Reels', hint: 'جمالية بصرية + قيمة سريعة + حفظ ومشاركة' },
  shorts: { label: 'YouTube Shorts', hint: 'فضول معرفي + احتفاظ حتى النهاية' },
}

export const CATEGORIES = {
  ai: 'الذكاء الاصطناعي',
  tech: 'التقنية',
  gaming: 'الألعاب',
  education: 'التعليم',
  stories: 'القصص',
  business: 'البيزنس',
  general: 'عام',
}

export const TONES = {
  exciting: 'متحمس',
  professional: 'احترافي',
  funny: 'مضحك',
  mysterious: 'غامض',
  educational: 'تعليمي',
}

export const DURATIONS = [30, 60, 90]

function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return Math.abs(h)
}

function pick(arr, seed, salt = 0) {
  return arr[(seed + salt * 7919) % arr.length]
}

// mulberry32 للتنويع عند "توليد نسخة أخرى"
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const HOOKS = {
  exciting: [
    'قف! ٩٠٪ من الناس يجهلون هذا عن {topic}…',
    'هذا الفيديو سيغيّر نظرتك إلى {topic} في {dur} ثانية!',
    'لا تُكمل التمرير — سر {topic} الذي يخفيه عنك الجميع!',
  ],
  professional: [
    'في {dur} ثانية: الخلاصة العملية لموضوع {topic}.',
    '٣ حقائق مثبتة عن {topic} يجب أن يعرفها كل {audience}.',
    'تحليل مختصر: لماذا أصبح {topic} مهمًا الآن؟',
  ],
  funny: [
    'عندما تكتشف حقيقة {topic} الساعة ٣ الفجر… 🤯',
    'أنا بعد ما فهمت {topic} أخيرًا:',
    'تحذير: {topic} سيجعلك تضحك ثم تفكّر بجدية!',
  ],
  mysterious: [
    'ما الذي يخفونه عنك بخصوص {topic}؟ الحقيقة في آخر الفيديو…',
    'قصة {topic} التي لم يجرؤ أحد على روايتها كاملة.',
    'حدث شيء غريب في عالم {topic}… ولن تصدق النهاية.',
  ],
  educational: [
    'اشرح لي {topic} كأن عمري ١٠ سنوات — التحدي يبدأ الآن.',
    '٥ خطوات لفهم {topic} من الصفر حتى الاحتراف.',
    'أكبر ٣ أخطاء يقع فيها الناس مع {topic} — وكيف تتجنبها.',
  ],
}

const CTA_BY_PLATFORM = {
  tiktok: ['تابعني لأن الجزء الثاني أقوى 🔥 واكتب كلمة «أريد» وسأرسل لك التفاصيل!', 'اضغط متابعة + احفظ الفيديو — الخوارزمية ستُظهر لك الجزء الثاني!', 'شارك الفيديو مع شخص مهتم بـ {topic} واكتب رأيك في التعليقات!'],
  reels: ['احفظ هذا الريل الآن 📌 وشاركه مع صديق مهتم بـ {topic}!', 'تابع الحساب لسلسلة {topic} كاملة — تعليقك يحدد موضوع الغد!', 'اكتب «مهتم» في التعليقات وسأرسل لك الدليل الكامل!'],
  shorts: ['اشترك وفعّل الجرس 🔔 لأن القادم عن {topic} أعمق بكثير!', 'اكتب في التعليقات: هل كنت تعرف هذه المعلومة عن {topic}؟', 'شاهد الفيديو المثبت — فيه التكملة الكاملة لموضوع {topic}!'],
}

const CATEGORY_BEATS = {
  ai: ['كيف يغيّر الذكاء الاصطناعي قواعد اللعبة', 'أداة عملية تطبّقها اليوم', 'الخطأ الشائع الذي يضيّع وقتك', 'النتيجة قبل وبعد', 'الخطوة القادمة'],
  tech: ['المشكلة التي يحلّها', 'المواصفة الأهم', 'مقارنة سريعة', 'تجربة عملية', 'هل يستحق؟ الحكم النهائي'],
  gaming: ['اللقطة الأسطورية', 'الاستراتيجية السرية', 'الخطأ الذي يكلّفك الفوز', 'اللحظة الحاسمة', 'التحدي للمتابعين'],
  education: ['المفهوم ببساطة', 'المثال الواقعي', 'الخطأ الشائع', 'القاعدة الذهبية', 'اختبر نفسك'],
  stories: ['البداية والشخصية', 'العقدة والمفاجأة', 'لحظة التحول', 'الذروة', 'العبرة والنهاية'],
  business: ['الفرصة في السوق', 'الأرقام ببساطة', 'الاستراتيجية', 'الخطأ المكلف', 'خطة العمل'],
  general: ['المقدمة المثيرة', 'الفكرة الأساسية', 'الدليل والمثال', 'النقطة الأهم', 'الخلاصة'],
}

const HASHTAG_POOL = {
  ai: ['#الذكاء_الاصطناعي', '#AI', '#تقنية', '#تعلم_الآلة', '#شروحات', '#تكنولوجيا', '#المستقبل', '#أدوات_الذكاء_الاصطناعي', '#تعلم', '#اكسبلور'],
  tech: ['#تقنية', '#تكنولوجيا', '#شروحات', '#هواتف', '#تطبيقات', '#اكسبلور', '#معلومات', '#ترند', '#تعلم', '#اندرويد'],
  gaming: ['#قيمنق', '#العاب', '#gaming', '#جيمر', '#بلايستيشن', '#اكسبلور', '#تحدي', '#لقطات', '#ترند', '#العاب_العرب'],
  education: ['#تعلم', '#دراسة', '#معلومات', '#ثقافة', '#نصائح', '#تطوير_الذات', '#اكسبلور', '#تعليم', '#حقائق', '#مذاكرة'],
  stories: ['#قصص', '#قصة', '#حكايات', '#قصص_واقعية', '#اكسبلور', '#ترند', '#غموض', '#تشويق', '#روايات', '#حدث_بالفعل'],
  business: ['#بيزنس', '#ريادة_الاعمال', '#تجارة', '#تسويق', '#مشاريع', '#مال', '#استثمار', '#اكسبلور', '#نصائح_مالية', '#نجاح'],
  general: ['#اكسبلور', '#ترند', '#فوريو', '#محتوى_عربي', '#تيك_توك', '#ريلز', '#نصائح', '#معلومات', '#تعلم', '#viral'],
}

const VIRAL_ANGLES = [
  'الصدمة المعرفية: معلومة تعكس المتوقع',
  'التحدي: جرّب هذا بنفسك وصوّر النتيجة',
  'القصة الشخصية: كيف غيّر هذا حياتي',
  'المقارنة قبل/بعد: الفرق خلال ٧ أيام',
  'كشف الخرافة: ما يخبرك به الجميع خطأ',
  'الرقم الصادم: إحصائية لا تُصدَّق',
  'الكواليس: ما يحدث خلف الكاميرا',
  'الاختبار المباشر أمام المتابعين',
  'السؤال الجدلي الذي يشعل التعليقات',
  'السلسلة: الجزء الأول من ٥ أجزاء',
]

function sceneCountFor(duration) {
  return duration <= 30 ? 3 : duration <= 60 ? 5 : 7
}

function fill(tpl, topic, dur, audience) {
  return tpl.replaceAll('{topic}', topic).replaceAll('{dur}', String(dur)).replaceAll('{audience}', audience || 'المتابعين')
}

export function generatePackage(input, variantSeed = Date.now()) {
  const topic = (input.topic || '').trim()
  const audience = (input.audience || '').trim() || 'المتابعين'
  const seed = hash(topic + '|' + input.platform + '|' + input.category + '|' + input.tone + '|' + input.duration + '|' + variantSeed)
  const rand = rng(seed)
  const shufflePick = (arr) => arr[Math.floor(rand() * arr.length)]

  const dur = Number(input.duration)
  const n = sceneCountFor(dur)
  const beats = CATEGORY_BEATS[input.category] || CATEGORY_BEATS.general
  const hookTpl = shufflePick(HOOKS[input.tone] || HOOKS.exciting)
  const hook = fill(hookTpl, topic, dur, audience)

  const toneLine = {
    exciting: 'بطاقة عالية وحماس يتصاعد في كل مشهد!',
    professional: 'بأسلوب موثوق ولغة واضحة وأرقام دقيقة.',
    funny: 'بلمسة كوميدية ومواقف مضحكة قريبة من الواقع.',
    mysterious: 'بإيقاع تشويقي يكشف الأسرار تدريجيًا…',
    educational: 'بشرح مبسّط خطوة بخطوة مع أمثلة عملية.',
  }[input.tone]

  const perScene = Math.max(3, Math.round(dur / n))
  const scenes = Array.from({ length: n }, (_, i) => {
    const beat = beats[i % beats.length]
    const start = i * perScene
    const end = Math.min(dur, (i + 1) * perScene)
    return {
      n: i + 1,
      time: `${start}–${end} ث`,
      title: `المشهد ${i + 1}: ${beat}`,
      visual: `لقطة ${i + 1 === 1 ? 'افتتاحية قوية: زوم سريع على وجهك مع تعبير متفاجئ وخلفية عن «' + topic + '»' : i + 1 === n ? 'ختامية: ابتسامة واثقة وإيماءة نحو زر المتابعة مع عرض عنوان «' + topic + '»' : 'توضيحية: شاشة مقسّمة تعرض مثالًا عمليًا عن «' + topic + '» (' + beat + ') مع مؤثرات زوم خفيفة'}`,
      onScreen: i === 0 ? hook : i === n - 1 ? 'الخلاصة + تابع للجزء الثاني 🔥' : `نقطة ${i + 1}: ${beat} ✅`,
      voice: i === 0
        ? `${hook} ${toneLine} اليوم نتكلم عن ${topic} بشكل مختلف تمامًا.`
        : i === n - 1
          ? `الخلاصة يا ${audience}: ${beat} بخصوص ${topic}. جرّبها اليوم وشاركني النتيجة في التعليقات!`
          : `النقطة ${i === 1 ? 'الأولى' : i === 2 ? 'الثانية' : i === 3 ? 'الثالثة' : i === 4 ? 'الرابعة' : 'الخامسة'}: ${beat} في موضوع ${topic} — ركّز معي لأن هذه أهم جزئية.`,
      imagePrompt: `Vertical 9:16 short-form video still, ${i === 0 ? 'shocked creator face close-up, fast zoom blur, bold Arabic-style title space' : i === n - 1 ? 'confident smiling creator pointing at follow button, glowing background' : 'split-screen infographic explaining the concept'}, topic: "${topic}", ${input.category} aesthetic, cinematic lighting, ultra detailed, mobile-first composition --ar 9:16`,
    }
  })

  const script = scenes.map((s) => `【المشهد ${s.n} | ${s.time}】\n🎬 بصري: ${s.visual}\n🗣️ تعليق صوتي: ${s.voice}`).join('\n\n')
  const voiceOver = scenes.map((s) => `(${s.time}) ${s.voice}`).join('\n')

  const titles = [
    `${topic}: السر الذي لا يخبرك به أحد! 🤯`,
    `جرّبت ${topic} لمدة ٧ أيام… النتيجة صدمتني!`,
    `٣ أخطاء قاتلة في ${topic} — هل تقع فيها؟`,
  ]
  // تنويع بسيط حسب variant
  if (seed % 3 === 1) titles.reverse()
  if (seed % 3 === 2) { const t = titles[0]; titles[0] = titles[1]; titles[1] = t }

  const platformLabel = PLATFORMS[input.platform]?.label || 'TikTok'
  const caption = `${hook}\n\nفي هذا الفيديو أشرح لك ${topic} ${toneLine}\n\n📌 احفظ الفيديو وشاركه مع مهتم!\n👇 اكتب رأيك: ما أكثر نقطة فاجأتك؟\n\nمصمم خصيصًا لمنصة ${platformLabel} ⏱️ ${dur} ثانية`

  const pool = HASHTAG_POOL[input.category] || HASHTAG_POOL.general
  const hashtags = [...pool].sort(() => rand() - 0.5).slice(0, 7)

  const thumbnail = `وجه متفاجئ + عنوان عريض من كلمتين: «سر ${topic.slice(0, 14)}» بخط أصفر على خلفية داكنة متباينة، سهم أحمر يشير للعنوان، نسبة 9:16، تباين عالٍ، مساحة علوية فارغة للنص.`

  const ctaTpl = shufflePick(CTA_BY_PLATFORM[input.platform] || CTA_BY_PLATFORM.tiktok)
  const cta = fill(ctaTpl, topic, dur, audience)

  return {
    id: 'p_' + seed.toString(36) + '_' + Math.floor(rand() * 1e6).toString(36),
    createdAt: new Date().toISOString(),
    input: { ...input, duration: dur },
    hook, script, scenes, titles, caption, hashtags, thumbnail, cta, voiceOver,
    toneLine,
  }
}

export function regenerateField(pkg, field, index = null) {
  const seed = hash(pkg.id + field + (index ?? '') + Date.now())
  const rand = rng(seed)
  const { topic } = pkg.input
  const dur = pkg.input.duration
  const audience = pkg.input.audience || 'المتابعين'
  const R = (arr) => arr[Math.floor(rand() * arr.length)]
  const F = (t) => fill(t, topic, dur, audience)

  const clone = JSON.parse(JSON.stringify(pkg))
  if (field === 'hook') {
    clone.hook = F(R(HOOKS[pkg.input.tone] || HOOKS.exciting))
    clone.scenes[0].onScreen = clone.hook
  } else if (field === 'titles') {
    const alts = [
      `كل ما تحتاج معرفته عن ${topic} في ${dur} ثانية! ⚡`,
      `${topic} للمبتدئين: ابدأ من هنا 👇`,
      `لماذا يتحدث الجميع عن ${topic}؟ الإجابة هنا!`,
      `توقّف عن تجاهل ${topic} — إليك السبب!`,
    ]
    clone.titles = [R(alts), R(alts), R(alts)]
  } else if (field === 'caption') {
    clone.caption = `${F(R(HOOKS[pkg.input.tone] || HOOKS.exciting))}\n\n${topic} باختصار ${clone.toneLine}\n\n📌 احفظ + شارك + تابع للمزيد!\n👇 سؤال اليوم: ما تجربتك مع ${topic}؟`
  } else if (field === 'hashtags') {
    const pool = HASHTAG_POOL[pkg.input.category] || HASHTAG_POOL.general
    clone.hashtags = [...pool].sort(() => rand() - 0.5).slice(0, 5 + Math.floor(rand() * 4))
  } else if (field === 'thumbnail') {
    const alts = [
      `انقسام قبل/بعد عن «${topic.slice(0, 16)}» مع سهم أصفر ضخم وخلفية متدرجة بنفسجية.`,
      `يد تشير إلى دائرة حمراء حول كلمة «${topic.slice(0, 12)}» بخط عريض أبيض على أسود.`,
      `لقطة مقرّبة متفاجئة + ٣ نجوم ذهبية + عنوان «لا تفوّت ${topic.slice(0, 10)}».`,
    ]
    clone.thumbnail = R(alts)
  } else if (field === 'cta') {
    clone.cta = F(R(CTA_BY_PLATFORM[pkg.input.platform] || CTA_BY_PLATFORM.tiktok))
  } else if (field === 'scene' && index != null && clone.scenes[index]) {
    const s = clone.scenes[index]
    const visuals = [
      `زاوية جديدة: تصوير من أعلى ليدك تشير إلى مخطط «${topic}» مع إضاءة نيون.`,
      `مونتاج سريع: ٣ لقطات متتالية عن «${topic}» مع انتقالات زوم.`,
      `خلفية متحركة ضبابية + نص كبير متحرك يعرض خلاصة المشهد.`,
    ]
    s.visual = R(visuals)
    s.voice = s.voice.replace(/\s— ركّز.*$/, '') + ' — وهذه النسخة المحدّثة أقوى وأوضح!'
  } else if (field === 'script' || field === 'voiceOver') {
    // إعادة توليد نسخة كاملة جديدة بنفس المدخلات
    return generatePackage(pkg.input, Date.now())
  }
  return clone
}

// ─── مولّد الأفكار (Batch: 10 أفكار) ───
const IDEA_TOPICS = {
  ai: ['أدوات ذكاء اصطناعي مجانية', 'الربح من الذكاء الاصطناعي', 'أخطاء شائعة مع ChatGPT', 'صناعة فيديو بالذكاء الاصطناعي', 'مستقبل الوظائف مع AI'],
  tech: ['تطبيقات مخفية في هاتفك', 'إعدادات تسرّع جهازك', 'مقارنة هواتف 2026', 'اختراقات إنتاجية', 'أسرار الكاميرا'],
  gaming: ['أفضل إعدادات للفوز', 'أخطاء المبتدئين', 'أقوى الشخصيات', 'تحدي 24 ساعة', 'لقطات مستحيلة'],
  education: ['الحفظ السريع', 'التركيز العميق', 'لغات بسهولة', 'الرياضيات بمتعة', 'مهارات الامتحانات'],
  stories: ['قصص نجاح ملهمة', 'ألغاز غامضة', 'قصص واقعية مرعبة', 'تحولات مدهشة', 'أسرار تاريخية'],
  business: ['مشاريع بدون رأس مال', 'التسويق بالمحتوى', 'أخطاء التجار', 'مصادر دخل passive', 'قصص شركات فشلت'],
  general: ['حقائق نفسية', 'عادات الناجحين', 'تحديات ممتعة', 'معلومات غريبة', 'نصائح الحياة'],
}

export function generateBatchIdeas({ category = 'general', tone = 'exciting', platform = 'tiktok' } = {}, seedBase = Date.now()) {
  const topics = IDEA_TOPICS[category] || IDEA_TOPICS.general
  const rand = rng(hash(category + tone + platform + seedBase))
  const R = (arr) => arr[Math.floor(rand() * arr.length)]
  return Array.from({ length: 10 }, (_, i) => {
    const topic = topics[i % topics.length]
    const angle = R(VIRAL_ANGLES)
    const hook = fill(R(HOOKS[tone] || HOOKS.exciting), topic, 60, 'المتابعين')
    return {
      id: `idea_${seedBase}_${i}`,
      n: i + 1,
      title: `${topic}: ${R(['الجزء الذي يخفيه عنك الجميع', 'دليلك الكامل في دقيقة', '٥ أسرار لا تعرفها', 'التجربة الكاملة أمامك', 'الطريقة الصحيحة خطوة بخطوة'])}`,
      hook,
      topic,
      viralAngle: angle,
      description: `فيديو ${i + 1}: نبدأ بهوك «${hook.slice(0, 40)}…» ثم نعرض ${topic} بزاوية «${angle}» — مناسب لمنصة ${PLATFORMS[platform]?.label || platform} ويستهدف التفاعل العالي (تعليق + حفظ + مشاركة).`,
    }
  })
}
