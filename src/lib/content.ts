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
  phone: "+65 6call 0000",
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

export interface Physician {
  name: string;
  credentials: string;
  focus: string;
  image: string;
}

export const physicians: Physician[] = [
  {
    name: "Physician Tan Wei Ling",
    credentials: "MMed (TCM), Reg. No. T0001",
    focus: "Women's health & fertility",
    image: img("phys-tan", 800, 1000),
  },
  {
    name: "Physician Lim Jun Hao",
    credentials: "BSc (TCM), Reg. No. T0024",
    focus: "Pain management & sports injury",
    image: img("phys-lim", 800, 1000),
  },
  {
    name: "Physician Goh Mei Xin",
    credentials: "MMed (TCM), Reg. No. T0102",
    focus: "Dermatology & face therapy",
    image: img("phys-goh", 800, 1000),
  },
  {
    name: "Physician Ng Kai Feng",
    credentials: "BSc (TCM), Reg. No. T0188",
    focus: "Paediatrics & digestive health",
    image: img("phys-ng", 800, 1000),
  },
];

export interface Location {
  name: string;
  mall: string;
  hours: string;
  maps: string;
}

export const locations: Location[] = [
  { name: "Liang Yi · Jurong Point", mall: "Jurong Point #03-12", hours: "10:00–21:30 daily", maps: "https://maps.google.com/?q=Jurong+Point" },
  { name: "Liang Yi · Tampines Mall", mall: "Tampines Mall #04-08", hours: "10:30–21:00 daily", maps: "https://maps.google.com/?q=Tampines+Mall" },
  { name: "Liang Yi · NEX", mall: "NEX Serangoon #02-30", hours: "10:00–22:00 daily", maps: "https://maps.google.com/?q=NEX+Serangoon" },
  { name: "Liang Yi · VivoCity", mall: "VivoCity #02-114", hours: "11:00–21:00 daily", maps: "https://maps.google.com/?q=VivoCity" },
  { name: "Liang Yi · Causeway Point", mall: "Causeway Point #05-01", hours: "10:30–21:30 daily", maps: "https://maps.google.com/?q=Causeway+Point" },
  { name: "Liang Yi · Bugis Junction", mall: "Bugis Junction #03-15", hours: "11:00–21:00 daily", maps: "https://maps.google.com/?q=Bugis+Junction" },
  { name: "Liang Yi · Northpoint City", mall: "Northpoint City #02-167", hours: "10:00–21:30 daily", maps: "https://maps.google.com/?q=Northpoint+City" },
  { name: "Liang Yi · Waterway Point", mall: "Waterway Point #01-44", hours: "10:30–21:00 daily", maps: "https://maps.google.com/?q=Waterway+Point" },
  { name: "Liang Yi · IMM", mall: "IMM Building #02-58", hours: "10:00–22:00 daily", maps: "https://maps.google.com/?q=IMM+Building" },
  { name: "Liang Yi · AMK Hub", mall: "AMK Hub #03-22", hours: "10:30–21:30 daily", maps: "https://maps.google.com/?q=AMK+Hub" },
  { name: "Liang Yi · Hougang Mall", mall: "Hougang Mall #02-19", hours: "11:00–21:00 daily", maps: "https://maps.google.com/?q=Hougang+Mall" },
  { name: "Liang Yi · Bedok Mall", mall: "Bedok Mall #B2-40", hours: "10:30–21:30 daily", maps: "https://maps.google.com/?q=Bedok+Mall" },
];

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
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export const articles: Article[] = [
  { title: "Cooling foods for Singapore's heat: a TCM guide", category: "Nutrition", readTime: "5 min", date: "May 2026", image: img("art-cooling", 1000, 750) },
  { title: "Why your pulse tells more than your blood test", category: "Diagnosis", readTime: "7 min", date: "Apr 2026", image: img("art-pulse", 1000, 750) },
  { title: "Acupuncture for desk-bound necks and shoulders", category: "Pain", readTime: "6 min", date: "Mar 2026", image: img("art-neck", 1000, 750) },
  { title: "Postpartum confinement, reimagined for modern mothers", category: "Women", readTime: "8 min", date: "Feb 2026", image: img("art-postpartum", 1000, 750) },
];

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Physicians", href: "#physicians" },
  { label: "Locations", href: "#locations" },
  { label: "Insights", href: "#insights" },
];
