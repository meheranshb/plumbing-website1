export const BUSINESS = {
  name: "All Service Plumbing of Central Florida, Inc",
  short: "All Service Plumbing",
  tagline: "of Central Florida",
  phone1: "+1 863-991-5702",
  phone2: "+1 863-273-2040",
  tel1: "+18639915702",
  tel2: "+18632732040",
  address: "4305 Grand Concourse, Sebring, FL 33875",
  plusCode: "9HH9+8H Sebring, FL",
  hours: "Open 24 hours, 7 days a week",
  rating: 4.9,
  reviews: 346,
  pin: "5702",
};

export type Service = {
  id: string;
  name: string;
  tag: string;
  desc: string;
  from: number | null;
  icon: string;
  popular?: boolean;
};

export const SERVICES: Service[] = [
  {
    id: "water-heater",
    name: "Water Heater Replacement",
    tag: "Tank & Tankless",
    desc: "Same-day tank and tankless swaps with old-unit haul-away. Gas or electric, 40–100 gal, sized right for your household.",
    from: 1150,
    icon: "heater",
    popular: true,
  },
  {
    id: "drain",
    name: "Drain Cleaning & Jetting",
    tag: "Main Line & Fixtures",
    desc: "Camera-located clogs cleared with pro jetting — kitchen, bath, and full main lines. No repeat-visit nonsense.",
    from: 149,
    icon: "drain",
    popular: true,
  },
  {
    id: "repiping",
    name: "Home Repiping",
    tag: "Copper & PEX",
    desc: "Whole-home repipes in copper or PEX, phased room by room so you never lose water for more than a day.",
    from: null,
    icon: "pipe",
  },
  {
    id: "leak",
    name: "Leak Detection & Repair",
    tag: "Tracked to the inch",
    desc: "Infrared and acoustic leak tracing to find the hidden drip before it becomes a soaked subfloor.",
    from: 129,
    icon: "leak",
    popular: true,
  },
  {
    id: "bath-kitchen",
    name: "Bath & Kitchen Installs",
    tag: "Faucets · Disposals · Fixtures",
    desc: "New cabinets, new faucet, new disposal — installed carefully with zero damage to your fresh finish carpentry.",
    from: 199,
    icon: "faucet",
  },
  {
    id: "hose-bib",
    name: "Hose Bibs & Outdoor Faucets",
    tag: "Spigots · Shut-offs",
    desc: "Curb-side bibs, frost-free spigots, and irrigation tie-ins done flush and tight — Central Florida's driest season approved.",
    from: 189,
    icon: "bib",
  },
  {
    id: "septic",
    name: "Septic Systems & Inspections",
    tag: "Pump-outs · Lines · Tanks",
    desc: "Inspections, field-line repairs, and tank services with honest reporting. We go down there so you don't have to.",
    from: 249,
    icon: "septic",
  },
  {
    id: "sump",
    name: "Sump Pumps & Backflow",
    tag: "Flood & Sewer Protection",
    desc: "Primary and battery-backup sump installs plus backflow preventers to keep the street's water out of your house.",
    from: 449,
    icon: "sump",
  },
];

export const TIME_SLOTS = [
  "8 – 10 AM",
  "10 AM – 12 PM",
  "12 – 2 PM",
  "2 – 4 PM",
  "4 – 6 PM",
];

export const URGENCIES = [
  { id: "standard", label: "Standard", note: "Next available window" },
  { id: "asap", label: "ASAP", note: "Today if we can" },
  { id: "emergency", label: "Emergency", note: "Active leak — 24/7" },
];

export type Review = {
  name: string;
  meta: string;
  stars: number;
  text: string;
  topic: string;
  ownerReply?: string;
};

export const REVIEWS: Review[] = [
  {
    name: "W Davis",
    meta: "Local Guide · 19 reviews",
    stars: 5,
    text: "Replaced my old copper pipe and faucet and I am super happy with the results! 10/10. They showed up on time and the work area was cleaner than they found it.",
    topic: "Repiping · Faucet",
    ownerReply:
      "Wow, that was a great review. You really took time to write that. Thank you so much for calling us.",
  },
  {
    name: "Deb Hoyt",
    meta: "Local Guide · 21 reviews",
    stars: 5,
    text: "Great service, back everything they do. Very thorough! Nice guys too! They changed my reverse osmosis filters — I feel confident the job will have no repercussions. I highly recommend them!",
    topic: "RO Filter Service",
    ownerReply: "Thank you so much! We really appreciate the amazing review.",
  },
  {
    name: "Laurie Campbell",
    meta: "Local Guide · 34 reviews",
    stars: 5,
    text: "Brian and Sean were excellent, professional and answered any questions I had. We had new kitchen cabinets and they were extremely careful when installing the new faucet and hooking up the disposal. Found a great plumbing company.",
    topic: "Kitchen Install",
  },
];

export const REVIEW_TOPICS = [
  { label: "water heater replacement", count: 20 },
  { label: "friendly technicians", count: 5 },
  { label: "knowledgeable crew", count: 3 },
  { label: "hose bib installation", count: 2 },
];

export const TOWNS = [
  "Sebring",
  "Waldo",
  "Bowling Green",
  "Avon Park",
  "Frostproof",
  "Arcadia",
  "LaBelle",
  "High Prairie",
  "Crescent City",
  "Mocana",
  "Zolfo Spring",
  "Buckhead",
];

export const PROCESS_STEPS = [
  {
    n: "01",
    title: "Book in 60 seconds",
    body: "Pick your service, date, and window online — or call and we'll put you on the board. You get a ticket number immediately and a text the moment a tech is assigned.",
    chip: "Instant ticket number",
  },
  {
    n: "02",
    title: "A stocked truck rolls same-day",
    body: "Our techs carry water heaters, PEX, disposals, and 2,000+ parts on the truck. Most jobs are finished in the first visit, and the tech texts you on the way.",
    chip: "On-time window, confirmed by text",
  },
  {
    n: "03",
    title: "Fixed right, priced upfront",
    body: "You approve the exact price before a wrench turns. Work is backed in writing, and if it's not right, we're back at no charge. That's how we keep a 4.9 rating.",
    chip: "Guaranteed in writing",
  },
];

export const WHY_POINTS = [
  {
    icon: "shield",
    title: "Florida-licensed & fully insured",
    body: "Certified master plumbers, background-checked techs, and insurance on every single job — big ticket or small drip.",
  },
  {
    icon: "gauge",
    title: "Upfront pricing, no surprises",
    body: "You get the number before we start, in writing. If the scope changes, you approve it first. Ever. No 'and while we're here'.",
  },
  {
    icon: "truck",
    title: "Trucks stocked like a job store",
    body: "Water heaters, PEX, copper, disposals, sumps, bibs — if it's in the catalog, it's on the truck. Most repairs done in one visit.",
  },
  {
    icon: "clock",
    title: "Actually open 24 hours",
    body: "A real human answers at 2 AM. Burst line at midnight? We dispatch, we don't voicemail. Emergency service, every day of the year.",
  },
];
