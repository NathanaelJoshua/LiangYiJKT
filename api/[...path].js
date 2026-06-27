// src/server/index.ts
import "dotenv/config";
import path from "node:path";
import { mkdirSync, writeFileSync } from "node:fs";
import { put } from "@vercel/blob";
import { fileURLToPath } from "node:url";
import express from "express";
import cors from "cors";
import multer from "multer";
import jwt from "jsonwebtoken";
import bcrypt2 from "bcryptjs";

// src/server/db.ts
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

// src/lib/content.ts
var img = (seed, w = 800, h = 1e3) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
var loc = (en, id) => ({ en, id: id ?? en });
var BRAND = {
  name: "Liang Yi TCM",
  chinese: "\u826F\u91AB\u4E2D\u91AB",
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
    youtube: "https://youtube.com/@liangyitcm"
  }
};
var rawServices = [
  {
    id: "consultation",
    name: "Consultation",
    scope: "Diagnosis & herbal prescription",
    description: "Pulse and tongue diagnosis with a registered physician, paired with a tailored herbal formula calibrated to your constitution.",
    image: img("liangyi-consult", 1200, 1500),
    hoverImage: img("liangyi-consult2", 800, 1e3),
    whatIs: "A TCM consultation begins with pattern differentiation \u2014 reading your pulse, tongue, history and lifestyle to understand the root imbalance behind your symptoms. From this picture, a physician prescribes a herbal formula and care plan made for your body, not a template.",
    conditions: [
      "Fatigue & low energy",
      "Digestive complaints",
      "Sleep disturbance",
      "Hormonal imbalance",
      "Weak immunity",
      "Stress & anxiety"
    ],
    benefits: [
      { title: "Root-cause clarity", copy: "Understand the underlying pattern, not just the surface symptom." },
      { title: "A tailored formula", copy: "Herbal medicine calibrated to your constitution and adjusted over time." },
      { title: "A clear plan", copy: "Know what to expect, how long it may take, and how progress is measured." }
    ],
    faqs: [
      { q: "How long is a first consultation?", a: "Typically 45\u201360 minutes, covering a full intake, pulse and tongue diagnosis, and your initial plan." },
      { q: "Do I need to prepare?", a: "Avoid coffee, brushing your tongue or eating strongly coloured foods just before, as these affect tongue diagnosis." },
      { q: "Will I receive herbs the same day?", a: "In most cases, yes \u2014 your prescription is dispensed at the clinic after your consultation." }
    ]
  },
  {
    id: "tcm-treatments",
    name: "TCM Treatments",
    scope: "Acupuncture \xB7 cupping \xB7 tuina",
    description: "Time-tested modalities \u2014 acupuncture, cupping and tuina \u2014 applied with modern hygiene and precision to restore flow and balance.",
    image: img("liangyi-acu", 1200, 1500),
    hoverImage: img("liangyi-acu2", 800, 1e3),
    whatIs: "TCM treatments use fine, sterile needles, gentle suction and structured manual therapy to move Qi and blood, release tension and restore balance. From a modern view, they activate the nervous system, improve circulation and prompt the body's own pain-relieving response.",
    conditions: [
      "Back & neck pain",
      "Headaches & migraines",
      "Muscle tension",
      "Joint stiffness",
      "Poor circulation",
      "Stress & fatigue"
    ],
    benefits: [
      { title: "Drug-free relief", copy: "Targeted treatment that reduces symptoms and reliance on pain medication." },
      { title: "Restored flow", copy: "Acupuncture and cupping release tension and improve circulation." },
      { title: "Hands-on recovery", copy: "Tuina realigns and relaxes muscle and connective tissue." }
    ],
    faqs: [
      { q: "Is acupuncture safe?", a: "Yes \u2014 when performed by a trained, licensed and qualified TCM physician using single-use sterile needles." },
      { q: "Does it hurt?", a: "Most people feel only a mild sensation. Needles are far finer than those used for injections." },
      { q: "How many sessions will I need?", a: "It varies by condition; many patients notice improvement within a handful of sessions." }
    ]
  },
  {
    id: "wellness-therapy",
    name: "Wellness Therapy",
    scope: "Preventive & restorative care",
    description: "Seasonal tonics, moxibustion and guided wellness programmes that build resilience and sustain everyday vitality.",
    image: img("liangyi-well", 1200, 1500),
    hoverImage: img("liangyi-well2", 800, 1e3),
    whatIs: "Wellness therapy is preventive care \u2014 strengthening the body before illness takes hold. Through seasonal tonics, moxibustion and tailored programmes, we support immunity, energy and resilience so you feel well, not just not-unwell.",
    conditions: [
      "Low immunity",
      "Chronic fatigue",
      "Cold hands & feet",
      "Seasonal sensitivity",
      "Burnout",
      "Slow recovery"
    ],
    benefits: [
      { title: "Lasting resilience", copy: "Build the body's baseline so it weathers stress and seasons better." },
      { title: "Sustained energy", copy: "Address the roots of fatigue rather than masking it." },
      { title: "Preventive habits", copy: "Guidance on diet and lifestyle tuned to your constitution." }
    ],
    faqs: [
      { q: "Who is wellness therapy for?", a: "Anyone wanting to maintain health, recover from a demanding period, or prevent recurring issues." },
      { q: "What is moxibustion?", a: "A warming therapy using the herb mugwort to stimulate acupoints and support circulation and immunity." },
      { q: "How often should I come?", a: "Many patients visit seasonally, with a physician tailoring frequency to your needs." }
    ]
  },
  {
    id: "women-children",
    name: "For Women & Children",
    scope: "Fertility \xB7 postpartum \xB7 paediatric",
    description: "Gentle, evidence-informed protocols for menstrual health, fertility support, confinement recovery and paediatric tuina.",
    image: img("liangyi-women", 1200, 1500),
    hoverImage: img("liangyi-women2", 800, 1e3),
    whatIs: "Care for every stage \u2014 from menstrual health and fertility to postpartum recovery and gentle paediatric tuina. Protocols are gentle, evidence-informed and adapted to the unique needs of women and children.",
    conditions: [
      "Irregular cycles",
      "Menstrual cramps",
      "Fertility support",
      "Postpartum recovery",
      "Paediatric digestion",
      "Childhood immunity"
    ],
    benefits: [
      { title: "Cycle support", copy: "Address menstrual and hormonal patterns at the root." },
      { title: "Fertility & confinement", copy: "Considered care across the reproductive journey." },
      { title: "Gentle for children", copy: "Needle-free paediatric tuina suited to little ones." }
    ],
    faqs: [
      { q: "Is treatment safe during pregnancy?", a: "Certain treatments are, when overseen by a qualified physician. Always inform us if you are or may be pregnant." },
      { q: "What is paediatric tuina?", a: "A gentle, needle-free massage technique for children, often used for digestion and immunity." },
      { q: "Can TCM support IVF?", a: "Many patients use TCM alongside fertility treatment; we coordinate care conservatively." }
    ]
  },
  {
    id: "face-therapy",
    name: "Face Therapy",
    scope: "Cosmetic acupuncture & lifting",
    description: "Facial acupuncture and meridian massage that stimulate collagen, ease tension and restore a luminous, balanced complexion.",
    image: img("liangyi-face", 1200, 1500),
    hoverImage: img("liangyi-face2", 800, 1e3),
    whatIs: "Cosmetic acupuncture and meridian massage work with the face's natural structure \u2014 stimulating collagen, easing muscular tension and improving circulation for a brighter, more balanced complexion, without injections or downtime.",
    conditions: [
      "Dull complexion",
      "Fine lines",
      "Facial puffiness",
      "Jaw tension",
      "Uneven tone",
      "Stress in the face"
    ],
    benefits: [
      { title: "Natural radiance", copy: "Stimulates collagen and circulation for a healthy glow." },
      { title: "Released tension", copy: "Eases jaw and facial muscle tightness." },
      { title: "No downtime", copy: "A gentle, injection-free approach you can return to work after." }
    ],
    faqs: [
      { q: "How soon will I see results?", a: "Many notice a brighter, calmer complexion after a few sessions, with effects building over a course." },
      { q: "Is it painful?", a: "Needles are extremely fine; most clients find the session relaxing." },
      { q: "How long does a session take?", a: "About 60 minutes, including facial massage and acupuncture." }
    ]
  },
  {
    id: "pain-management",
    name: "Pain Management",
    scope: "Musculoskeletal & chronic pain",
    description: "Targeted relief for back, neck, joint and sports injuries through acupuncture, electro-stimulation and structured tuina.",
    image: img("liangyi-pain", 1200, 1500),
    hoverImage: img("liangyi-pain2", 800, 1e3),
    whatIs: "A focused approach to musculoskeletal and chronic pain. Combining acupuncture, electro-stimulation and structured tuina, we target the source of pain to restore movement and reduce reliance on medication.",
    conditions: [
      "Chronic back pain",
      "Neck & shoulder pain",
      "Sciatica",
      "Frozen shoulder",
      "Sports injuries",
      "Osteoarthritis"
    ],
    benefits: [
      { title: "Targeted relief", copy: "Treatment aimed at the source of pain, not just the symptom." },
      { title: "Restored movement", copy: "Improve range of motion and recover function faster." },
      { title: "Less medication", copy: "A drug-free path that can reduce reliance on painkillers." }
    ],
    faqs: [
      { q: "What conditions respond best?", a: "Back, neck, joint and sports-related pain often respond well, especially with a consistent course." },
      { q: "What is electro-acupuncture?", a: "A gentle electrical current applied through needles to enhance pain relief and muscle recovery." },
      { q: "When will I feel better?", a: "Some feel relief immediately; lasting change usually builds over several sessions." }
    ]
  }
];
var services = rawServices.map((s) => ({
  id: s.id,
  image: s.image,
  hoverImage: s.hoverImage,
  name: loc(s.name),
  scope: loc(s.scope),
  description: loc(s.description),
  whatIs: loc(s.whatIs),
  conditions: s.conditions.map((c) => loc(c)),
  benefits: s.benefits.map((b) => ({ title: loc(b.title), copy: loc(b.copy) })),
  faqs: s.faqs.map((f) => ({ q: loc(f.q), a: loc(f.a) }))
}));
var journey = [
  {
    no: "1",
    title: "Consult",
    copy: "We listen first. A thorough intake of lifestyle, history and symptoms frames the whole picture before any treatment begins.",
    image: img("journey-consult", 1200, 900)
  },
  {
    no: "2",
    title: "Diagnose",
    copy: "Pulse, tongue and pattern differentiation pinpoint the root imbalance \u2014 not just the surface complaint.",
    image: img("journey-diagnose", 1200, 900)
  },
  {
    no: "3",
    title: "Treat",
    copy: "A precise blend of acupuncture, herbs and manual therapy is applied and adjusted session to session.",
    image: img("journey-treat", 1200, 900)
  },
  {
    no: "4",
    title: "Maintain",
    copy: "Seasonal reviews and home guidance keep results compounding long after symptoms resolve.",
    image: img("journey-maintain", 1200, 900)
  }
];
var rawPricing = [
  {
    title: "Consultations",
    items: [
      { name: "First consultation", note: "Pulse & tongue diagnosis, treatment plan", price: "$38" },
      { name: "Follow-up consultation", note: "Review & prescription adjustment", price: "$28" },
      { name: "Teleconsultation", note: "Video review for existing patients", price: "$25" }
    ]
  },
  {
    title: "Treatments",
    items: [
      { name: "Acupuncture", note: "Per session, 30\u201340 min", price: "from $45" },
      { name: "Cupping", note: "Fire or vacuum, per session", price: "from $35" },
      { name: "Tuina massage", note: "30 minutes", price: "from $50" },
      { name: "Moxibustion", note: "Per session", price: "from $40" },
      { name: "Facial acupuncture", note: "Cosmetic, 60 min", price: "from $90" }
    ]
  },
  {
    title: "Herbal medicine",
    items: [
      { name: "Raw herb formula", note: "Prescribed per day of medication", price: "from $6" },
      { name: "Concentrated granules", note: "Convenient daily sachets", price: "from $8" }
    ]
  }
];
var pricing = rawPricing.map((g) => ({
  title: loc(g.title),
  items: g.items.map((it) => ({ name: loc(it.name), note: loc(it.note), price: it.price }))
}));
var rawPlans = [
  {
    name: "First Visit",
    price: "$78",
    cadence: "one-time",
    blurb: "Everything you need to begin \u2014 diagnosis to first treatment.",
    features: [
      "Full physician consultation",
      "One acupuncture or tuina session",
      "Personalised herbal prescription",
      "Lifestyle & dietary guidance"
    ],
    featured: true
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
      "Priority booking islandwide"
    ]
  }
];
var plans = rawPlans.map((p) => ({
  price: p.price,
  featured: p.featured,
  name: loc(p.name),
  cadence: loc(p.cadence),
  blurb: loc(p.blurb),
  features: p.features.map((f) => loc(f))
}));
var portrait = (n) => `https://i.pravatar.cc/600?img=${n}`;
var physicians = [
  { name: "Physician Tan Wei Ling", credentials: "MMed (TCM)", branch: "Thomson Plaza", focus: "Women's health & fertility", image: portrait(45) },
  { name: "Physician Lim Jun Hao", credentials: "BSc (TCM)", branch: "Tampines 1", focus: "Pain management & sports injury", image: portrait(12) },
  { name: "Physician Goh Mei Xin", credentials: "MMed (TCM)", branch: "Great World", focus: "Dermatology & face therapy", image: portrait(47) },
  { name: "Physician Ng Kai Feng", credentials: "BSc (TCM)", branch: "NEX / Seletar Mall", focus: "Paediatrics & digestive health", image: portrait(13) },
  { name: "Physician Chua Yi Xuan", credentials: "MMed (TCM)", branch: "Funan Mall", focus: "Acupuncture & chronic pain", image: portrait(32) },
  { name: "Physician Ong Zhi Hao", credentials: "BSc (TCM)", branch: "Hillion Mall", focus: "Sports recovery & osteopathy", image: portrait(8) },
  { name: "Physician Foo Hui Shan", credentials: "MMed (TCM)", branch: "PLQ Mall", focus: "Migraines & sleep disorders", image: portrait(20) },
  { name: "Physician Teo Jia Hui", credentials: "BSc (TCM)", branch: "i12 Katong", focus: "Wellness therapy & tuina", image: portrait(33) }
];
var clinics = [
  { region: "Central", name: "Thomson Plaza", address: "301 Upper Thomson Road", unit: "#03-27", postal: "Singapore 574408", phone: "+65 6464 9413", whatsapp: "+65 8988 2413", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" },
  { region: "Central", name: "United Square", address: "101 Thomson Road", unit: "#B1-39/40", postal: "Singapore 307591", phone: "+65 6530 3131", whatsapp: "+65 8669 3762", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" },
  { region: "Central", name: "Shaw Plaza", address: "360 Balestier Road", unit: "#01-07", postal: "Singapore 329783", phone: "+65 6322 4913", whatsapp: "+65 9058 7686", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" },
  { region: "Central", name: "Funan Mall", address: "107 North Bridge Road", unit: "#B1-06", postal: "Singapore 179105", phone: "+65 6970 9894", whatsapp: "+65 9178 3413", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" },
  { region: "Central", name: "Great World \u2014 Basement", address: "1 Kim Seng Promenade", unit: "#B2-129", postal: "Singapore 237994", phone: "+65 6732 4913", whatsapp: "+65 9725 2413", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" },
  { region: "Central", name: "Great World \u2014 Level 3", address: "1 Kim Seng Promenade", unit: "#03-101", postal: "Singapore 237994", phone: "+65 6970 9894", whatsapp: "+65 9178 3413", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" },
  { region: "North-east", name: "The Seletar Mall \u2014 Level 2", address: "33 Sengkang West Avenue", unit: "#02-24", postal: "Singapore 797653", phone: "+65 6243 9313", whatsapp: "+65 9297 0013", hours: "10am \u2013 10pm", consult: "10am \u2013 9pm" },
  { region: "North-east", name: "The Seletar Mall \u2014 Atrium", address: "33 Sengkang West Avenue", unit: "#02-03/04", postal: "Singapore 797653", phone: "+65 6970 6894", whatsapp: "+65 9720 1413", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" },
  { region: "East", name: "Tampines 1", address: "10 Tampines Central 1", unit: "#05-23/24", postal: "Singapore 529536", phone: "+65 6970 7413", whatsapp: "+65 9231 0413", hours: "10am \u2013 10pm", consult: "10am \u2013 9pm" },
  { region: "East", name: "PLQ Mall", address: "10 Paya Lebar Road", unit: "#B1-21", postal: "Singapore 409057", phone: "+65 6970 8913", whatsapp: "+65 9089 8276", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" },
  { region: "East", name: "i12 Katong", address: "112 East Coast Road", unit: "#03-12", postal: "Singapore 428802", phone: "+65 6970 6868", whatsapp: "+65 9626 2413", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" },
  { region: "West", name: "Hillion Mall", address: "17 Petir Road", unit: "#02-11", postal: "Singapore 678278", phone: "+65 6970 8686", whatsapp: "+65 8028 9413", hours: "10am \u2013 10pm", consult: "11am \u2013 8pm" }
];
var rawTestimonials = [
  { quote: "Six sessions and my chronic back pain is finally manageable. The physicians explain everything clearly.", name: "Rachel Tan", meta: "Patient \xB7 Tampines", image: portrait(31) },
  { quote: "Helped me through my fertility journey with so much patience. Forever grateful to the team.", name: "Priya Subramaniam", meta: "Patient \xB7 NEX", image: portrait(45) },
  { quote: "Modern, clean and professional \u2014 nothing like the old TCM halls. The results speak for themselves.", name: "Daniel Wong", meta: "Patient \xB7 VivoCity", image: portrait(12) },
  { quote: "My migraines dropped from weekly to almost none. The acupuncture genuinely works wonders.", name: "Hui Min Lee", meta: "Patient \xB7 Jurong Point", image: portrait(20) },
  { quote: "Face therapy gave me a real glow before my wedding. I'd recommend the team to anyone.", name: "Cheryl Aw", meta: "Patient \xB7 Bugis", image: portrait(47) },
  { quote: "They treat the root, not just the symptoms. My digestion has never been better.", name: "Marcus Lim", meta: "Patient \xB7 AMK Hub", image: portrait(8) },
  { quote: "Booking on WhatsApp is so easy and the physicians actually listen. A refreshing experience.", name: "Germaine Koh", meta: "Patient \xB7 Great World", image: portrait(32) },
  { quote: "After my sports injury, their tuina and acupuncture had me back training in weeks.", name: "Faizal Rahman", meta: "Patient \xB7 PLQ Mall", image: portrait(13) }
];
var testimonials = rawTestimonials.map((t) => ({
  name: t.name,
  image: t.image,
  quote: loc(t.quote),
  meta: loc(t.meta)
}));
var rawArticles = [
  {
    slug: "cooling-foods-singapore-heat",
    title: "Cooling foods for Singapore's heat: a TCM guide",
    category: "Nutrition",
    tags: ["Healthy Food", "Wellness"],
    readTime: "5 min",
    date: "May 2026",
    author: "Physician Tan Wei Ling",
    authorImage: img("author-tan", 200, 200),
    excerpt: "In TCM, the food on your plate is the first medicine. Here's how to eat with the climate rather than against it.",
    image: img("art-cooling", 1600, 1e3),
    body: [
      "Singapore's heat is relentless, and in Traditional Chinese Medicine that persistent warmth can tip the body toward an excess of internal heat \u2014 showing up as restless sleep, breakouts, irritability or a coated tongue.",
      "The remedy isn't dramatic. It begins with what you eat. Cooling foods \u2014 winter melon, cucumber, mung bean, chrysanthemum, watercress \u2014 gently clear heat without depleting the digestion the way iced drinks do.",
      "A common misconception is that cold drinks cool you down. In TCM they actually strain the spleen and stomach, weakening the very system that regulates your internal temperature. Room-temperature barley water or a warm chrysanthemum tea does the job far better.",
      "Balance is everything. Even cooling foods, eaten to excess, can dampen digestion. The aim is a plate that answers the season \u2014 light, hydrating, and varied \u2014 adjusted as your own constitution requires."
    ]
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
    excerpt: "Pulse diagnosis reads the body as a living system. Here's what a physician feels for at your wrist.",
    image: img("art-pulse", 1600, 1e3),
    body: [
      "When a physician rests three fingers on your wrist, they aren't simply counting beats. They are reading depth, rhythm, strength and quality across distinct positions \u2014 each mapped to a different organ system.",
      "A pulse can be slippery, wiry, thin or flooding. These textures describe patterns long before they become measurable on a lab report \u2014 a body trending toward imbalance rather than one already in disease.",
      "This is the strength of pulse diagnosis: it is functional, not just structural. It tells us how your system is behaving today, which is exactly what guides a tailored herbal prescription.",
      "It doesn't replace modern testing \u2014 it complements it. The two together give a fuller picture than either alone."
    ]
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
    excerpt: "Hours at a screen leave the neck and shoulders locked. Acupuncture targets the knots that stretching can't reach.",
    image: img("art-neck", 1600, 1e3),
    body: [
      "Modern work keeps us still for hours, head tilted forward, shoulders creeping toward the ears. Over time the muscles of the neck and upper back hold tension as taut bands \u2014 what we call trigger points.",
      "Acupuncture reaches these bands directly. A fine needle placed into a knotted point prompts the muscle to release in a way that surface massage often can't sustain.",
      "Most desk-related tension responds within a handful of sessions, especially when paired with simple posture adjustments and movement breaks.",
      "The goal is not just relief but resilience \u2014 a neck that recovers faster from the demands you put on it."
    ]
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
    excerpt: "Confinement is one of TCM's most enduring traditions. Here's how it adapts \u2014 sensibly \u2014 to modern life.",
    image: img("art-postpartum", 1600, 1e3),
    body: [
      "The postpartum month is, in TCM, a window for deep recovery. The body has given a great deal, and the traditions of confinement exist to replenish what was spent \u2014 warmth, blood, and rest.",
      "Much of the classical guidance still holds: warm, nourishing foods, protection from cold and wind, and genuine rest. Other rules can be loosened with care \u2014 strict no-bathing rules, for instance, give way to warm showers and good hygiene.",
      "Herbal tonics are tailored to each mother's recovery rather than applied as a single template. What suits one constitution may overwhelm another.",
      "Reimagined sensibly, confinement isn't restriction \u2014 it's a structured, supported beginning to motherhood."
    ]
  }
];
var articles = rawArticles.map((a) => ({
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
  body: a.body.map((p) => loc(p))
}));
var promotions = [
  {
    title: "First Visit Bundle",
    price: "$78",
    was: "$120",
    desc: "Consultation, your first acupuncture or tuina session, and a tailored herbal prescription.",
    image: img("promo-first", 900, 1100)
  },
  {
    title: "Tuina Trial",
    price: "$38",
    was: "$60",
    desc: "A 30-minute therapeutic tuina session to ease tension and introduce you to our care.",
    image: img("promo-tuina", 900, 1100)
  },
  {
    title: "Facial Acupuncture",
    price: "$128",
    was: "$180",
    desc: "A 60-minute cosmetic acupuncture session for a calmer, more radiant complexion.",
    image: img("promo-face", 900, 1100)
  }
];
var partners = [
  { name: "Google", slug: "google" },
  { name: "Samsung", slug: "samsung" },
  { name: "Grab", slug: "grab" },
  { name: "Shopee", slug: "shopee" },
  { name: "Visa", slug: "visa" },
  { name: "Mastercard", slug: "mastercard" },
  { name: "Spotify", slug: "spotify" },
  { name: "Airbnb", slug: "airbnb" }
];

// src/server/db.ts
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set. Copy .env.example to .env and add your Neon connection string.");
}
var sql = neon(process.env.DATABASE_URL);
var DEMO_PASSWORD = process.env.ADMIN_PASSWORD || "liangyi";
var defaultCompany = {
  name: BRAND.name,
  est: BRAND.est,
  tagline: BRAND.tagline,
  positioning: BRAND.positioning,
  email: BRAND.email,
  phone: BRAND.phone,
  whatsapp: BRAND.whatsapp,
  address: "12 clinics islandwide, Singapore",
  hours: "10am \u2013 10pm daily \xB7 Consultations 11am \u2013 8pm",
  heroImage: "",
  socials: BRAND.socials
};
var defaultPages = {
  Home: {
    "Hero badge": loc("Awarded TCM centre \xB7 Est. 2016"),
    "Hero headline": loc("Our greatest wealth is health."),
    "Hero intro": BRAND.positioning,
    "Services heading": loc("Result-oriented TCM for your health needs"),
    "Testimonials heading": loc("Words of praise from our patients.")
  },
  About: {
    Eyebrow: loc("About us"),
    Headline: loc("Trusted expertise, tailored care, and lasting wellness."),
    Intro: loc(
      "Established in 2016, Liang Yi has blended a 2,000-year tradition with modern rigour to create a truly calming TCM experience. Where heritage, evidence and care come together beautifully."
    ),
    "Banner image": "",
    "Banner quote": loc("We restore the balance the body was built to keep."),
    "Story eyebrow": loc("Who we are"),
    "Story headline": loc("True wellness begins from within."),
    "Story body": loc(
      "Liang Yi is a registered TCM clinic with the TCM Practitioners Board, established in 2016. Our care is grounded in exceptional, result-oriented solutions \u2014 complemented by proprietary therapies and techniques developed over many years.\n\nWe believe true wellness begins from within: when the body's internal balance of Qi, Blood, Yin and Yang is supported and maintained. Rather than chasing symptoms, we address the underlying imbalance \u2014 using classical principles like Zang-Fu diagnosis, meridian flow and body-constitution analysis."
    ),
    "Approach eyebrow": loc("Our approach"),
    "Approach headline": loc("Three principles we live by."),
    "Principle 1 title": loc("Invest in your health"),
    "Principle 1 copy": loc(
      "In Chinese medicine, the smooth circulation of Qi and Blood is the foundation of a healthy body. Prevention is the best form of care \u2014 and health is your most valuable asset."
    ),
    "Principle 2 title": loc("Progress at your own rhythm"),
    "Principle 2 copy": loc(
      "Healing is gradual. Through regular tuina, acupuncture, herbal care and guidance, we help your body recover at a pace that lasts."
    ),
    "Principle 3 title": loc("Understand your own body"),
    "Principle 3 copy": loc(
      "We help you understand your TCM body constitution, so you can make informed, everyday choices that keep you well."
    )
  },
  Services: {
    Eyebrow: loc("Our services"),
    Headline: loc("Result-oriented TCM for your health needs")
  },
  Locations: {
    Eyebrow: loc("Clinic Locations"),
    Headline: loc("Find us, wherever you are in Singapore")
  },
  Insights: { Eyebrow: loc("Insights"), Headline: loc("Notes from the clinic") },
  Contact: { Eyebrow: loc("Contact us"), Headline: loc("Let's talk about your health") }
};
async function ensureSchema() {
  await sql`create table if not exists cms_users (
    id text primary key,
    name text not null,
    email text not null unique,
    role text not null default 'Editor',
    active boolean not null default true,
    password_hash text not null,
    created_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_settings (
    key text primary key,
    value jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_services (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_articles (
    slug text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_locations (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_physicians (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_partners (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
  await sql`create table if not exists cms_testimonials (
    id text primary key,
    sort integer not null default 0,
    data jsonb not null,
    updated_at timestamptz not null default now()
  )`;
}
async function seedIfEmpty() {
  const users = await sql`select count(*)::int as n from cms_users`;
  if (users[0].n === 0) {
    const hash = await bcrypt.hash(DEMO_PASSWORD, 10);
    await sql`insert into cms_users (id, name, email, role, active, password_hash)
      values ('u1', 'Site Admin', 'admin@liangyi.sg', 'Admin', true, ${hash}),
             ('u2', 'Editorial', 'editor@liangyi.sg', 'Editor', true, ${hash})`;
  }
  const settings = await sql`select count(*)::int as n from cms_settings`;
  if (settings[0].n === 0) {
    await sql`insert into cms_settings (key, value) values ('company', ${JSON.stringify(defaultCompany)})`;
    await sql`insert into cms_settings (key, value) values ('pages', ${JSON.stringify(defaultPages)})`;
    await sql`insert into cms_settings (key, value) values ('pricing', ${JSON.stringify({ groups: pricing, plans })})`;
  }
  const svc = await sql`select count(*)::int as n from cms_services`;
  if (svc[0].n === 0) {
    let i = 0;
    for (const s of services) {
      await sql`insert into cms_services (id, sort, data) values (${s.id}, ${i++}, ${JSON.stringify(s)})`;
    }
  }
  const art = await sql`select count(*)::int as n from cms_articles`;
  if (art[0].n === 0) {
    let i = 0;
    for (const a of articles) {
      await sql`insert into cms_articles (slug, sort, data) values (${a.slug}, ${i++}, ${JSON.stringify(a)})`;
    }
  }
  const loc2 = await sql`select count(*)::int as n from cms_locations`;
  if (loc2[0].n === 0) {
    let i = 0;
    for (const c of clinics) {
      const id = `loc-${i}`;
      await sql`insert into cms_locations (id, sort, data) values (${id}, ${i}, ${JSON.stringify({ id, ...c })})`;
      i++;
    }
  }
  const phys = await sql`select count(*)::int as n from cms_physicians`;
  if (phys[0].n === 0) {
    let i = 0;
    for (const p of physicians) {
      const id = `phys-${i}`;
      await sql`insert into cms_physicians (id, sort, data) values (${id}, ${i}, ${JSON.stringify({ id, ...p })})`;
      i++;
    }
  }
  const part = await sql`select count(*)::int as n from cms_partners`;
  if (part[0].n === 0) {
    let i = 0;
    for (const p of partners) {
      const id = `partner-${i}`;
      const data = { id, name: p.name, image: `https://cdn.simpleicons.org/${p.slug}/52e7ce` };
      await sql`insert into cms_partners (id, sort, data) values (${id}, ${i}, ${JSON.stringify(data)})`;
      i++;
    }
  }
  const tess = await sql`select count(*)::int as n from cms_testimonials`;
  if (tess[0].n === 0) {
    let i = 0;
    for (const t of testimonials) {
      const id = `tess-${i}`;
      await sql`insert into cms_testimonials (id, sort, data) values (${id}, ${i}, ${JSON.stringify({ id, ...t })})`;
      i++;
    }
  }
}

// src/server/index.ts
var PORT = Number(process.env.PORT) || 4e3;
var JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
var app = express();
app.use(cors());
app.use(express.json({ limit: "2mb" }));
var useBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
var uploadsDir = process.env.VERCEL ? "/tmp/uploads" : fileURLToPath(new URL("../../uploads", import.meta.url));
if (!useBlob) mkdirSync(uploadsDir, { recursive: true });
var upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 },
  // 100 MB (covers short videos)
  fileFilter: (_req, file, cb) => {
    const ok = /^(image|video)\//.test(file.mimetype);
    cb(ok ? null : new Error("Only image and video files are allowed"), ok);
  }
});
var uniqueName = (originalname) => {
  const ext = path.extname(originalname).toLowerCase();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;
};
if (!useBlob) app.use("/api/uploads", express.static(uploadsDir));
async function getSetting(key) {
  const rows = await sql`select value from cms_settings where key = ${key}`;
  return rows[0]?.value ?? null;
}
function mergePages(stored) {
  const out = {};
  const pageNames = /* @__PURE__ */ new Set([...Object.keys(defaultPages), ...Object.keys(stored ?? {})]);
  for (const page of pageNames) {
    const def = defaultPages[page] ?? {};
    const cur = stored?.[page] ?? {};
    out[page] = { ...def, ...cur };
  }
  return out;
}
async function putSetting(key, value) {
  await sql`insert into cms_settings (key, value, updated_at)
    values (${key}, ${JSON.stringify(value)}, now())
    on conflict (key) do update set value = excluded.value, updated_at = now()`;
}
function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired session" });
  }
}
var wrap = (fn) => (req, res) => fn(req, res).catch((err) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});
app.post(
  "/api/auth/login",
  wrap(async (req, res) => {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ error: "Email and password required" });
    const rows = await sql`select id, name, email, role, active, password_hash
      from cms_users where lower(email) = lower(${email})`;
    const user = rows[0];
    if (!user || !user.active) return res.status(401).json({ error: "No active account with that email" });
    const ok = await bcrypt2.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Incorrect password" });
    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, { expiresIn: "12h" });
    return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
  })
);
app.get(
  "/api/bootstrap",
  wrap(async (_req, res) => {
    const [company, storedPages, pricing2] = await Promise.all([
      getSetting("company"),
      getSetting("pages"),
      getSetting("pricing")
    ]);
    const pages = mergePages(storedPages);
    const services2 = await sql`select data from cms_services order by sort, id`;
    const articles2 = await sql`select data from cms_articles order by sort, slug`;
    const locations = await sql`select data from cms_locations order by sort, id`;
    const physicians2 = await sql`select data from cms_physicians order by sort, id`;
    const partners2 = await sql`select data from cms_partners order by sort, id`;
    const testimonials2 = await sql`select data from cms_testimonials order by sort, id`;
    const users = await sql`select id, name, email, role, active from cms_users order by created_at`;
    res.json({
      company,
      pages,
      pricing: pricing2,
      services: services2.map((r) => r.data),
      articles: articles2.map((r) => r.data),
      locations: locations.map((r) => r.data),
      physicians: physicians2.map((r) => r.data),
      partners: partners2.map((r) => r.data),
      testimonials: testimonials2.map((r) => r.data),
      users
    });
  })
);
app.put("/api/company", requireAuth, wrap(async (req, res) => {
  await putSetting("company", req.body);
  res.json({ ok: true });
}));
app.put("/api/pages", requireAuth, wrap(async (req, res) => {
  await putSetting("pages", req.body);
  res.json({ ok: true });
}));
app.put("/api/pricing", requireAuth, wrap(async (req, res) => {
  await putSetting("pricing", req.body);
  res.json({ ok: true });
}));
app.post("/api/users", requireAuth, wrap(async (req, res) => {
  const { id, name, email, role, active, password } = req.body ?? {};
  const hash = await bcrypt2.hash(password || "liangyi", 10);
  await sql`insert into cms_users (id, name, email, role, active, password_hash)
    values (${id}, ${name}, ${email}, ${role}, ${active ?? true}, ${hash})`;
  res.json({ ok: true });
}));
app.put("/api/users/:id", requireAuth, wrap(async (req, res) => {
  const { name, email, role, active, password } = req.body ?? {};
  if (password) {
    const hash = await bcrypt2.hash(password, 10);
    await sql`update cms_users set name=${name}, email=${email}, role=${role}, active=${active}, password_hash=${hash} where id=${req.params.id}`;
  } else {
    await sql`update cms_users set name=${name}, email=${email}, role=${role}, active=${active} where id=${req.params.id}`;
  }
  res.json({ ok: true });
}));
app.delete("/api/users/:id", requireAuth, wrap(async (req, res) => {
  const rows = await sql`select role from cms_users where id=${req.params.id}`;
  if (rows[0]?.role === "Admin") return res.status(403).json({ error: "Admin accounts cannot be deleted" });
  await sql`delete from cms_users where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.post("/api/services", requireAuth, wrap(async (req, res) => {
  const s = req.body ?? {};
  const next = await sql`select coalesce(max(sort), -1) + 1 as n from cms_services`;
  await sql`insert into cms_services (id, sort, data) values (${s.id}, ${next[0].n}, ${JSON.stringify(s)})`;
  res.json({ ok: true });
}));
app.put("/api/services/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_services set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.delete("/api/services/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_services where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.post("/api/articles", requireAuth, wrap(async (req, res) => {
  const a = req.body ?? {};
  const next = await sql`select coalesce(max(sort), -1) + 1 as n from cms_articles`;
  await sql`insert into cms_articles (slug, sort, data) values (${a.slug}, ${next[0].n}, ${JSON.stringify(a)})`;
  res.json({ ok: true });
}));
app.put("/api/articles/:slug", requireAuth, wrap(async (req, res) => {
  await sql`update cms_articles set data=${JSON.stringify(req.body)}, updated_at=now() where slug=${req.params.slug}`;
  res.json({ ok: true });
}));
app.delete("/api/articles/:slug", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_articles where slug=${req.params.slug}`;
  res.json({ ok: true });
}));
app.post("/api/locations", requireAuth, wrap(async (req, res) => {
  const l = req.body ?? {};
  const next = await sql`select coalesce(max(sort), -1) + 1 as n from cms_locations`;
  await sql`insert into cms_locations (id, sort, data) values (${l.id}, ${next[0].n}, ${JSON.stringify(l)})`;
  res.json({ ok: true });
}));
app.put("/api/locations/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_locations set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.delete("/api/locations/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_locations where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.post("/api/physicians", requireAuth, wrap(async (req, res) => {
  const p = req.body ?? {};
  const next = await sql`select coalesce(max(sort), -1) + 1 as n from cms_physicians`;
  await sql`insert into cms_physicians (id, sort, data) values (${p.id}, ${next[0].n}, ${JSON.stringify(p)})`;
  res.json({ ok: true });
}));
app.put("/api/physicians/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_physicians set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.delete("/api/physicians/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_physicians where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.post("/api/partners", requireAuth, wrap(async (req, res) => {
  const p = req.body ?? {};
  const next = await sql`select coalesce(max(sort), -1) + 1 as n from cms_partners`;
  await sql`insert into cms_partners (id, sort, data) values (${p.id}, ${next[0].n}, ${JSON.stringify(p)})`;
  res.json({ ok: true });
}));
app.put("/api/partners/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_partners set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.delete("/api/partners/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_partners where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.post("/api/testimonials", requireAuth, wrap(async (req, res) => {
  const t = req.body ?? {};
  const next = await sql`select coalesce(max(sort), -1) + 1 as n from cms_testimonials`;
  await sql`insert into cms_testimonials (id, sort, data) values (${t.id}, ${next[0].n}, ${JSON.stringify(t)})`;
  res.json({ ok: true });
}));
app.put("/api/testimonials/:id", requireAuth, wrap(async (req, res) => {
  await sql`update cms_testimonials set data=${JSON.stringify(req.body)}, updated_at=now() where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.delete("/api/testimonials/:id", requireAuth, wrap(async (req, res) => {
  await sql`delete from cms_testimonials where id=${req.params.id}`;
  res.json({ ok: true });
}));
app.post(
  "/api/upload",
  upload.single("file"),
  wrap(async (req, res) => {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
    try {
      if (!token) throw new Error("no token");
      req.user = jwt.verify(token, JWT_SECRET);
    } catch {
      return res.status(401).json({ error: "Not authenticated" });
    }
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    const filename = uniqueName(req.file.originalname);
    if (useBlob) {
      const blob = await put(filename, req.file.buffer, {
        access: "public",
        contentType: req.file.mimetype
      });
      return res.json({ url: blob.url, type: req.file.mimetype });
    }
    writeFileSync(`${uploadsDir}/${filename}`, req.file.buffer);
    res.json({ url: `/api/uploads/${filename}`, type: req.file.mimetype });
  })
);
app.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message || "Request error" });
});
var ready = (async () => {
  await ensureSchema();
  await seedIfEmpty();
})();
if (!process.env.VERCEL) {
  ready.then(() => app.listen(PORT, () => console.log(`CMS API on http://localhost:${PORT}`))).catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}
var server_default = app;

// src/server/handler.ts
async function handler(req, res) {
  try {
    await ready;
    return server_default(req, res);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    res.statusCode = 500;
    res.setHeader("content-type", "application/json");
    res.end(JSON.stringify({ error: "Server init failed", detail: message }));
  }
}
export {
  handler as default
};
