import { useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL STYLES
// ─────────────────────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #fff; }

  .mm-app {
    font-family: 'Libre Baskerville', Georgia, serif;
    background: #fff;
    color: #0a0a0a;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── HEADER ── */
  .mm-header {
    border-bottom: 2px solid #0a0a0a;
    padding: 14px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    background: #fff;
    z-index: 200;
  }
  .mm-header-left { display: flex; align-items: center; gap: 20px; }
  .mm-back-btn {
    background: none;
    border: none;
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #888;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0;
    transition: color 0.2s;
  }
  .mm-back-btn:hover { color: #0a0a0a; }
  .mm-brand {
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #0a0a0a;
  }
  .mm-tagline {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #aaa;
  }

  /* ── PROGRESS ── */
  .mm-progress {
    height: 3px;
    background: #ebebeb;
  }
  .mm-progress-fill {
    height: 100%;
    background: #0a0a0a;
    transition: width 0.5s ease;
  }

  /* ── MAIN ── */
  .mm-main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  /* ── FOOTER ── */
  .mm-footer {
    background: #0a0a0a;
    padding: 16px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mm-footer-l {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #fff;
  }
  .mm-footer-r {
    font-family: 'DM Mono', monospace;
    font-size: 9px;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    color: #555;
  }

  /* ── SHARED BUTTONS ── */
  .mm-btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: #0a0a0a;
    color: #fff;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    padding: 16px 32px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  .mm-btn-primary:hover { background: #333; }
  .mm-btn-primary:disabled { opacity: 0.35; cursor: default; }
  .mm-btn-outline {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    background: transparent;
    color: #0a0a0a;
    font-family: 'DM Mono', monospace;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 2.5px;
    text-transform: uppercase;
    padding: 15px 31px;
    border: 1.5px solid #0a0a0a;
    cursor: pointer;
    transition: all 0.2s;
  }
  .mm-btn-outline:hover { background: #0a0a0a; color: #fff; }

  /* ── SHARED INPUT ── */
  .mm-input {
    border: 1.5px solid #0a0a0a;
    padding: 14px 18px;
    font-family: 'Libre Baskerville', serif;
    font-size: 14px;
    color: #0a0a0a;
    background: #fff;
    outline: none;
    width: 100%;
  }
  .mm-input::placeholder { color: #bbb; }
  .mm-input:focus { box-shadow: 3px 3px 0 #0a0a0a; }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { animation: fadeUp 0.4s ease forwards; }

  @media (max-width: 640px) {
    .mm-header { padding: 12px 20px; }
    .mm-footer { padding: 14px 20px; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// HUB DATA
// ─────────────────────────────────────────────────────────────────────────────
const MAGNETS = [
  {
    id: "m1",
    number: "01",
    label: "Diagnostic",
    title: "Retainer Readiness Audit",
    desc: "Find out exactly why clients aren't staying — in 5 minutes. Get your personalized diagnosis and the one shift that fixes it.",
    time: "5 min",
    type: "Interactive Quiz",
    cta: "Take the audit",
  },
  {
    id: "m2",
    number: "02",
    label: "Guide",
    title: "The Retainer Blueprint",
    desc: "The exact system stable VAs use to turn one-off clients into long-term income. Includes AI-powered templates you can implement this afternoon.",
    time: "20 min read",
    type: "PDF Guide",
    cta: "Download the blueprint",
  },
  {
    id: "m3",
    number: "03",
    label: "Builder",
    title: "Stable Income System Builder",
    desc: "Build your complete retainer operating system in one sitting — the four components that keep clients paying month after month.",
    time: "45 min build",
    type: "Interactive Builder",
    cta: "Build your system",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAGNET 1 DATA
// ─────────────────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 1, section: "YOUR RESULTS",
    question: "When you finish a project or month of work, what do you send your client?",
    options: [
      { text: "A summary showing what I achieved and the business impact", scores: { I: 0, C: 0, W: 0 } },
      { text: "A list of tasks I completed", scores: { I: 1, C: 0, W: 0 } },
      { text: "The final deliverable — nothing else", scores: { I: 2, C: 0, W: 0 } },
      { text: "Whatever they ask for — I have no standard", scores: { I: 1, C: 1, W: 0 } },
    ],
  },
  {
    id: 2, section: "YOUR RESULTS",
    question: "If your client had to explain your value to someone else right now, could they do it clearly?",
    options: [
      { text: "Yes — I make sure they can articulate what I do for their business", scores: { I: 0, C: 0, W: 0 } },
      { text: "Probably — they know I'm helpful but not in specific terms", scores: { I: 1, C: 0, W: 0 } },
      { text: "Unlikely — I just get things done quietly", scores: { I: 2, C: 0, W: 0 } },
      { text: "I've never thought about this", scores: { I: 2, C: 1, W: 0 } },
    ],
  },
  {
    id: 3, section: "YOUR RESULTS",
    question: "Do you track any numbers that connect your work to your client's business outcomes?",
    options: [
      { text: "Yes — I have metrics I report on regularly", scores: { I: 0, C: 0, W: 0 } },
      { text: "I track tasks and hours but not business impact", scores: { I: 1, C: 0, W: 0 } },
      { text: "No — I focus on completing work, not measuring it", scores: { I: 2, C: 0, W: 0 } },
      { text: "I wouldn't know what to measure", scores: { I: 2, C: 1, W: 0 } },
    ],
  },
  {
    id: 4, section: "YOUR PROCESS",
    question: "When a new client starts with you, what happens in the first week?",
    options: [
      { text: "I follow a documented onboarding process — same every time", scores: { I: 0, C: 0, W: 0 } },
      { text: "I send a questionnaire but it varies each time", scores: { I: 0, C: 1, W: 0 } },
      { text: "I ask what they need and figure it out from there", scores: { I: 0, C: 2, W: 0 } },
      { text: "They tell me what to do and I start immediately", scores: { I: 0, C: 2, W: 1 } },
    ],
  },
  {
    id: 5, section: "YOUR PROCESS",
    question: "Do your clients know exactly what to expect from you each week?",
    options: [
      { text: "Yes — I have a set communication rhythm they rely on", scores: { I: 0, C: 0, W: 0 } },
      { text: "Sort of — it depends on the client and the week", scores: { I: 0, C: 1, W: 0 } },
      { text: "They hear from me when I have something to share", scores: { I: 1, C: 2, W: 0 } },
      { text: "No standard — I communicate when needed", scores: { I: 0, C: 2, W: 0 } },
    ],
  },
  {
    id: 6, section: "YOUR PROCESS",
    question: "When something goes wrong — a missed deadline, a mistake — what do you do?",
    options: [
      { text: "Flag it early, explain what happened, propose a fix", scores: { I: 0, C: 0, W: 0 } },
      { text: "Apologise immediately and fix it as fast as possible", scores: { I: 0, C: 1, W: 0 } },
      { text: "Fix it quietly and hope they don't notice", scores: { I: 0, C: 2, W: 0 } },
      { text: "Panic — I don't have a protocol for this", scores: { I: 0, C: 2, W: 0 } },
    ],
  },
  {
    id: 7, section: "YOUR CLIENTS",
    question: "How do most of your clients currently find and hire you?",
    options: [
      { text: "Referrals from past clients or my network", scores: { I: 0, C: 0, W: 0 } },
      { text: "A mix — some referrals, some job boards", scores: { I: 0, C: 0, W: 1 } },
      { text: "Job boards and platforms like Upwork or OnlineJobs", scores: { I: 0, C: 0, W: 2 } },
      { text: "I apply to postings and take what I can get", scores: { I: 0, C: 0, W: 2 } },
    ],
  },
  {
    id: 8, section: "YOUR CLIENTS",
    question: "When you pitch your services, what do you typically offer?",
    options: [
      { text: "Monthly retainer packages with clear outcomes", scores: { I: 0, C: 0, W: 0 } },
      { text: "Service packages — fixed scope, fixed price", scores: { I: 0, C: 0, W: 1 } },
      { text: "Hourly rates", scores: { I: 0, C: 0, W: 2 } },
      { text: "Whatever the client asks for", scores: { I: 0, C: 1, W: 2 } },
    ],
  },
  {
    id: 9, section: "YOUR CLIENTS",
    question: "What type of work do your current clients hire you for?",
    options: [
      { text: "Ongoing operational support — they need me every month", scores: { I: 0, C: 0, W: 0 } },
      { text: "A mix — some ongoing, some one-off projects", scores: { I: 0, C: 0, W: 1 } },
      { text: "Mostly specific projects with a clear end date", scores: { I: 0, C: 0, W: 2 } },
      { text: "Whatever work is available", scores: { I: 0, C: 0, W: 2 } },
    ],
  },
  {
    id: 10, section: "YOUR CLIENTS",
    question: "When you deliver great work, what usually happens next?",
    options: [
      { text: "The client offers more work or asks about ongoing support", scores: { I: 0, C: 0, W: 0 } },
      { text: "They say thank you — and sometimes come back later", scores: { I: 1, C: 0, W: 1 } },
      { text: "They say thank you and disappear", scores: { I: 1, C: 0, W: 2 } },
      { text: "I'm never sure what to expect after a project ends", scores: { I: 1, C: 1, W: 1 } },
    ],
  },
];

const RESULTS = {
  I: {
    code: "THE INVISIBLE WORKER",
    tagline: "You deliver excellent work. Clients like you. But they can't see you clearly enough to keep you.",
    diagnosis: "Your value is real — but it's invisible. When a client decides whether to commit to a monthly retainer, they need to answer one question: 'Is this VA worth paying for every single month?' Right now, your work doesn't give them a clear answer. You complete tasks. You deliver files. But you are not showing them the business impact — which means when budget conversations happen, you're the easiest line item to cut.",
    costs: "Clients who genuinely liked working with you disappear after the project ends — not because you weren't good, but because they couldn't clearly articulate what keeping you would do for their business. You become a nice-to-have instead of a need-to-have.",
    fix: "Start reporting outcomes, not outputs. Every week or month, send your client one page showing what moved because of your work. Not a task list — a results summary. 'Last month I managed your inbox, processed 47 vendor invoices, and caught a billing error that saved you ₱18,000.' That one habit makes you undeniable.",
    next: "The Retainer Blueprint includes a ready-to-use AI-powered Monthly Impact Report template — the exact document that makes your value visible and your retainer renewal automatic.",
  },
  C: {
    code: "THE CHAOS SIGNAL",
    tagline: "Your work is good. But something in how you operate tells premium clients you're not ready for long-term commitment.",
    diagnosis: "Premium clients don't just evaluate the quality of your deliverables — they evaluate the experience of working with you. How organized your onboarding feels. How predictable your communication is. How you handle problems when they arise. Right now, something in your process is sending a signal that working with you long-term would require too much management from their side.",
    costs: "Clients enjoy your work but find themselves doing extra administrative work around you — chasing updates, re-explaining context, managing expectations you should be setting. Eventually they quietly decide not to continue, even if they never tell you why.",
    fix: "Build three visible systems — a repeatable onboarding process, a weekly communication rhythm, and a clear protocol for when things go wrong. These three things alone signal to a premium client that you operate at retainer level. You don't need to be perfect. You need to be predictable.",
    next: "The Retainer Blueprint includes plug-and-play templates for all three systems — built in an afternoon using AI tools you already have. The Stable Income System Builder walks you through building your complete client operations infrastructure in one sitting.",
  },
  W: {
    code: "THE WRONG CLIENT TRAP",
    tagline: "Your work is strong. But the clients you're attracting were never going to stay — by design.",
    diagnosis: "There is a category of client who hires VAs for projects. They need something built, something done, something finished — and then they're gone. No amount of excellent work converts a project client into a retainer client, because they never intended to retain anyone. The problem is not your skills or your delivery. The problem is that where you're finding clients and how you're positioning yourself is attracting exactly this type of buyer — over and over again.",
    costs: "You work hard, deliver well, get genuine praise — and then face another empty calendar. The feast-or-famine cycle is not a reflection of your ability. It's a reflection of your pipeline. You are filling it with the wrong people, not because you can't attract the right ones, but because nothing in your current approach signals that you offer ongoing operational partnership.",
    fix: "Stop pricing and positioning for projects. Restructure your offer as a monthly partnership with a clear ongoing scope — and find the channels where retainer-seeking clients actually look. This means changing how you describe what you do, how you price it, and where you show up.",
    next: "The Retainer Blueprint includes the exact retainer package structure and positioning language that attracts ongoing clients — plus the word-for-word conversation that transitions a project client into a retainer relationship.",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// MAGNET 2 DATA
// ─────────────────────────────────────────────────────────────────────────────
const BLUEPRINT_SECTIONS = [
  {
    number: "SHIFT 01",
    title: "From Deliverable to Outcome",
    subtitle: "Make your impact undeniable",
    body: "Every piece of work you deliver contains a business result your client cannot easily see on their own. Your job is to surface it. When a client sees 'managed inbox' they think admin cost. When they see 'cleared 340 emails, flagged 3 urgent client issues, and prevented one missed payment deadline' — they think operational partner worth keeping.",
    action: "The Monthly Impact Report",
    action_desc: "A one-page document you produce every month in 20 minutes using the AI prompt below. It translates your task list into business language your client uses to justify your retainer to themselves — and to anyone else who asks.",
    ai_prompt: `Use this prompt in ChatGPT or Claude at the end of each month:\n\n"I am a VA. Here is my task list from this month: [paste your tasks]. My client's business is [describe their business]. Rewrite my task list as a one-page impact summary showing the business value of each item. Use specific numbers where possible. Format it as a professional report I can send to my client. Keep it under one page."`,
    highlight: "VAs who send monthly impact reports are 3× more likely to receive unsolicited retainer offers from existing clients.",
  },
  {
    number: "SHIFT 02",
    title: "From Ad Hoc to System",
    subtitle: "Signal that you operate at retainer level",
    body: "Premium clients make retainer decisions based on feel as much as logic. The feel of working with you — how smooth your onboarding is, how reliable your communication is, how calmly you handle problems — tells them whether you are someone they want to depend on every month. Three systems create that feel instantly.",
    action: "The Three Visible Systems",
    action_desc: "These are not complicated. They take one afternoon to build using the AI prompts below. Once built, they run on autopilot and signal professional operations to every client you onboard from this point forward.",
    ai_prompt: `SYSTEM 1 — Onboarding:\n"I am a VA offering [your services]. Write me a 5-step client onboarding process that I can complete in the first week of any new engagement. Include: a welcome message, an information-gathering questionnaire, a scope confirmation document, a communication preferences form, and a 30-day expectation-setting email. Make it professional and warm."\n\nSYSTEM 2 — Weekly Communication:\n"Write me a weekly check-in message template I can send every Friday to retainer clients. It should cover: what I completed this week, what's planned for next week, any blockers or decisions I need from them, and one positive observation about their business. Keep it under 150 words."\n\nSYSTEM 3 — Problem Protocol:\n"Write me a 3-step protocol for when something goes wrong with a client deliverable. Include: how to flag it proactively, how to explain what happened without over-apologising, and how to propose a fix with a clear timeline. This should feel calm and professional, not panicked."`,
    highlight: "A client who experiences a smooth onboarding is 5× more likely to discuss ongoing work before the project ends.",
  },
  {
    number: "SHIFT 03",
    title: "From Project to Partnership",
    subtitle: "The conversation that changes everything",
    body: "Most VAs wait for the client to bring up ongoing work. That moment almost never comes — not because the client doesn't want ongoing support, but because they assume you're available for projects only, based on how you've positioned yourself. The retainer conversation is yours to initiate. And the timing and framing of it determines everything.",
    action: "The Retainer Transition Script",
    action_desc: "Have this conversation at the end of a successful project — after the deliverable is approved, while the client's satisfaction is highest. The script below is word-for-word. Customize the bracketed sections using the AI prompt that follows.",
    ai_prompt: `THE SCRIPT:\n"[Client name], I'm glad this project landed well. I've been thinking — a lot of what I did this month [reference 2-3 specific things] is the kind of work that compounds over time when done consistently. I'd love to put together a monthly support proposal for you. It would cover [outline 3 ongoing areas] for a fixed monthly rate of [your price]. Would that be something worth exploring?"\n\nAI CUSTOMISATION PROMPT:\n"I am a VA. My client is [describe their business]. The project I just completed was [describe project]. Using the retainer transition script framework, customize the bracketed sections for this specific client. Suggest three ongoing support areas that would be most valuable for their business type. Also suggest a monthly rate range based on the scope."`,
    highlight: "The best time to propose a retainer is within 48 hours of a client approving your best work. This script has that window built in.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAGNET 3 DATA
// ─────────────────────────────────────────────────────────────────────────────
const SYSTEM_COMPONENTS = [
  {
    id: "dashboard",
    number: "01",
    title: "Client Value Dashboard",
    desc: "A simple tracking system that makes your impact visible to yourself and your client every single month. Without this, your value is invisible — and invisible value doesn't get renewed.",
    steps: [
      { id: "d1", text: "List your top 3 active or target clients by name" },
      { id: "d2", text: "For each client, write one sentence: what business problem do I solve for them?" },
      { id: "d3", text: "Choose 2–3 metrics you will track monthly for each client (e.g. emails cleared, hours saved, tasks completed, revenue protected)" },
      { id: "d4", text: "Create a simple tracking doc (Google Sheet or Notion table) with columns: Client / Metric / This Month / Last Month / Change" },
      { id: "d5", text: "Set a recurring 15-minute calendar block every last Friday of the month to fill it in" },
    ],
    output: "Your Value Dashboard — a living document that feeds your monthly impact reports and makes every retainer renewal conversation data-backed.",
  },
  {
    id: "onboarding",
    number: "02",
    title: "Client Onboarding Sequence",
    desc: "The 5-step process that sets retainer expectations from day one — before a client has any reason to leave. This is the single highest-impact system a VA can build.",
    steps: [
      { id: "o1", text: "Write your Welcome Message: a warm, confident email sent within 1 hour of a client saying yes. Include: what happens next, your communication hours, and one thing you're excited to work on together." },
      { id: "o2", text: "Build your Intake Questionnaire: 8–10 questions covering their business goals, communication preferences, tools they use, and definition of success. Use Typeform or Google Forms." },
      { id: "o3", text: "Create your Scope Confirmation Doc: a 1-page summary of what you will deliver, by when, at what rate — signed off before work begins. No surprises." },
      { id: "o4", text: "Set your Week 1 Check-In: a scheduled 20-minute call or voice note at Day 7 to confirm alignment and catch any mismatches early." },
      { id: "o5", text: "Write your 30-Day Expectation Email: sent at Day 1, it outlines what the client can expect from you in the first month — your rhythm, your reporting, your availability." },
    ],
    output: "Your Onboarding Sequence — a repeatable, professional 5-step system that makes every new client feel they hired someone operating at premium level.",
  },
  {
    id: "retention",
    number: "03",
    title: "Monthly Retention Ritual",
    desc: "A repeatable end-of-month routine that proactively renews client commitment before the invoice lands. Done consistently, this eliminates the anxiety of wondering if clients will stay.",
    steps: [
      { id: "r1", text: "Schedule your Monthly Wrap-Up: a recurring 30-minute block on the last working day of every month — protected, non-negotiable." },
      { id: "r2", text: "Fill your Value Dashboard (Component 01) with this month's metrics." },
      { id: "r3", text: "Write your Monthly Impact Report using your AI prompt from the Blueprint. Send it before the invoice." },
      { id: "r4", text: "Add one forward-looking line to your report: 'Next month I plan to focus on [X] — does that align with your priorities?' This opens the conversation before any doubt forms." },
      { id: "r5", text: "Review: did anything go unexpectedly well this month that signals an opportunity to expand your scope? Note it. Bring it up naturally in next month's check-in." },
    ],
    output: "Your Monthly Retention Ritual — a 30-minute routine that keeps clients informed, appreciated, and re-committed before you ever ask them to renew.",
  },
  {
    id: "rate",
    number: "04",
    title: "Rate Escalation Trigger System",
    desc: "A simple decision framework that tells you exactly when and how to raise your rate with an existing retainer client — without losing them. Most VAs undercharge indefinitely because they have no trigger system.",
    steps: [
      { id: "ra1", text: "Define your trigger conditions: you will initiate a rate conversation when ANY of these are true — (1) you've worked with this client for 6+ months, (2) your scope has expanded beyond the original agreement, (3) you've produced a result that saved them measurably more than your monthly rate." },
      { id: "ra2", text: "Write your Rate Increase Message using this framework: (1) reference a specific result you produced, (2) note the expanded scope if applicable, (3) state the new rate and effective date, (4) express your commitment to the relationship. Keep it under 150 words." },
      { id: "ra3", text: "Set a 6-month recurring calendar reminder titled 'Rate Review — [Client Name]' for every active retainer client starting today." },
      { id: "ra4", text: "Decide your escalation increment: a standard 15–20% increase per review cycle is professional and rarely challenged when delivered with evidence of results." },
      { id: "ra5", text: "Practice the number out loud before you send it. The moment you can say your rate without hesitation is the moment clients accept it without hesitation." },
    ],
    output: "Your Rate Escalation System — a trigger-based decision framework that takes the emotion out of raising your rates and makes income growth systematic, not accidental.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MARKER LETTERS
// ─────────────────────────────────────────────────────────────────────────────
const MARKERS = ["A", "B", "C", "D"];

// ─────────────────────────────────────────────────────────────────────────────
// HUB SCREEN
// ─────────────────────────────────────────────────────────────────────────────
function Hub({ onSelect }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 40px 80px" }} className="fade-up">
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 20 }}>
        Margin &amp; Momentum™ · Systems Library
      </span>
      <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(52px, 9vw, 88px)", lineHeight: 0.9, color: "#0a0a0a", marginBottom: 28, letterSpacing: 1 }}>
        YOUR LEAN<br />
        <span style={{ WebkitTextStroke: "2px #0a0a0a", color: "transparent" }}>TRIFECTA</span>
      </h1>
      <div style={{ width: 48, height: 3, background: "#0a0a0a", marginBottom: 28 }} />
      <p style={{ fontSize: 15, lineHeight: 1.8, color: "#444", marginBottom: 56, maxWidth: 560 }}>
        Three tools designed for one outcome: stable, predictable retainer income.
        Start with the audit. Follow the blueprint. Build the system.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {MAGNETS.map((m, i) => (
          <button
            key={m.id}
            onClick={() => onSelect(m.id)}
            style={{
              display: "grid",
              gridTemplateColumns: "64px 1fr auto",
              alignItems: "center",
              gap: 24,
              padding: "28px 32px",
              border: "1.5px solid #0a0a0a",
              background: i === 0 ? "#0a0a0a" : "#fff",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { if (i !== 0) { e.currentTarget.style.background = "#f5f5f5"; } }}
            onMouseLeave={e => { if (i !== 0) { e.currentTarget.style.background = "#fff"; } }}
          >
            <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, color: i === 0 ? "#fff" : "#0a0a0a", lineHeight: 1 }}>{m.number}</span>
            <div>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: i === 0 ? "#888" : "#aaa", display: "block", marginBottom: 6 }}>
                {m.type} · {m.time}
              </span>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 16, fontWeight: 700, color: i === 0 ? "#fff" : "#0a0a0a", display: "block", marginBottom: 6 }}>
                {m.title}
              </span>
              <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 13, lineHeight: 1.6, color: i === 0 ? "#aaa" : "#666" }}>
                {m.desc}
              </span>
            </div>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, color: i === 0 ? "#fff" : "#0a0a0a" }}>→</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNET 1 — RETAINER READINESS AUDIT
// ─────────────────────────────────────────────────────────────────────────────
function Magnet1({ onBack }) {
  const [stage, setStage]       = useState("intro");
  const [qIndex, setQIndex]     = useState(0);
  const [answers, setAnswers]   = useState({});
  const [selected, setSelected] = useState(null);
  const [email, setEmail]       = useState("");
  const [firstName, setFirstName] = useState("");
  const [result, setResult]     = useState(null);
  const [scores, setScores]     = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const progress = stage === "intro" ? 0 : stage === "quiz" ? Math.round((qIndex / QUESTIONS.length) * 100) : stage === "gate" ? 95 : 100;
  const currentQ = QUESTIONS[qIndex];

  const nextQuestion = () => {
    const updated = { ...answers, [currentQ.id]: selected };
    setAnswers(updated);
    setSelected(null);
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      const totals = { I: 0, C: 0, W: 0 };
      Object.values(updated).forEach(opt => { totals.I += opt.scores.I; totals.C += opt.scores.C; totals.W += opt.scores.W; });
      setScores(totals);
      const dominant = Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
      setResult(dominant);
      setStage("gate");
    }
  };

  const submitEmail = async () => {
    if (!email || !firstName) return;
    setSubmitting(true);
    try {
      await fetch("https://api.convertkit.com/v3/forms/9140190/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: "eC5dt0WcDmbUQmw8RVYytA",
          first_name: firstName,
          email,
          tags: [result === "I" ? "Invisible Worker" : result === "C" ? "Chaos Signal" : "Wrong Client Trap"],
        }),
      });
    } catch (err) { console.error(err); }
    setSubmitting(false);
    setStage("result");
  };

  const maxScore = scores ? Math.max(...Object.values(scores)) || 1 : 1;
  const killerNames = { I: "Invisible Worker", C: "Chaos Signal", W: "Wrong Client" };

  const S = {
    wrap: { maxWidth: 680, margin: "0 auto", padding: "56px 40px 80px" },
    eyebrow: { fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 20 },
    bigTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 8vw, 76px)", lineHeight: 0.92, color: "#0a0a0a", letterSpacing: 1, marginBottom: 28 },
    divider: { width: 40, height: 3, background: "#0a0a0a", marginBottom: 28 },
    body: { fontSize: 14.5, lineHeight: 1.85, color: "#333", marginBottom: 36 },
    metaRow: { display: "flex", gap: 32, marginBottom: 48, paddingBottom: 40, borderBottom: "1px solid #e8e8e8" },
    metaItem: { display: "flex", flexDirection: "column", gap: 4 },
    metaNum: { fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#0a0a0a", lineHeight: 1 },
    metaLabel: { fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#aaa" },
    section: { fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", marginBottom: 10, display: "block" },
    counter: { fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: "#ccc", marginBottom: 28, display: "block" },
    qText: { fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 700, lineHeight: 1.35, color: "#0a0a0a", marginBottom: 36 },
    optionList: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 44 },
  };

  return (
    <div>
      <div style={{ height: 3, background: "#ebebeb" }}>
        <div style={{ height: "100%", background: "#0a0a0a", width: `${progress}%`, transition: "width 0.5s ease" }} />
      </div>
      <div style={S.wrap} className="fade-up">

        {/* INTRO */}
        {stage === "intro" && (
          <>
            <span style={S.eyebrow}>Diagnostic Audit</span>
            <h2 style={S.bigTitle}>RETAINER<br /><span style={{ WebkitTextStroke: "2px #0a0a0a", color: "transparent" }}>READINESS</span><br />AUDIT</h2>
            <div style={S.divider} />
            <p style={S.body}>You work hard. You deliver well. But stable retainer income feels out of reach — and you're not sure why. This audit identifies the exact reason clients aren't staying, specific to how you currently operate.</p>
            <div style={S.metaRow}>
              {[["10", "Questions"], ["5", "Minutes"], ["1", "Clear answer"]].map(([n, l]) => (
                <div key={l} style={S.metaItem}>
                  <span style={S.metaNum}>{n}</span>
                  <span style={S.metaLabel}>{l}</span>
                </div>
              ))}
            </div>
            <button className="mm-btn-primary" onClick={() => setStage("quiz")}>Begin the audit →</button>
          </>
        )}

        {/* QUIZ */}
        {stage === "quiz" && currentQ && (
          <div key={qIndex} className="fade-up">
            <span style={S.section}>{currentQ.section}</span>
            <span style={S.counter}>Question {qIndex + 1} of {QUESTIONS.length}</span>
            <h3 style={S.qText}>{currentQ.question}</h3>
            <div style={S.optionList}>
              {currentQ.options.map((opt, i) => {
                const sel = selected === opt;
                return (
                  <button key={i} onClick={() => setSelected(opt)} style={{
                    display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 22px",
                    border: `1.5px solid ${sel ? "#0a0a0a" : "#e0e0e0"}`,
                    background: sel ? "#0a0a0a" : "#fff", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.15s",
                  }}>
                    <div style={{
                      flexShrink: 0, width: 24, height: 24,
                      border: `1.5px solid ${sel ? "#fff" : "#ccc"}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'DM Mono', monospace", fontSize: 10,
                      color: sel ? "#0a0a0a" : "#ccc", background: sel ? "#fff" : "transparent",
                      marginTop: 1,
                    }}>{sel ? "✓" : MARKERS[i]}</div>
                    <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 14, lineHeight: 1.6, color: sel ? "#fff" : "#333" }}>{opt.text}</span>
                  </button>
                );
              })}
            </div>
            <button
              className="mm-btn-primary"
              onClick={nextQuestion}
              disabled={!selected}
              style={{ opacity: selected ? 1 : 0, transition: "opacity 0.2s", pointerEvents: selected ? "all" : "none" }}
            >
              {qIndex < QUESTIONS.length - 1 ? "Next question →" : "See my results →"}
            </button>
          </div>
        )}

        {/* GATE */}
        {stage === "gate" && (
          <div className="fade-up">
            <span style={S.eyebrow}>Audit Complete · Your Result Is Ready</span>
            <h2 style={{ ...S.bigTitle, marginBottom: 24 }}>YOUR<br />DIAGNOSIS<br />IS READY.</h2>
            <p style={{ ...S.body, maxWidth: 480 }}>Enter your name and email to receive your full personalized diagnosis plus the one specific fix for your result.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
              <input className="mm-input" type="text" placeholder="Your first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
              <input className="mm-input" type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
              <button className="mm-btn-primary" onClick={submitEmail} disabled={!email || !firstName || submitting}>
                {submitting ? "One moment..." : "Reveal my diagnosis →"}
              </button>
            </div>
            <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 1, color: "#bbb", marginTop: 16 }}>No spam. Just your result and your next step.</p>
          </div>
        )}

        {/* RESULT */}
        {stage === "result" && result && (
          <div className="fade-up">
            <div style={{ borderBottom: "2px solid #0a0a0a", paddingBottom: 32, marginBottom: 40 }}>
              <span style={S.eyebrow}>{firstName ? `${firstName}'s` : "Your"} Retainer Readiness Diagnosis</span>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(38px, 7vw, 68px)", lineHeight: 0.92, color: "#0a0a0a", letterSpacing: 1, marginBottom: 20 }}>
                {RESULTS[result].code}
              </div>
              <p style={{ fontSize: 15, fontStyle: "italic", lineHeight: 1.65, color: "#333", paddingLeft: 20, borderLeft: "3px solid #0a0a0a", maxWidth: 520 }}>
                {RESULTS[result].tagline}
              </p>
            </div>

            {/* Score bars */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, background: "#0a0a0a", border: "1.5px solid #0a0a0a", marginBottom: 44 }}>
              {Object.entries(scores).map(([key, val]) => {
                const dom = result === key;
                return (
                  <div key={key} style={{ background: dom ? "#0a0a0a" : "#fff", padding: "18px 16px" }}>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "#888", display: "block", marginBottom: 6 }}>
                      {dom ? "Primary block" : "Also present"}
                    </span>
                    <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: dom ? "#fff" : "#0a0a0a", display: "block", lineHeight: 1, marginBottom: 8 }}>{val}</span>
                    <div style={{ height: 3, background: dom ? "#444" : "#ebebeb", marginBottom: 8 }}>
                      <div style={{ height: "100%", background: dom ? "#fff" : "#0a0a0a", width: `${(val / maxScore) * 100}%` }} />
                    </div>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: dom ? "#fff" : "#0a0a0a", fontWeight: 500 }}>
                      {killerNames[key]}
                    </span>
                  </div>
                );
              })}
            </div>

            {[["What This Means For You", RESULTS[result].diagnosis], ["What It's Costing You", RESULTS[result].costs], ["Your One Shift", RESULTS[result].fix]].map(([label, text]) => (
              <div key={label} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid #ebebeb" }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 14 }}>{label}</span>
                <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "#222" }}>{text}</p>
              </div>
            ))}

            <div style={{ background: "#0a0a0a", padding: 32, marginBottom: 32 }}>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#888", display: "block", marginBottom: 14 }}>Your Next Step</span>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "#e8e8e8" }}>{RESULTS[result].next}</p>
            </div>

            <button className="mm-btn-outline" onClick={onBack}>← Back to all resources</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNET 2 — THE RETAINER BLUEPRINT
// ─────────────────────────────────────────────────────────────────────────────
function Magnet2({ onBack }) {
  const [activeSection, setActiveSection] = useState(0);
  const [showPrompt, setShowPrompt]       = useState(null);

  const S = {
    wrap: { maxWidth: 720, margin: "0 auto", padding: "56px 40px 80px" },
    eyebrow: { fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 20 },
    bigTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(44px, 8vw, 76px)", lineHeight: 0.92, color: "#0a0a0a", letterSpacing: 1, marginBottom: 28 },
    divider: { width: 40, height: 3, background: "#0a0a0a", marginBottom: 28 },
    body: { fontSize: 14.5, lineHeight: 1.85, color: "#333", marginBottom: 28 },
    tabRow: { display: "flex", gap: 2, marginBottom: 48, flexWrap: "wrap" },
    promptBox: { background: "#f5f5f5", border: "1.5px solid #e0e0e0", padding: 24, marginTop: 20, marginBottom: 8 },
    promptText: { fontFamily: "'DM Mono', monospace", fontSize: 11, lineHeight: 1.9, color: "#333", whiteSpace: "pre-wrap" },
    highlight: { background: "#0a0a0a", padding: "16px 20px", marginTop: 24, display: "flex", gap: 12, alignItems: "flex-start" },
    highlightText: { fontFamily: "'Libre Baskerville', serif", fontSize: 13, fontStyle: "italic", lineHeight: 1.7, color: "#e8e8e8" },
  };

  const sec = BLUEPRINT_SECTIONS[activeSection];

  return (
    <div style={S.wrap} className="fade-up">
      <span style={S.eyebrow}>Guide</span>
      <h2 style={S.bigTitle}>THE RETAINER<br /><span style={{ WebkitTextStroke: "2px #0a0a0a", color: "transparent" }}>BLUEPRINT</span></h2>
      <div style={S.divider} />
      <p style={S.body}>Three specific shifts that transform how clients see you — from task-completer to operational partner worth keeping every month. Each shift includes a ready-to-use AI prompt you can implement this afternoon.</p>

      {/* Tabs */}
      <div style={S.tabRow}>
        {BLUEPRINT_SECTIONS.map((s, i) => (
          <button key={i} onClick={() => { setActiveSection(i); setShowPrompt(null); }} style={{
            fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase",
            padding: "10px 18px", border: "1.5px solid #0a0a0a", cursor: "pointer",
            background: activeSection === i ? "#0a0a0a" : "#fff",
            color: activeSection === i ? "#fff" : "#0a0a0a",
            transition: "all 0.15s",
          }}>{s.number}</button>
        ))}
      </div>

      {/* Section content */}
      <div key={activeSection} className="fade-up">
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 8 }}>{sec.number}</span>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(20px, 3.5vw, 28px)", fontWeight: 700, color: "#0a0a0a", marginBottom: 8 }}>{sec.title}</h3>
        <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 1.5, textTransform: "uppercase", color: "#888", marginBottom: 24 }}>{sec.subtitle}</p>
        <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "#333", marginBottom: 32, paddingBottom: 32, borderBottom: "1px solid #ebebeb" }}>{sec.body}</p>

        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 10 }}>The Action</span>
        <h4 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 17, fontWeight: 700, color: "#0a0a0a", marginBottom: 14 }}>{sec.action}</h4>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: "#333", marginBottom: 24 }}>{sec.action_desc}</p>

        <button
          onClick={() => setShowPrompt(showPrompt === activeSection ? null : activeSection)}
          className="mm-btn-outline"
          style={{ marginBottom: 4 }}
        >
          {showPrompt === activeSection ? "Hide AI prompt ↑" : "View AI prompt →"}
        </button>

        {showPrompt === activeSection && (
          <div style={S.promptBox} className="fade-up">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 2, textTransform: "uppercase", color: "#888", display: "block", marginBottom: 12 }}>Copy this prompt into ChatGPT or Claude</span>
            <p style={S.promptText}>{sec.ai_prompt}</p>
          </div>
        )}

        <div style={S.highlight}>
          <span style={{ fontSize: 16 }}>—</span>
          <p style={S.highlightText}>{sec.highlight}</p>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 44, flexWrap: "wrap" }}>
          {activeSection > 0 && (
            <button className="mm-btn-outline" onClick={() => { setActiveSection(activeSection - 1); setShowPrompt(null); }}>← Previous shift</button>
          )}
          {activeSection < BLUEPRINT_SECTIONS.length - 1 ? (
            <button className="mm-btn-primary" onClick={() => { setActiveSection(activeSection + 1); setShowPrompt(null); }}>Next shift →</button>
          ) : (
            <button className="mm-btn-outline" onClick={onBack}>← Back to all resources</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNET 3 — STABLE INCOME SYSTEM BUILDER
// ─────────────────────────────────────────────────────────────────────────────
function Magnet3({ onBack }) {
  const [checked, setChecked] = useState({});
  const [activeComp, setActiveComp] = useState(0);

  const toggle = (id) => setChecked(prev => ({ ...prev, [id]: !prev[id] }));

  const getProgress = (comp) => {
    const done = comp.steps.filter(s => checked[s.id]).length;
    return Math.round((done / comp.steps.length) * 100);
  };

  const totalSteps = SYSTEM_COMPONENTS.reduce((acc, c) => acc + c.steps.length, 0);
  const totalDone  = SYSTEM_COMPONENTS.reduce((acc, c) => acc + c.steps.filter(s => checked[s.id]).length, 0);
  const overallPct = Math.round((totalDone / totalSteps) * 100);

  const comp = SYSTEM_COMPONENTS[activeComp];

  const S = {
    wrap: { maxWidth: 720, margin: "0 auto", padding: "56px 40px 80px" },
    eyebrow: { fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 20 },
    bigTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(40px, 7vw, 70px)", lineHeight: 0.92, color: "#0a0a0a", letterSpacing: 1, marginBottom: 28 },
    divider: { width: 40, height: 3, background: "#0a0a0a", marginBottom: 28 },
  };

  return (
    <div style={S.wrap} className="fade-up">
      <span style={S.eyebrow}>Interactive Builder</span>
      <h2 style={S.bigTitle}>STABLE INCOME<br /><span style={{ WebkitTextStroke: "2px #0a0a0a", color: "transparent" }}>SYSTEM BUILDER</span></h2>
      <div style={S.divider} />
      <p style={{ fontSize: 14.5, lineHeight: 1.85, color: "#333", marginBottom: 20 }}>
        Build your complete retainer operating system in one sitting. Work through all four components — check each step as you complete it. Your system builds as you go.
      </p>

      {/* Overall progress */}
      <div style={{ background: "#f5f5f5", padding: "20px 24px", marginBottom: 44, display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: "#888" }}>Overall Progress</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 2, color: "#0a0a0a" }}>{totalDone}/{totalSteps} steps</span>
          </div>
          <div style={{ height: 4, background: "#e0e0e0" }}>
            <div style={{ height: "100%", background: "#0a0a0a", width: `${overallPct}%`, transition: "width 0.4s ease" }} />
          </div>
        </div>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, color: "#0a0a0a", lineHeight: 1 }}>{overallPct}%</span>
      </div>

      {/* Component tabs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, marginBottom: 44 }}>
        {SYSTEM_COMPONENTS.map((c, i) => {
          const pct = getProgress(c);
          const active = activeComp === i;
          return (
            <button key={i} onClick={() => setActiveComp(i)} style={{
              padding: "16px 12px", border: `1.5px solid #0a0a0a`,
              background: active ? "#0a0a0a" : "#fff", cursor: "pointer", textAlign: "left", transition: "all 0.15s",
            }}>
              <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: active ? "#fff" : "#0a0a0a", display: "block", lineHeight: 1, marginBottom: 6 }}>{c.number}</span>
              <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 8, letterSpacing: 1.5, textTransform: "uppercase", color: active ? "#888" : "#aaa", display: "block", marginBottom: 8 }}>
                {pct}% done
              </span>
              <div style={{ height: 2, background: active ? "#444" : "#ebebeb" }}>
                <div style={{ height: "100%", background: active ? "#fff" : "#0a0a0a", width: `${pct}%`, transition: "width 0.3s" }} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Active component */}
      <div key={activeComp} className="fade-up">
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 8 }}>Component {comp.number}</span>
        <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 700, color: "#0a0a0a", marginBottom: 16 }}>{comp.title}</h3>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: "#555", marginBottom: 36, paddingBottom: 36, borderBottom: "1px solid #ebebeb" }}>{comp.desc}</p>

        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#aaa", display: "block", marginBottom: 20 }}>Build Steps</span>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 40 }}>
          {comp.steps.map((step, i) => {
            const done = !!checked[step.id];
            return (
              <button key={step.id} onClick={() => toggle(step.id)} style={{
                display: "flex", alignItems: "flex-start", gap: 16, padding: "18px 20px",
                border: `1.5px solid ${done ? "#0a0a0a" : "#e0e0e0"}`,
                background: done ? "#0a0a0a" : "#fff", cursor: "pointer", textAlign: "left", width: "100%", transition: "all 0.2s",
              }}>
                <div style={{
                  flexShrink: 0, width: 22, height: 22,
                  border: `1.5px solid ${done ? "#fff" : "#ccc"}`,
                  background: done ? "#fff" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'DM Mono', monospace", fontSize: 10,
                  color: done ? "#0a0a0a" : "#ccc", marginTop: 2,
                }}>{done ? "✓" : i + 1}</div>
                <span style={{
                  fontFamily: "'Libre Baskerville', serif", fontSize: 13.5, lineHeight: 1.75,
                  color: done ? "#aaa" : "#333",
                  textDecoration: done ? "line-through" : "none",
                }}>{step.text}</span>
              </button>
            );
          })}
        </div>

        {/* Output box — appears when component is 100% */}
        {getProgress(comp) === 100 && (
          <div style={{ background: "#0a0a0a", padding: "24px 28px", marginBottom: 32 }} className="fade-up">
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#888", display: "block", marginBottom: 12 }}>Component Complete ✓</span>
            <p style={{ fontSize: 13.5, lineHeight: 1.8, color: "#e8e8e8" }}>{comp.output}</p>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {activeComp > 0 && (
            <button className="mm-btn-outline" onClick={() => setActiveComp(activeComp - 1)}>← Previous</button>
          )}
          {activeComp < SYSTEM_COMPONENTS.length - 1 ? (
            <button className="mm-btn-primary" onClick={() => setActiveComp(activeComp + 1)}>Next component →</button>
          ) : (
            overallPct === 100 ? (
              <div style={{ background: "#0a0a0a", padding: "20px 28px", width: "100%" }} className="fade-up">
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: "#888", display: "block", marginBottom: 10 }}>System Complete</span>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: "#e8e8e8", marginBottom: 20 }}>Your Retainer Operating System is built. You now have the four infrastructure components that separate stable VA income from feast-or-famine. Systems Over Hustle™.</p>
                <button className="mm-btn-primary" onClick={onBack} style={{ background: "#fff", color: "#0a0a0a" }}>← Back to all resources</button>
              </div>
            ) : (
              <button className="mm-btn-outline" onClick={onBack}>← Back to all resources</button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("hub");

  const VIEWS = { hub: "hub", m1: "m1", m2: "m2", m3: "m3" };

  const headerTitle = {
    hub: null,
    m1: "Retainer Readiness Audit",
    m2: "The Retainer Blueprint",
    m3: "Stable Income System Builder",
  }[view];

  return (
    <div className="mm-app">
      <style>{GLOBAL_CSS}</style>

      {/* HEADER */}
      <header className="mm-header">
        <div className="mm-header-left">
          {view !== "hub" && (
            <button className="mm-back-btn" onClick={() => setView("hub")}>← All resources</button>
          )}
          <a href="https://systems.marginmomentum.co" className="mm-brand" style={{textDecoration:"none"}}>Margin &amp; Momentum™</a>
        </div>
        <div className="mm-tagline">Systems Over Hustle™</div>
      </header>

      {/* MAIN */}
      <main className="mm-main">
        {view === "hub" && <Hub onSelect={id => setView(id)} />}
        {view === "m1"  && <Magnet1 onBack={() => setView("hub")} />}
        {view === "m2"  && <Magnet2 onBack={() => setView("hub")} />}
        {view === "m3"  && <Magnet3 onBack={() => setView("hub")} />}
      </main>

      {/* FOOTER */}
      <footer className="mm-footer">
        <span className="mm-footer-l">Margin &amp; Momentum™</span>
        <span className="mm-footer-r">Systems Over Hustle™</span>
      </footer>
    </div>
  );
}
