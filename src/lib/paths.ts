import type { MoneyPath } from "./types";

export const PATHS: MoneyPath[] = [
  {
    id: "sell-stuff",
    name: "Sell what you already own",
    kicker: "First dollar today",
    summary:
      "The fastest legal money most people skip. Walk your room, photograph what you have not used in six months, and list it before lunch.",
    category: "today",
    speed: "Today",
    pay: "$20–$400 this week",
    effort: "low",
    firstAction: "Photograph and list three things you have not used in six months.",
    needsAny: ["phone", "stuff"],
    needsAll: [],
    blockedBy: [],
    boostedBy: ["anxiety", "no-car", "low-energy", "no-calls"],
    requirements: ["A phone with a camera", "Anything unused worth $10+"],
    steps: [
      {
        title: "Do a 20-minute raid",
        body: "Clothes with tags, extra shoes, games, headphones, tools, kitchen gadgets, collectibles, old phones. If you would not buy it again, it is inventory.",
      },
      {
        title: "Price against sold listings",
        body: "Search the item on eBay, filter Sold. Price at about 70% of that and write “cash, pickup today.” Underpricing is a feature when you need the money this week.",
      },
      {
        title: "Post where buyers already are",
        body: "Facebook Marketplace first (local, no shipping). Then OfferUp or Craigslist. eBay/Depop if it is small and ships. Reply in under ten minutes — flakes are the tax.",
      },
      {
        title: "Meet in public, take cash or instant pay",
        body: "Police station lobby or a busy store. Count the cash. If they want to “see it at home,” that is not a buyer.",
      },
    ],
    script: {
      title: "Marketplace listing template",
      body: "TITLE: [Brand] [item] — cash, pickup today\nPRICE: [70% of sold comps]\n\nClean, working, [one honest flaw]. Can meet this afternoon at [grocery store / police lobby]. Cash or instant transfer. Not interested in trades.",
    },
    links: [
      { label: "Facebook Marketplace", href: "https://www.facebook.com/marketplace" },
      { label: "OfferUp", href: "https://offerup.com" },
      { label: "eBay sold listings", href: "https://www.ebay.com" },
    ],
    base: 78,
  },
  {
    id: "delivery",
    name: "Deliver food and groceries",
    kicker: "Same-week cash",
    summary:
      "Apps will pay you to move bags around town. Not a career. It is a tap that turns hours into money while you look for something better.",
    category: "this-week",
    speed: "1–3 days",
    pay: "$14–$25 / hr before gas",
    effort: "medium",
    firstAction: "Apply to DoorDash and Uber Eats today — both, not one.",
    needsAny: ["car", "bike", "drive"],
    needsAll: ["phone"],
    blockedBy: ["no-id", "body"],
    boostedBy: [],
    requirements: ["18+", "Smartphone", "Bike, scooter, or car", "Bank account or debit card for payouts"],
    steps: [
      {
        title: "Apply to two apps tonight",
        body: "DoorDash and Uber Eats. Instacart if you can shop. Background checks take a day or two. Do not wait for one to approve.",
      },
      {
        title: "Photograph your documents now",
        body: "ID, and if you drive: license, insurance, registration. Apps stall people who hunt for paperwork later.",
      },
      {
        title: "Work dinner, not whenever",
        body: "Lunch 11–1:30 and dinner 5–8:30. Weekends beat weekdays. Decline long-distance junk. After gas, some hours are not worth it — treat it like a shift, not a lifestyle.",
      },
      {
        title: "Cash out daily until runway is stable",
        body: "Instant payout fees are annoying and still cheaper than an overdraft. Once you have two weeks of cash, switch to free weekly payout.",
      },
    ],
    warning:
      "Pay looks higher before fuel, maintenance, and unpaid wait time. Track real net for three shifts before you call it a plan.",
    links: [
      { label: "DoorDash Dasher", href: "https://www.doordash.com/dasher/signup" },
      { label: "Uber Eats", href: "https://www.uber.com/us/en/deliver" },
      { label: "Instacart shopper", href: "https://shoppers.instacart.com" },
    ],
    base: 70,
  },
  {
    id: "tasks",
    name: "Neighborhood tasks",
    kicker: "Odd jobs, real rates",
    summary:
      "Furniture assembly, yard work, IKEA, moving a couch, standing in line. People pay $25–$50 an hour to not do this themselves.",
    category: "this-week",
    speed: "2–7 days",
    pay: "$20–$50 / hr",
    effort: "medium",
    firstAction: "Post a short “available this week” note in two local groups, and apply to TaskRabbit.",
    needsAny: ["lift", "talk", "phone"],
    needsAll: [],
    blockedBy: ["body"],
    boostedBy: [],
    requirements: ["Phone", "Can show up on time", "Basic tools help but are not required at first"],
    steps: [
      {
        title: "TaskRabbit plus local groups",
        body: "TaskRabbit takes a cut but sends jobs. In parallel, post in Nextdoor and two Facebook neighborhood groups. One post, not five spam posts.",
      },
      {
        title: "Pick two services and own them",
        body: "Assembly + moving help, or yard + junk hauls. Generalists look unemployed. Specialists look hireable.",
      },
      {
        title: "Price a first-job discount, then raise",
        body: "First three jobs: slightly under market, cash, same-day. Collect a one-line review. Then charge normally.",
      },
    ],
    script: {
      title: "Local “available” post",
      body: "Hi — I’m available this week for furniture assembly, moving help, yard work, and odd jobs. I can start tomorrow. Cash or instant pay. Message me with the task and a photo. I’m local to [neighborhood].",
    },
    links: [
      { label: "TaskRabbit", href: "https://www.taskrabbit.com" },
      { label: "Nextdoor", href: "https://nextdoor.com" },
    ],
    base: 64,
  },
  {
    id: "walk-in",
    name: "Walk in and get hired",
    kicker: "Still works",
    summary:
      "Restaurants, warehouses, hotels, grocery, and retail still hire people who show up Tuesday afternoon and ask for the manager. Online-only is how you wait two weeks to be ignored.",
    category: "this-week",
    speed: "This week",
    pay: "$13–$20 / hr",
    effort: "medium",
    firstAction: "Pick three businesses within 20 minutes. Go in person between 2–4pm Tuesday–Thursday.",
    needsAny: ["talk"],
    needsAll: [],
    blockedBy: [],
    boostedBy: [],
    requirements: ["ID for I-9 / equivalent in your country", "Can work a shift this week"],
    steps: [
      {
        title: "Make a three-stop list",
        body: "Places that look busy: grocery, fast casual, warehouse, hotel, big-box. Avoid empty storefronts. If a sign says hiring, that is stop one.",
      },
      {
        title: "Go 2–4pm, Tue–Thu",
        body: "Not Saturday rush. Not Monday morning. Ask for the manager. If they are slammed, “When should I come back?” is a real question.",
      },
      {
        title: "Bring a one-page sheet",
        body: "Name, phone, email, three lines of anything you have done (even informal). “I can start this week” belongs at the top.",
      },
      {
        title: "Do five stops, not two",
        body: "Two feels like trying. Five is a shift. Log every stop in Pipeline so you follow up in 48 hours.",
      },
    ],
    script: {
      title: "What you say at the counter",
      body: "Hi — I want to work here. I can start this week, days or evenings. Who should I talk to about applying? I have a one-page sheet if that’s useful.",
    },
    links: [
      { label: "Indeed hiring near you", href: "https://www.indeed.com" },
      { label: "Snagajob", href: "https://www.snagajob.com" },
    ],
    base: 72,
  },
  {
    id: "temp",
    name: "Temp and labor agencies",
    kicker: "They already have the jobs",
    summary:
      "Agencies exist to fill shifts this week. You are the product they sell. That is ugly and useful. Register at two, not one.",
    category: "this-week",
    speed: "2–10 days",
    pay: "$14–$22 / hr",
    effort: "medium",
    firstAction: "Register at two local temp agencies. Bring ID and be ready to take a shift this week.",
    needsAny: ["lift", "phone"],
    needsAll: [],
    blockedBy: ["no-id"],
    boostedBy: ["record"],
    requirements: ["Government ID", "Often a drug screen and boots or closed shoes"],
    steps: [
      {
        title: "Find two agencies, not a job board",
        body: "Search “[your city] temp agency” and “[your city] staffing warehouse.” PeopleReady, Adecco, Randstad, local shops. Walk in if they have a storefront.",
      },
      {
        title: "Treat registration like a job interview",
        body: "On time, closed shoes, phone charged, “I can work tomorrow.” Say yes to the first reasonable shift. You can be picky after you have cash.",
      },
      {
        title: "Keep the second agency warm",
        body: "If one goes quiet, the other still texts. Check in every morning until they send you out.",
      },
    ],
    links: [
      { label: "PeopleReady", href: "https://www.peopleready.com" },
      { label: "Adecco", href: "https://www.adecco.com" },
    ],
    base: 68,
  },
  {
    id: "cleaning",
    name: "Clean houses and Airbnbs",
    kicker: "Recurring, not heroic",
    summary:
      "One client who wants every other Thursday is worth more than ten one-off gigs. Start with people you already know, then neighbors.",
    category: "this-week",
    speed: "This week",
    pay: "$25–$45 / hr",
    effort: "medium",
    firstAction: "Text five people you know: you are taking cleaning jobs starting this week.",
    needsAny: ["clean", "phone"],
    needsAll: [],
    blockedBy: ["body"],
    boostedBy: ["anxiety", "no-car"],
    requirements: ["Supplies for the first job (borrow or buy a starter kit)", "Reliable arrival"],
    steps: [
      {
        title: "Warm market first",
        body: "Text friends, family, old coworkers: you are taking 2–3 cleaning jobs. People like hiring someone they already trust.",
      },
      {
        title: "Then neighbors",
        body: "Nextdoor and a single Marketplace post. Offer a first-clean price and a recurring rate. Recurring is the point.",
      },
      {
        title: "Standard job, standard pay",
        body: "2–3 hours, supplies included, cash or instant pay after. Take before/after photos for the next listing (with permission).",
      },
    ],
    script: {
      title: "Text to people you know",
      body: "Hey — I’m taking a few house cleaning jobs starting this week to get cash moving. 2–3 hours, supplies included. If you or anyone you know needs a clean, send them my way.",
    },
    links: [
      { label: "Nextdoor", href: "https://nextdoor.com" },
      { label: "Thumbtack", href: "https://www.thumbtack.com" },
    ],
    base: 66,
  },
  {
    id: "pets",
    name: "Walk and sit pets",
    kicker: "If animals are easy for you",
    summary:
      "Rover and local group chats pay for walks, drop-ins, and overnight sits. It is real money if you like dogs more than people.",
    category: "this-week",
    speed: "3–10 days",
    pay: "$20–$40 / walk · $40–$80 / night",
    effort: "low",
    firstAction: "Create a Rover profile today and ask two people for a one-line recommendation.",
    needsAny: ["animals"],
    needsAll: ["animals"],
    blockedBy: [],
    boostedBy: ["anxiety", "low-energy"],
    requirements: ["Comfortable with animals", "Can be reachable during a sit"],
    steps: [
      {
        title: "Profile with a real photo",
        body: "Face + a dog if you have one. Write like a calm adult, not a brochure. Background check takes a few days — start it now.",
      },
      {
        title: "Price to get the first two reviews",
        body: "Slightly under neighborhood average until you have two five-star reviews. Then match market.",
      },
      {
        title: "Local backup",
        body: "Post once in a neighborhood group: weekday walks and weekend drop-ins. Meet the animal before you agree to a sit.",
      },
    ],
    links: [
      { label: "Rover", href: "https://www.rover.com" },
      { label: "Wag", href: "https://wagwalking.com" },
    ],
    base: 58,
  },
  {
    id: "overnight",
    name: "Overnight and quiet shifts",
    kicker: "Fewer people, a paycheck",
    summary:
      "Night audit, security, stocking, bakeries, hospitals. If daytime crowds or talking drain you, the building still needs someone at 2am.",
    category: "steady",
    speed: "1–3 weeks",
    pay: "$14–$22 / hr",
    effort: "medium",
    firstAction: "Apply to five overnight roles: hotel night audit, security, stocking, hospital support.",
    needsAny: ["overnight-ok", "computer", "phone"],
    needsAll: [],
    blockedBy: [],
    boostedBy: ["anxiety", "low-energy"],
    requirements: ["Can stay awake on a night schedule", "Often 18+ and a background check"],
    steps: [
      {
        title: "Search the right words",
        body: "Indeed: “night auditor”, “overnight stocker”, “security officer unarmed”, “overnight baker”, “hospital transporter.” Filter last 3 days.",
      },
      {
        title: "Hotels first",
        body: "Night audit is a desk, a computer, and a quiet lobby. Apply at three hotels near you, then walk in with the same script as walk-in hiring.",
      },
      {
        title: "Protect the sleep",
        body: "If you get the job, treat daytime like night. This path fails when people keep a day schedule on top of it.",
      },
    ],
    links: [{ label: "Indeed overnight jobs", href: "https://www.indeed.com/q-overnight-jobs.html" }],
    base: 62,
  },
  {
    id: "remote-cs",
    name: "Remote customer support",
    kicker: "A job you can do from a room",
    summary:
      "Real companies hire people with a quiet room, a computer, and a decent headset. Hiring is slower than gigs. The paycheck is cleaner.",
    category: "steady",
    speed: "2–6 weeks",
    pay: "$15–$22 / hr",
    effort: "medium",
    firstAction: "Apply to five remote support roles and fix your headset / internet today.",
    needsAny: ["computer", "write", "talk"],
    needsAll: ["computer"],
    blockedBy: ["no-id"],
    boostedBy: ["no-car", "rural", "anxiety"],
    requirements: ["Quiet space", "Wired or stable internet", "Computer", "Often a headset and a US/UK/etc. work authorization"],
    steps: [
      {
        title: "Apply like it is a part-time job",
        body: "Ten quality applications beat fifty empty ones. Concentrix, Teleperformance, Apple at Home, smaller SaaS “support specialist” listings.",
      },
      {
        title: "Pass the homework",
        body: "Many send a written scenario or a typing test. Do it the same day. That alone beats most of the pile.",
      },
      {
        title: "Do not quit cash paths while you wait",
        body: "This is the 2–6 week layer. Delivery, selling, and walk-ins keep the lights on until week one of payroll.",
      },
    ],
    links: [
      { label: "We Work Remotely", href: "https://weworkremotely.com" },
      { label: "Indeed: remote customer service", href: "https://www.indeed.com/q-remote-customer-service-jobs.html" },
    ],
    base: 60,
  },
  {
    id: "tutoring",
    name: "Tutor something you already know",
    kicker: "If you were ever good at a subject",
    summary:
      "High school math, English, a language, music, coding, citizenship tests. You do not need a teaching credential to start locally.",
    category: "this-week",
    speed: "This week locally",
    pay: "$20–$60 / hr",
    effort: "low",
    firstAction: "Name one subject you can explain. Post a $25 first-session offer locally.",
    needsAny: ["subject"],
    needsAll: ["subject"],
    blockedBy: [],
    boostedBy: ["anxiety"],
    requirements: ["One subject you can explain clearly", "A table, library, or video call"],
    steps: [
      {
        title: "Pick one subject",
        body: "Algebra, essay editing, Spanish, guitar, intro Python. Specific sells. “I tutor anything” does not.",
      },
      {
        title: "Local first, platforms second",
        body: "Parent Facebook groups and Nextdoor convert faster than Wyzant. Platforms are backup once you want volume.",
      },
      {
        title: "First session is a paid trial",
        body: "45 minutes, $25, then your real rate. Show up with a simple plan so it feels like school, not hanging out.",
      },
    ],
    script: {
      title: "Local tutoring post",
      body: "Offering [subject] tutoring, in person or video. I [one proof: grades, degree, years, or “helped my sibling pass”]. First session $25 / 45 min. Message me with the student’s year and what they’re stuck on.",
    },
    links: [
      { label: "Wyzant", href: "https://www.wyzant.com" },
      { label: "Superprof", href: "https://www.superprof.com" },
    ],
    base: 55,
  },
  {
    id: "benefits",
    name: "Money and food you may already be owed",
    kicker: "File this week",
    summary:
      "Unemployment, food assistance, health coverage, local emergency funds. This is not a personality. It is a form. If you were laid off, file today.",
    category: "owed",
    speed: "File today · pay varies",
    pay: "Bills and groceries, not a wage",
    effort: "low",
    firstAction: "If you were laid off, file unemployment today. Then search food assistance for your area.",
    needsAny: [],
    needsAll: [],
    blockedBy: [],
    boostedBy: ["no-car", "low-energy", "anxiety", "body", "caregiving"],
    requirements: ["ID and some proof of income / layoff, depending on the program"],
    steps: [
      {
        title: "Unemployment first if you had a job",
        body: "File in the state or country that employed you. Do it even if you are unsure. Late filing is how people lose weeks of pay.",
      },
      {
        title: "Food and health next",
        body: "In the US: SNAP and Medicaid via your state portal, or community action agencies. Elsewhere: search “[country] unemployment benefits” and “[country] food assistance.”",
      },
      {
        title: "Local emergency help",
        body: "211 (US/Canada), councils, charities, and churches still pay rent and utilities in a pinch. Call once, take notes, follow the list they give you.",
      },
    ],
    warning:
      "Rules differ by country and change. This is a prompt to file, not legal advice. Deadlines matter more than perfect paperwork.",
    links: [
      { label: "US unemployment finder", href: "https://www.usa.gov/unemployment-benefits" },
      { label: "Find food assistance (US)", href: "https://www.benefits.gov/benefit/361" },
      { label: "211 directory", href: "https://www.211.org" },
    ],
    base: 80,
  },
  {
    id: "plasma",
    name: "Donate plasma",
    kicker: "Imperfect, immediate",
    summary:
      "Not a job and not a personality. Clinics pay because they can. If you are healthy enough, it can buy groceries this week while other paths start.",
    category: "today",
    speed: "This week",
    pay: "$50–$100 / visit, ~2× a week",
    effort: "low",
    firstAction: "Find a plasma center within reach and book the new-donor appointment.",
    needsAny: ["phone"],
    needsAll: [],
    blockedBy: ["body", "no-id"],
    boostedBy: ["no-car", "low-energy", "anxiety"],
    requirements: ["18–69 typically", "ID, proof of address, SSN/equivalent", "Pass a health screen"],
    steps: [
      {
        title: "Find the nearest center",
        body: "BioLife, CSL, Octapharma. New-donor bonuses are the only time this pays decently. First visit is long. Bring water and something to watch.",
      },
      {
        title: "Treat it as a bridge",
        body: "Two visits a week max at most centers. Hydrate. Eat. If you feel wrecked, stop. This is a bridge off zero, not a plan for December.",
      },
    ],
    warning:
      "You are selling a bit of your body to a clinic. That is a fact, not a vibe. Skip this if you are unwell, underweight, or it wrecks your week.",
    links: [
      { label: "BioLife", href: "https://www.biolifeplasma.com" },
      { label: "CSL Plasma", href: "https://www.cslplasma.com" },
    ],
    base: 50,
  },
  {
    id: "freelance",
    name: "Get paid for a skill you already have",
    kicker: "Slow first dollar, higher ceiling",
    summary:
      "Writing, design, video, coding, bookkeeping, translation. Upwork is a mall. Your first client is more likely a local business or someone you already know.",
    category: "steady",
    speed: "2–8 weeks",
    pay: "$25–$150 / hr once you have proof",
    effort: "high",
    firstAction: "Message three people who have seen your work and offer a small paid job this month.",
    needsAny: ["write", "design", "code", "language", "computer"],
    needsAll: ["computer"],
    blockedBy: [],
    boostedBy: ["no-car", "rural"],
    requirements: ["A portfolio of even three samples", "A way to invoice"],
    steps: [
      {
        title: "Warm network, not the mall",
        body: "Text people who have seen you do the thing. Offer a small, priced job — a landing page, a product description batch, a logo refresh. Paid, not “for exposure.”",
      },
      {
        title: "One public sample this week",
        body: "If you have nothing to show, make one spec piece for a fictional local shop. Three hours, published, good enough.",
      },
      {
        title: "Platforms as volume, later",
        body: "Upwork and similar take a cut and bury new accounts. Use them after you have two paid jobs and reviews, or not at all.",
      },
    ],
    warning: "This is not “passive.” It is sales plus the work. Keep a cash path running until invoices actually land.",
    links: [
      { label: "Contra", href: "https://contra.com" },
      { label: "Upwork", href: "https://www.upwork.com" },
    ],
    base: 48,
  },
  {
    id: "trades",
    name: "Get paid to learn a trade",
    kicker: "The long easy life",
    summary:
      "HVAC, electrical, plumbing, welding, CDL, elevator, the utility. Apprenticeships pay while you train. This is how a lot of people actually get out, not courses.",
    category: "steady",
    speed: "1–3 months to start",
    pay: "Paid training, then real wages",
    effort: "high",
    firstAction: "Find one apprenticeship or CDL/HVAC program in your area and request the next info session.",
    needsAny: ["lift", "drive"],
    needsAll: [],
    blockedBy: [],
    boostedBy: ["record"],
    requirements: ["Often 18+", "License and a body that can work", "Some programs help with records"],
    steps: [
      {
        title: "Look at paid training, not school debt",
        body: "Union apprenticeships, utility line schools, employer-sponsored CDL. If they charge you $12k up front with a smile, keep walking.",
      },
      {
        title: "Apply like a job",
        body: "Apprenticeship season is real. Miss the window and you wait. Put your name on two lists this week.",
      },
      {
        title: "Cash paths until day one",
        body: "This is the 12-month easy life, not the 12-day one. Keep selling, gigs, or a temp job until the first training paycheck.",
      },
    ],
    links: [
      { label: "Apprenticeship.gov (US)", href: "https://www.apprenticeship.gov" },
      { label: "Find a trade program", href: "https://www.careeronestop.org" },
    ],
    base: 44,
  },
];

export const SKILL_OPTIONS: { id: import("./types").SkillId; label: string; hint: string }[] = [
  { id: "phone", label: "Smartphone", hint: "Camera, apps, maps" },
  { id: "computer", label: "Computer + internet", hint: "Laptop or desktop you can sit at" },
  { id: "car", label: "A car I can use", hint: "Even a beat-up one" },
  { id: "bike", label: "A bike or scooter", hint: "Good enough for town" },
  { id: "drive", label: "Valid license", hint: "I can legally drive" },
  { id: "lift", label: "I can do physical work", hint: "Moving, warehouse, yard" },
  { id: "talk", label: "I can talk to people", hint: "Not happily. Just can." },
  { id: "write", label: "I can write clearly", hint: "Emails, posts, copy" },
  { id: "design", label: "Design or video", hint: "Even a little" },
  { id: "code", label: "Some coding", hint: "Anything that runs" },
  { id: "language", label: "Another language", hint: "Useful, not fluent-or-bust" },
  { id: "subject", label: "A subject I can teach", hint: "Math, language, music, a game" },
  { id: "stuff", label: "Things I could sell", hint: "Closet, garage, gear" },
  { id: "animals", label: "Fine with animals", hint: "Dogs, cats, sitting" },
  { id: "overnight-ok", label: "I can work nights", hint: "Sleep schedule willing" },
  { id: "clean", label: "I can clean well", hint: "Houses, Airbnbs, offices" },
];

export const CONSTRAINT_OPTIONS: { id: import("./types").ConstraintId; label: string }[] = [
  { id: "no-car", label: "No car" },
  { id: "no-id", label: "ID / papers are a problem" },
  { id: "anxiety", label: "Social anxiety / dread of people" },
  { id: "no-calls", label: "I avoid phone calls" },
  { id: "caregiving", label: "I care for someone" },
  { id: "record", label: "A record that blocks some jobs" },
  { id: "no-bank", label: "No bank account yet" },
  { id: "body", label: "Physical limits / chronic pain" },
  { id: "low-energy", label: "Energy is unreliable" },
  { id: "rural", label: "I live far from a city" },
  { id: "under-21", label: "Under 21" },
];

export const SITUATIONS: { id: import("./types").Situation; label: string; blurb: string }[] = [
  { id: "crisis", label: "I need cash in 48 hours", blurb: "Rent, food, the edge." },
  { id: "laid-off", label: "I just lost a job", blurb: "File the claim. Then the next dollar." },
  { id: "between", label: "I’m between things", blurb: "Not a crisis. Not a plan either." },
  { id: "long-out", label: "I’ve been out a long time", blurb: "NEET, gap, whatever the word is." },
  { id: "never", label: "I’ve never really had a job", blurb: "We start smaller and closer." },
];
