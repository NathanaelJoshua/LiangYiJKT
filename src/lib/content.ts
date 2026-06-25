// Realistic SG placeholder content for Liang Yi TCM.
// Images use picsum.photos seeds so they are stable until real assets land in /public.

export const img = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

/* ---------- i18n ---------- */
export type Lang = "en" | "id";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "id", label: "ID" },
];

/** A string with English + Bahasa Indonesia variants. */
export interface Localized {
  en: string;
  id: string;
}

/** Build a Localized value; id defaults to en until translated. */
export const loc = (en: string, id?: string): Localized => ({ en, id: id ?? en });

/** Resolve a localized value (or plain string) to the chosen language. */
export const tr = (v: Localized | string | undefined, lang: Lang): string => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  return v[lang] || v.en;
};

export const BRAND = {
  name: "Liang Yi TCM",
  chinese: "良醫中醫",
  est: "Est. 2016",
  tagline: loc("Our Greatest Wealth is Health"),
  positioning: loc("Result-oriented TCM solutions for your health needs."),
  cta: "Book an Appointment",
  email: "hello@liangyitcm.sg",
  phone: "+65 6464 9413",
  whatsapp: "+65 8988 2413",
  socials: {
    instagram: "https://instagram.com/liangyitcm",
    facebook: "https://facebook.com/liangyitcm",
    tiktok: "https://tiktok.com/@liangyitcm",
    youtube: "https://youtube.com/@liangyitcm",
  },
};

export interface ServiceFAQ {
  q: Localized;
  a: Localized;
}

export interface ServiceBenefit {
  title: Localized;
  copy: Localized;
}

export interface Service {
  id: string;
  name: Localized;
  scope: Localized;
  description: Localized;
  image: string;
  hoverImage: string;
  whatIs: Localized;
  conditions: Localized[];
  benefits: ServiceBenefit[];
  faqs: ServiceFAQ[];
}

export const getService = (id: string) => services.find((s) => s.id === id);

const rawServices = [
  {
    id: "consultation",
    name: "Consultation",
    scope: "Diagnosis & herbal prescription",
    description:
      "Pulse and tongue diagnosis with a registered physician, paired with a tailored herbal formula calibrated to your constitution.",
    image: img("liangyi-consult", 1200, 1500),
    hoverImage: img("liangyi-consult2", 800, 1000),
    whatIs:
      "A TCM consultation begins with pattern differentiation — reading your pulse, tongue, history and lifestyle to understand the root imbalance behind your symptoms. From this picture, a physician prescribes a herbal formula and care plan made for your body, not a template.",
    conditions: [
      "Fatigue & low energy",
      "Digestive complaints",
      "Sleep disturbance",
      "Hormonal imbalance",
      "Weak immunity",
      "Stress & anxiety",
    ],
    benefits: [
      { title: "Root-cause clarity", copy: "Understand the underlying pattern, not just the surface symptom." },
      { title: "A tailored formula", copy: "Herbal medicine calibrated to your constitution and adjusted over time." },
      { title: "A clear plan", copy: "Know what to expect, how long it may take, and how progress is measured." },
    ],
    faqs: [
      { q: "How long is a first consultation?", a: "Typically 45–60 minutes, covering a full intake, pulse and tongue diagnosis, and your initial plan." },
      { q: "Do I need to prepare?", a: "Avoid coffee, brushing your tongue or eating strongly coloured foods just before, as these affect tongue diagnosis." },
      { q: "Will I receive herbs the same day?", a: "In most cases, yes — your prescription is dispensed at the clinic after your consultation." },
    ],
  },
  {
    id: "tcm-treatments",
    name: "TCM Treatments",
    scope: "Acupuncture · cupping · tuina",
    description:
      "Time-tested modalities — acupuncture, cupping and tuina — applied with modern hygiene and precision to restore flow and balance.",
    image: img("liangyi-acu", 1200, 1500),
    hoverImage: img("liangyi-acu2", 800, 1000),
    whatIs:
      "TCM treatments use fine, sterile needles, gentle suction and structured manual therapy to move Qi and blood, release tension and restore balance. From a modern view, they activate the nervous system, improve circulation and prompt the body's own pain-relieving response.",
    conditions: [
      "Back & neck pain",
      "Headaches & migraines",
      "Muscle tension",
      "Joint stiffness",
      "Poor circulation",
      "Stress & fatigue",
    ],
    benefits: [
      { title: "Drug-free relief", copy: "Targeted treatment that reduces symptoms and reliance on pain medication." },
      { title: "Restored flow", copy: "Acupuncture and cupping release tension and improve circulation." },
      { title: "Hands-on recovery", copy: "Tuina realigns and relaxes muscle and connective tissue." },
    ],
    faqs: [
      { q: "Is acupuncture safe?", a: "Yes — when performed by a trained, licensed and qualified TCM physician using single-use sterile needles." },
      { q: "Does it hurt?", a: "Most people feel only a mild sensation. Needles are far finer than those used for injections." },
      { q: "How many sessions will I need?", a: "It varies by condition; many patients notice improvement within a handful of sessions." },
    ],
  },
  {
    id: "wellness-therapy",
    name: "Wellness Therapy",
    scope: "Preventive & restorative care",
    description:
      "Seasonal tonics, moxibustion and guided wellness programmes that build resilience and sustain everyday vitality.",
    image: img("liangyi-well", 1200, 1500),
    hoverImage: img("liangyi-well2", 800, 1000),
    whatIs:
      "Wellness therapy is preventive care — strengthening the body before illness takes hold. Through seasonal tonics, moxibustion and tailored programmes, we support immunity, energy and resilience so you feel well, not just not-unwell.",
    conditions: [
      "Low immunity",
      "Chronic fatigue",
      "Cold hands & feet",
      "Seasonal sensitivity",
      "Burnout",
      "Slow recovery",
    ],
    benefits: [
      { title: "Lasting resilience", copy: "Build the body's baseline so it weathers stress and seasons better." },
      { title: "Sustained energy", copy: "Address the roots of fatigue rather than masking it." },
      { title: "Preventive habits", copy: "Guidance on diet and lifestyle tuned to your constitution." },
    ],
    faqs: [
      { q: "Who is wellness therapy for?", a: "Anyone wanting to maintain health, recover from a demanding period, or prevent recurring issues." },
      { q: "What is moxibustion?", a: "A warming therapy using the herb mugwort to stimulate acupoints and support circulation and immunity." },
      { q: "How often should I come?", a: "Many patients visit seasonally, with a physician tailoring frequency to your needs." },
    ],
  },
  {
    id: "women-children",
    name: "For Women & Children",
    scope: "Fertility · postpartum · paediatric",
    description:
      "Gentle, evidence-informed protocols for menstrual health, fertility support, confinement recovery and paediatric tuina.",
    image: img("liangyi-women", 1200, 1500),
    hoverImage: img("liangyi-women2", 800, 1000),
    whatIs:
      "Care for every stage — from menstrual health and fertility to postpartum recovery and gentle paediatric tuina. Protocols are gentle, evidence-informed and adapted to the unique needs of women and children.",
    conditions: [
      "Irregular cycles",
      "Menstrual cramps",
      "Fertility support",
      "Postpartum recovery",
      "Paediatric digestion",
      "Childhood immunity",
    ],
    benefits: [
      { title: "Cycle support", copy: "Address menstrual and hormonal patterns at the root." },
      { title: "Fertility & confinement", copy: "Considered care across the reproductive journey." },
      { title: "Gentle for children", copy: "Needle-free paediatric tuina suited to little ones." },
    ],
    faqs: [
      { q: "Is treatment safe during pregnancy?", a: "Certain treatments are, when overseen by a qualified physician. Always inform us if you are or may be pregnant." },
      { q: "What is paediatric tuina?", a: "A gentle, needle-free massage technique for children, often used for digestion and immunity." },
      { q: "Can TCM support IVF?", a: "Many patients use TCM alongside fertility treatment; we coordinate care conservatively." },
    ],
  },
  {
    id: "face-therapy",
    name: "Face Therapy",
    scope: "Cosmetic acupuncture & lifting",
    description:
      "Facial acupuncture and meridian massage that stimulate collagen, ease tension and restore a luminous, balanced complexion.",
    image: img("liangyi-face", 1200, 1500),
    hoverImage: img("liangyi-face2", 800, 1000),
    whatIs:
      "Cosmetic acupuncture and meridian massage work with the face's natural structure — stimulating collagen, easing muscular tension and improving circulation for a brighter, more balanced complexion, without injections or downtime.",
    conditions: [
      "Dull complexion",
      "Fine lines",
      "Facial puffiness",
      "Jaw tension",
      "Uneven tone",
      "Stress in the face",
    ],
    benefits: [
      { title: "Natural radiance", copy: "Stimulates collagen and circulation for a healthy glow." },
      { title: "Released tension", copy: "Eases jaw and facial muscle tightness." },
      { title: "No downtime", copy: "A gentle, injection-free approach you can return to work after." },
    ],
    faqs: [
      { q: "How soon will I see results?", a: "Many notice a brighter, calmer complexion after a few sessions, with effects building over a course." },
      { q: "Is it painful?", a: "Needles are extremely fine; most clients find the session relaxing." },
      { q: "How long does a session take?", a: "About 60 minutes, including facial massage and acupuncture." },
    ],
  },
  {
    id: "pain-management",
    name: "Pain Management",
    scope: "Musculoskeletal & chronic pain",
    description:
      "Targeted relief for back, neck, joint and sports injuries through acupuncture, electro-stimulation and structured tuina.",
    image: img("liangyi-pain", 1200, 1500),
    hoverImage: img("liangyi-pain2", 800, 1000),
    whatIs:
      "A focused approach to musculoskeletal and chronic pain. Combining acupuncture, electro-stimulation and structured tuina, we target the source of pain to restore movement and reduce reliance on medication.",
    conditions: [
      "Chronic back pain",
      "Neck & shoulder pain",
      "Sciatica",
      "Frozen shoulder",
      "Sports injuries",
      "Osteoarthritis",
    ],
    benefits: [
      { title: "Targeted relief", copy: "Treatment aimed at the source of pain, not just the symptom." },
      { title: "Restored movement", copy: "Improve range of motion and recover function faster." },
      { title: "Less medication", copy: "A drug-free path that can reduce reliance on painkillers." },
    ],
    faqs: [
      { q: "What conditions respond best?", a: "Back, neck, joint and sports-related pain often respond well, especially with a consistent course." },
      { q: "What is electro-acupuncture?", a: "A gentle electrical current applied through needles to enhance pain relief and muscle recovery." },
      { q: "When will I feel better?", a: "Some feel relief immediately; lasting change usually builds over several sessions." },
    ],
  },
];

// Wrap the English seed into the bilingual shape (id defaults to en until translated).
export const services: Service[] = rawServices.map((s) => ({
  id: s.id,
  image: s.image,
  hoverImage: s.hoverImage,
  name: loc(s.name),
  scope: loc(s.scope),
  description: loc(s.description),
  whatIs: loc(s.whatIs),
  conditions: s.conditions.map((c) => loc(c)),
  benefits: s.benefits.map((b) => ({ title: loc(b.title), copy: loc(b.copy) })),
  faqs: s.faqs.map((f) => ({ q: loc(f.q), a: loc(f.a) })),
}));

export interface Step {
  no: string;
  title: string;
  copy: string;
  image: string;
}

export const journey: Step[] = [
  {
    no: "1",
    title: "Consult",
    copy: "We listen first. A thorough intake of lifestyle, history and symptoms frames the whole picture before any treatment begins.",
    image: img("journey-consult", 1200, 900),
  },
  {
    no: "2",
    title: "Diagnose",
    copy: "Pulse, tongue and pattern differentiation pinpoint the root imbalance — not just the surface complaint.",
    image: img("journey-diagnose", 1200, 900),
  },
  {
    no: "3",
    title: "Treat",
    copy: "A precise blend of acupuncture, herbs and manual therapy is applied and adjusted session to session.",
    image: img("journey-treat", 1200, 900),
  },
  {
    no: "4",
    title: "Maintain",
    copy: "Seasonal reviews and home guidance keep results compounding long after symptoms resolve.",
    image: img("journey-maintain", 1200, 900),
  },
];

export interface PriceItem {
  name: Localized;
  note: Localized;
  price: string;
}

export interface PriceGroup {
  title: Localized;
  items: PriceItem[];
}

const rawPricing = [
  {
    title: "Consultations",
    items: [
      { name: "First consultation", note: "Pulse & tongue diagnosis, treatment plan", price: "$38" },
      { name: "Follow-up consultation", note: "Review & prescription adjustment", price: "$28" },
      { name: "Teleconsultation", note: "Video review for existing patients", price: "$25" },
    ],
  },
  {
    title: "Treatments",
    items: [
      { name: "Acupuncture", note: "Per session, 30–40 min", price: "from $45" },
      { name: "Cupping", note: "Fire or vacuum, per session", price: "from $35" },
      { name: "Tuina massage", note: "30 minutes", price: "from $50" },
      { name: "Moxibustion", note: "Per session", price: "from $40" },
      { name: "Facial acupuncture", note: "Cosmetic, 60 min", price: "from $90" },
    ],
  },
  {
    title: "Herbal medicine",
    items: [
      { name: "Raw herb formula", note: "Prescribed per day of medication", price: "from $6" },
      { name: "Concentrated granules", note: "Convenient daily sachets", price: "from $8" },
    ],
  },
];

export const pricing: PriceGroup[] = rawPricing.map((g) => ({
  title: loc(g.title),
  items: g.items.map((it) => ({ name: loc(it.name), note: loc(it.note), price: it.price })),
}));

export interface Plan {
  name: Localized;
  price: string;
  cadence: Localized;
  blurb: Localized;
  features: Localized[];
  featured?: boolean;
}

const rawPlans = [
  {
    name: "First Visit",
    price: "$78",
    cadence: "one-time",
    blurb: "Everything you need to begin — diagnosis to first treatment.",
    features: [
      "Full physician consultation",
      "One acupuncture or tuina session",
      "Personalised herbal prescription",
      "Lifestyle & dietary guidance",
    ],
    featured: true,
  },
  {
    name: "Care Package",
    price: "$199",
    cadence: "5 sessions",
    blurb: "A structured course for results that build session on session.",
    features: [
      "Five treatment sessions",
      "Progress review each visit",
      "10% off herbal medicine",
      "Priority booking islandwide",
    ],
  },
];

export const plans: Plan[] = rawPlans.map((p) => ({
  price: p.price,
  featured: p.featured,
  name: loc(p.name),
  cadence: loc(p.cadence),
  blurb: loc(p.blurb),
  features: p.features.map((f) => loc(f)),
}));

export interface Physician {
  name: string;
  credentials: string;
  branch: string;
  focus: string;
  image: string;
}

/** Stable dummy portrait photos (real faces) until real physician photos land. */
const portrait = (n: number) => `https://i.pravatar.cc/600?img=${n}`;

export const physicians: Physician[] = [
  { name: "Physician Tan Wei Ling", credentials: "MMed (TCM)", branch: "Thomson Plaza", focus: "Women's health & fertility", image: portrait(45) },
  { name: "Physician Lim Jun Hao", credentials: "BSc (TCM)", branch: "Tampines 1", focus: "Pain management & sports injury", image: portrait(12) },
  { name: "Physician Goh Mei Xin", credentials: "MMed (TCM)", branch: "Great World", focus: "Dermatology & face therapy", image: portrait(47) },
  { name: "Physician Ng Kai Feng", credentials: "BSc (TCM)", branch: "NEX / Seletar Mall", focus: "Paediatrics & digestive health", image: portrait(13) },
  { name: "Physician Chua Yi Xuan", credentials: "MMed (TCM)", branch: "Funan Mall", focus: "Acupuncture & chronic pain", image: portrait(32) },
  { name: "Physician Ong Zhi Hao", credentials: "BSc (TCM)", branch: "Hillion Mall", focus: "Sports recovery & osteopathy", image: portrait(8) },
  { name: "Physician Foo Hui Shan", credentials: "MMed (TCM)", branch: "PLQ Mall", focus: "Migraines & sleep disorders", image: portrait(20) },
  { name: "Physician Teo Jia Hui", credentials: "BSc (TCM)", branch: "i12 Katong", focus: "Wellness therapy & tuina", image: portrait(33) },
];

export type Region = "Central" | "North-east" | "East" | "West";

export const regions: Region[] = ["Central", "North-east", "East", "West"];

export interface Clinic {
  region: Region;
  name: string;
  address: string;
  unit: string;
  postal: string;
  phone: string;
  whatsapp: string;
  hours: string;
  consult: string;
}

const mapsLink = (q: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export const clinics: Clinic[] = [
  { region: "Central", name: "Thomson Plaza", address: "301 Upper Thomson Road", unit: "#03-27", postal: "Singapore 574408", phone: "+65 6464 9413", whatsapp: "+65 8988 2413", hours: "10am – 10pm", consult: "11am – 8pm" },
  { region: "Central", name: "United Square", address: "101 Thomson Road", unit: "#B1-39/40", postal: "Singapore 307591", phone: "+65 6530 3131", whatsapp: "+65 8669 3762", hours: "10am – 10pm", consult: "11am – 8pm" },
  { region: "Central", name: "Shaw Plaza", address: "360 Balestier Road", unit: "#01-07", postal: "Singapore 329783", phone: "+65 6322 4913", whatsapp: "+65 9058 7686", hours: "10am – 10pm", consult: "11am – 8pm" },
  { region: "Central", name: "Funan Mall", address: "107 North Bridge Road", unit: "#B1-06", postal: "Singapore 179105", phone: "+65 6970 9894", whatsapp: "+65 9178 3413", hours: "10am – 10pm", consult: "11am – 8pm" },
  { region: "Central", name: "Great World — Basement", address: "1 Kim Seng Promenade", unit: "#B2-129", postal: "Singapore 237994", phone: "+65 6732 4913", whatsapp: "+65 9725 2413", hours: "10am – 10pm", consult: "11am – 8pm" },
  { region: "Central", name: "Great World — Level 3", address: "1 Kim Seng Promenade", unit: "#03-101", postal: "Singapore 237994", phone: "+65 6970 9894", whatsapp: "+65 9178 3413", hours: "10am – 10pm", consult: "11am – 8pm" },
  { region: "North-east", name: "The Seletar Mall — Level 2", address: "33 Sengkang West Avenue", unit: "#02-24", postal: "Singapore 797653", phone: "+65 6243 9313", whatsapp: "+65 9297 0013", hours: "10am – 10pm", consult: "10am – 9pm" },
  { region: "North-east", name: "The Seletar Mall — Atrium", address: "33 Sengkang West Avenue", unit: "#02-03/04", postal: "Singapore 797653", phone: "+65 6970 6894", whatsapp: "+65 9720 1413", hours: "10am – 10pm", consult: "11am – 8pm" },
  { region: "East", name: "Tampines 1", address: "10 Tampines Central 1", unit: "#05-23/24", postal: "Singapore 529536", phone: "+65 6970 7413", whatsapp: "+65 9231 0413", hours: "10am – 10pm", consult: "10am – 9pm" },
  { region: "East", name: "PLQ Mall", address: "10 Paya Lebar Road", unit: "#B1-21", postal: "Singapore 409057", phone: "+65 6970 8913", whatsapp: "+65 9089 8276", hours: "10am – 10pm", consult: "11am – 8pm" },
  { region: "East", name: "i12 Katong", address: "112 East Coast Road", unit: "#03-12", postal: "Singapore 428802", phone: "+65 6970 6868", whatsapp: "+65 9626 2413", hours: "10am – 10pm", consult: "11am – 8pm" },
  { region: "West", name: "Hillion Mall", address: "17 Petir Road", unit: "#02-11", postal: "Singapore 678278", phone: "+65 6970 8686", whatsapp: "+65 8028 9413", hours: "10am – 10pm", consult: "11am – 8pm" },
];

export const clinicMaps = (c: Clinic) =>
  mapsLink(`Liang Yi TCM ${c.name} ${c.address} ${c.postal}`);

export const waLink = (num: string) =>
  `https://wa.me/${num.replace(/[^0-9]/g, "")}`;

export const telLink = (num: string) => `tel:${num.replace(/[^0-9+]/g, "")}`;

export interface Testimonial {
  quote: Localized;
  name: string;
  meta: Localized;
  image: string;
}

const rawTestimonials = [
  { quote: "Six sessions and my chronic back pain is finally manageable. The physicians explain everything clearly.", name: "Rachel Tan", meta: "Patient · Tampines", image: portrait(31) },
  { quote: "Helped me through my fertility journey with so much patience. Forever grateful to the team.", name: "Priya Subramaniam", meta: "Patient · NEX", image: portrait(45) },
  { quote: "Modern, clean and professional — nothing like the old TCM halls. The results speak for themselves.", name: "Daniel Wong", meta: "Patient · VivoCity", image: portrait(12) },
  { quote: "My migraines dropped from weekly to almost none. The acupuncture genuinely works wonders.", name: "Hui Min Lee", meta: "Patient · Jurong Point", image: portrait(20) },
  { quote: "Face therapy gave me a real glow before my wedding. I'd recommend the team to anyone.", name: "Cheryl Aw", meta: "Patient · Bugis", image: portrait(47) },
  { quote: "They treat the root, not just the symptoms. My digestion has never been better.", name: "Marcus Lim", meta: "Patient · AMK Hub", image: portrait(8) },
  { quote: "Booking on WhatsApp is so easy and the physicians actually listen. A refreshing experience.", name: "Germaine Koh", meta: "Patient · Great World", image: portrait(32) },
  { quote: "After my sports injury, their tuina and acupuncture had me back training in weeks.", name: "Faizal Rahman", meta: "Patient · PLQ Mall", image: portrait(13) },
];

export const testimonials: Testimonial[] = rawTestimonials.map((t) => ({
  name: t.name,
  image: t.image,
  quote: loc(t.quote),
  meta: loc(t.meta),
}));

export interface Article {
  slug: string;
  title: Localized;
  category: Localized;
  tags: Localized[];
  readTime: string;
  date: string;
  author: string;
  authorImage: string;
  excerpt: Localized;
  image: string;
  body: Localized[];
}

const rawArticles = [
  {
    slug: "cooling-foods-singapore-heat",
    title: "Cooling foods for Singapore's heat: a TCM guide",
    category: "Nutrition",
    tags: ["Healthy Food", "Wellness"],
    readTime: "5 min",
    date: "May 2026",
    author: "Physician Tan Wei Ling",
    authorImage: img("author-tan", 200, 200),
    excerpt:
      "In TCM, the food on your plate is the first medicine. Here's how to eat with the climate rather than against it.",
    image: img("art-cooling", 1600, 1000),
    body: [
      "Singapore's heat is relentless, and in Traditional Chinese Medicine that persistent warmth can tip the body toward an excess of internal heat — showing up as restless sleep, breakouts, irritability or a coated tongue.",
      "The remedy isn't dramatic. It begins with what you eat. Cooling foods — winter melon, cucumber, mung bean, chrysanthemum, watercress — gently clear heat without depleting the digestion the way iced drinks do.",
      "A common misconception is that cold drinks cool you down. In TCM they actually strain the spleen and stomach, weakening the very system that regulates your internal temperature. Room-temperature barley water or a warm chrysanthemum tea does the job far better.",
      "Balance is everything. Even cooling foods, eaten to excess, can dampen digestion. The aim is a plate that answers the season — light, hydrating, and varied — adjusted as your own constitution requires.",
    ],
  },
  {
    slug: "pulse-tells-more-than-blood-test",
    title: "Why your pulse tells more than your blood test",
    category: "Diagnosis",
    tags: ["Diagnosis", "Pulse Reading"],
    readTime: "7 min",
    date: "Apr 2026",
    author: "Physician Lim Jun Hao",
    authorImage: img("author-lim", 200, 200),
    excerpt:
      "Pulse diagnosis reads the body as a living system. Here's what a physician feels for at your wrist.",
    image: img("art-pulse", 1600, 1000),
    body: [
      "When a physician rests three fingers on your wrist, they aren't simply counting beats. They are reading depth, rhythm, strength and quality across distinct positions — each mapped to a different organ system.",
      "A pulse can be slippery, wiry, thin or flooding. These textures describe patterns long before they become measurable on a lab report — a body trending toward imbalance rather than one already in disease.",
      "This is the strength of pulse diagnosis: it is functional, not just structural. It tells us how your system is behaving today, which is exactly what guides a tailored herbal prescription.",
      "It doesn't replace modern testing — it complements it. The two together give a fuller picture than either alone.",
    ],
  },
  {
    slug: "acupuncture-for-desk-necks",
    title: "Acupuncture for desk-bound necks and shoulders",
    category: "Pain",
    tags: ["Pain Relief", "Posture"],
    readTime: "6 min",
    date: "Mar 2026",
    author: "Physician Lim Jun Hao",
    authorImage: img("author-lim", 200, 200),
    excerpt:
      "Hours at a screen leave the neck and shoulders locked. Acupuncture targets the knots that stretching can't reach.",
    image: img("art-neck", 1600, 1000),
    body: [
      "Modern work keeps us still for hours, head tilted forward, shoulders creeping toward the ears. Over time the muscles of the neck and upper back hold tension as taut bands — what we call trigger points.",
      "Acupuncture reaches these bands directly. A fine needle placed into a knotted point prompts the muscle to release in a way that surface massage often can't sustain.",
      "Most desk-related tension responds within a handful of sessions, especially when paired with simple posture adjustments and movement breaks.",
      "The goal is not just relief but resilience — a neck that recovers faster from the demands you put on it.",
    ],
  },
  {
    slug: "postpartum-confinement-reimagined",
    title: "Postpartum confinement, reimagined for modern mothers",
    category: "Women",
    tags: ["Women's Health", "Postpartum"],
    readTime: "8 min",
    date: "Feb 2026",
    author: "Physician Tan Wei Ling",
    authorImage: img("author-tan", 200, 200),
    excerpt:
      "Confinement is one of TCM's most enduring traditions. Here's how it adapts — sensibly — to modern life.",
    image: img("art-postpartum", 1600, 1000),
    body: [
      "The postpartum month is, in TCM, a window for deep recovery. The body has given a great deal, and the traditions of confinement exist to replenish what was spent — warmth, blood, and rest.",
      "Much of the classical guidance still holds: warm, nourishing foods, protection from cold and wind, and genuine rest. Other rules can be loosened with care — strict no-bathing rules, for instance, give way to warm showers and good hygiene.",
      "Herbal tonics are tailored to each mother's recovery rather than applied as a single template. What suits one constitution may overwhelm another.",
      "Reimagined sensibly, confinement isn't restriction — it's a structured, supported beginning to motherhood.",
    ],
  },
];

// Wrap the English seed into the bilingual shape (id defaults to en until translated).
export const articles: Article[] = rawArticles.map((a) => ({
  slug: a.slug,
  readTime: a.readTime,
  date: a.date,
  author: a.author,
  authorImage: a.authorImage,
  image: a.image,
  title: loc(a.title),
  category: loc(a.category),
  excerpt: loc(a.excerpt),
  tags: a.tags.map((t) => loc(t)),
  body: a.body.map((p) => loc(p)),
}));

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

/** Reading time estimated from total words in the body (~200 wpm). */
export const readingTime = (body: Localized[]): string => {
  const words = body.map((p) => p.en).join(" ").trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
};

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Locations", href: "/clinic-locations" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/** Quick-access service categories surfaced in the hero. */
export const heroCategories: string[] = [
  "Acupuncture",
  "Back & Shoulder Pain",
  "Sports Injuries",
  "TCM Osteopathy",
  "Device Therapy",
  "Women & Paediatric",
];

export interface Stat {
  value: string;
  label: string;
}

export const aboutStats: Stat[] = [
  { value: "9+", label: "Years as an awarded TCM centre" },
  { value: "30+", label: "Qualified TCM physicians" },
  { value: "12", label: "Convenient clinic locations" },
  { value: "30k+", label: "Patients cared for" },
];

export interface Condition {
  title: string;
  copy: string;
  treats: string[];
}

export const conditions: Condition[] = [
  {
    title: "Pain management",
    copy: "Targeted relief for the aches modern life creates — restoring movement, not just masking discomfort.",
    treats: ["Back pain", "Neck & shoulder", "Joint pain", "Sciatica"],
  },
  {
    title: "Sports injuries",
    copy: "Faster, fuller recovery for active bodies, combining acupuncture, tuina and device therapy.",
    treats: ["Ankle sprains", "Knee pain", "Wrist strain", "Muscle tension"],
  },
  {
    title: "Headaches & migraines",
    copy: "We trace recurring headaches to their root pattern and treat the cause, not the symptom.",
    treats: ["Tension headache", "Migraine", "Vertigo", "Insomnia"],
  },
  {
    title: "Women & fertility",
    copy: "Gentle, evidence-informed support across the reproductive journey, from cycles to confinement.",
    treats: ["Fertility support", "Menstrual health", "Postpartum", "Paediatric tuina"],
  },
];

export interface Promotion {
  title: string;
  price: string;
  was?: string;
  desc: string;
  image: string;
}

export const promotions: Promotion[] = [
  {
    title: "First Visit Bundle",
    price: "$78",
    was: "$120",
    desc: "Consultation, your first acupuncture or tuina session, and a tailored herbal prescription.",
    image: img("promo-first", 900, 1100),
  },
  {
    title: "Tuina Trial",
    price: "$38",
    was: "$60",
    desc: "A 30-minute therapeutic tuina session to ease tension and introduce you to our care.",
    image: img("promo-tuina", 900, 1100),
  },
  {
    title: "Facial Acupuncture",
    price: "$128",
    was: "$180",
    desc: "A 60-minute cosmetic acupuncture session for a calmer, more radiant complexion.",
    image: img("promo-face", 900, 1100),
  },
];

export const featuredOn: string[] = [
  "The Straits Times",
  "CNA",
  "Her World",
  "Tatler Asia",
  "8 Days",
  "Lianhe Zaobao",
];

export interface Partner {
  /** Display name (alt text). */
  name: string;
  /** Simple Icons slug — rendered single-tone via cdn.simpleicons.org. */
  slug: string;
}

// Recognisable brands as dummy corporate partners until real logos are supplied.
export const partners: Partner[] = [
  { name: "Google", slug: "google" },
  { name: "Samsung", slug: "samsung" },
  { name: "Grab", slug: "grab" },
  { name: "Shopee", slug: "shopee" },
  { name: "Visa", slug: "visa" },
  { name: "Mastercard", slug: "mastercard" },
  { name: "Spotify", slug: "spotify" },
  { name: "Airbnb", slug: "airbnb" },
];
