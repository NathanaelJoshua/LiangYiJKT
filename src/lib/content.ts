// Realistic SG placeholder content for Liang Yi TCM.
// Images use picsum.photos seeds so they are stable until real assets land in /public.

export const img = (seed: string, w = 800, h = 1000) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const BRAND = {
  name: "Liang Yi TCM",
  chinese: "良醫中醫",
  est: "Est. 2016",
  tagline: "Our Greatest Wealth is Health",
  positioning: "Result-oriented TCM solutions for your health needs.",
  cta: "Book an Appointment",
  email: "hello@liangyitcm.sg",
  phone: "+65 6464 9413",
  whatsapp: "+65 8988 2413",
};

export interface Service {
  id: string;
  name: string;
  scope: string;
  description: string;
  image: string;
  hoverImage: string;
}

export const services: Service[] = [
  {
    id: "consultation",
    name: "Consultation",
    scope: "Diagnosis & herbal prescription",
    description:
      "Pulse and tongue diagnosis with a registered physician, paired with a tailored herbal formula calibrated to your constitution.",
    image: img("liangyi-consult", 800, 1000),
    hoverImage: img("liangyi-consult2", 800, 1000),
  },
  {
    id: "tcm-treatments",
    name: "TCM Treatments",
    scope: "Acupuncture · cupping · tuina",
    description:
      "Time-tested modalities — acupuncture, cupping and tuina — applied with modern hygiene and precision to restore flow and balance.",
    image: img("liangyi-acu", 800, 1000),
    hoverImage: img("liangyi-acu2", 800, 1000),
  },
  {
    id: "wellness-therapy",
    name: "Wellness Therapy",
    scope: "Preventive & restorative care",
    description:
      "Seasonal tonics, moxibustion and guided wellness programmes that build resilience and sustain everyday vitality.",
    image: img("liangyi-well", 800, 1000),
    hoverImage: img("liangyi-well2", 800, 1000),
  },
  {
    id: "women-children",
    name: "For Women & Children",
    scope: "Fertility · postpartum · paediatric",
    description:
      "Gentle, evidence-informed protocols for menstrual health, fertility support, confinement recovery and paediatric tuina.",
    image: img("liangyi-women", 800, 1000),
    hoverImage: img("liangyi-women2", 800, 1000),
  },
  {
    id: "face-therapy",
    name: "Face Therapy",
    scope: "Cosmetic acupuncture & lifting",
    description:
      "Facial acupuncture and meridian massage that stimulate collagen, ease tension and restore a luminous, balanced complexion.",
    image: img("liangyi-face", 800, 1000),
    hoverImage: img("liangyi-face2", 800, 1000),
  },
  {
    id: "pain-management",
    name: "Pain Management",
    scope: "Musculoskeletal & chronic pain",
    description:
      "Targeted relief for back, neck, joint and sports injuries through acupuncture, electro-stimulation and structured tuina.",
    image: img("liangyi-pain", 800, 1000),
    hoverImage: img("liangyi-pain2", 800, 1000),
  },
];

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
  name: string;
  note?: string;
  price: string;
}

export interface PriceGroup {
  title: string;
  items: PriceItem[];
}

export const pricing: PriceGroup[] = [
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

export interface Plan {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  featured?: boolean;
}

export const plans: Plan[] = [
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
  quote: string;
  name: string;
  meta: string;
}

export const testimonials: Testimonial[] = [
  { quote: "Six sessions and my chronic back pain is finally manageable. The physicians explain everything clearly.", name: "Rachel T.", meta: "Google review · Tampines" },
  { quote: "Helped me through my fertility journey with so much patience. Forever grateful to the team.", name: "Priya S.", meta: "Google review · NEX" },
  { quote: "Modern, clean and professional — nothing like the old TCM halls. Results speak for themselves.", name: "Daniel W.", meta: "Google review · VivoCity" },
  { quote: "My migraines dropped from weekly to almost none. The acupuncture works wonders.", name: "Hui Min L.", meta: "Google review · Jurong Point" },
  { quote: "Face therapy gave me a real glow before my wedding. Highly recommend the team.", name: "Cheryl A.", meta: "Google review · Bugis" },
  { quote: "They treat the root, not just symptoms. My digestion has never been better.", name: "Marcus L.", meta: "Google review · AMK Hub" },
];

export interface Article {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  readTime: string;
  date: string;
  author: string;
  authorImage: string;
  excerpt: string;
  image: string;
  body: string[];
}

export const articles: Article[] = [
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

export const getArticle = (slug: string) =>
  articles.find((a) => a.slug === slug);

export const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
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
