import { useState } from "react";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  :root {
    --deep: #0F0D0B; --ink: #1A1714; --fog: #EDE9E3; --ash: #D9D4CE;
    --steel: #6B7280; --text-on-dark: #E8E4DF; --text-muted: #A09C96;
    --rule: rgba(237,233,227,0.12);
  }
  body { background: var(--deep); font-family: 'Libre Baskerville', Georgia, serif; color: var(--text-on-dark); -webkit-font-smoothing: antialiased; }
  body::before { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; z-index: 0; opacity: 0.6; }
  .app { min-height: 100vh; display: flex; flex-direction: column; }

  /* NAV */
  .st-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; padding: 20px 48px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--rule); background: rgba(15,13,11,0.88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); }
  .st-nav-left { display: flex; align-items: center; gap: 20px; }
  .st-wordmark { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.08em; color: var(--fog); text-decoration: none; }
  .st-wordmark span { color: var(--steel); font-size: 13px; font-family: 'DM Mono', monospace; letter-spacing: 0.15em; margin-left: 10px; vertical-align: middle; }
  .st-back-btn { background: none; border: none; font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--steel); cursor: pointer; display: flex; align-items: center; gap: 8px; padding: 0; transition: color 0.2s; }
  .st-back-btn:hover { color: var(--fog); }

  /* PROGRESS */
  .st-progress { height: 2px; background: var(--rule); position: relative; z-index: 1; }
  .st-progress-fill { height: 100%; background: var(--fog); transition: width 0.5s ease; }

  /* MAIN + FOOTER */
  .st-main { flex: 1; position: relative; z-index: 1; padding-top: 63px; }
  .st-footer { border-top: 1px solid var(--rule); padding: 20px 48px; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1; background: var(--ink); }
  .st-footer-l { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 0.08em; color: var(--fog); }
  .st-footer-r { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); }

  /* HERO */
  .st-hero { position: relative; overflow: hidden; padding: 80px 48px 64px; border-bottom: 1px solid var(--rule); }
  .st-hero-grid { position: absolute; inset: 0; background-image: linear-gradient(var(--rule) 1px, transparent 1px), linear-gradient(90deg, var(--rule) 1px, transparent 1px); background-size: 80px 80px; opacity: 0.5; }
  .st-hero-ghost { position: absolute; top: 50%; right: -1vw; transform: translateY(-50%); font-family: 'Bebas Neue', sans-serif; font-size: clamp(120px, 18vw, 240px); color: rgba(237,233,227,0.03); line-height: 1; pointer-events: none; user-select: none; }
  .st-hero-content { position: relative; z-index: 1; max-width: 800px; }

  /* TAG */
  .st-tag { font-family: 'DM Mono', monospace; font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: var(--steel); margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
  .st-tag::before { content: ''; display: inline-block; width: 24px; height: 1px; background: var(--steel); }

  /* TYPOGRAPHY */
  .st-display { font-family: 'Bebas Neue', sans-serif; line-height: 0.92; letter-spacing: 0.01em; color: var(--fog); }
  .st-body { font-size: 17px; line-height: 1.85; color: var(--text-muted); }
  .st-italic { font-style: italic; border-left: 2px solid var(--steel); padding-left: 24px; }
  .st-rule { height: 1px; background: var(--rule); margin: 40px 0; }
  .st-content { max-width: 760px; margin: 0 auto; padding: 64px 48px 96px; }

  /* STAT ROW */
  .st-stat-row { display: flex; gap: 48px; padding: 32px 0; border-bottom: 1px solid var(--rule); margin-bottom: 44px; }
  .st-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: var(--fog); line-height: 1; display: block; }
  .st-stat-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); display: block; margin-top: 4px; }

  /* TOOL CARDS */
  .st-card-grid { display: flex; flex-direction: column; gap: 2px; }
  .st-tool-card { display: grid; grid-template-columns: 80px 1fr 32px; align-items: center; gap: 32px; padding: 32px 40px; border: 1px solid var(--rule); background: rgba(237,233,227,0.02); cursor: pointer; text-align: left; width: 100%; transition: all 0.2s; }
  .st-tool-card:hover { background: rgba(237,233,227,0.05); border-color: rgba(237,233,227,0.22); }
  .st-tool-card.featured { background: var(--fog); border-color: var(--fog); }
  .st-tool-card.featured:hover { background: var(--ash); }
  .st-tool-num { font-family: 'Bebas Neue', sans-serif; font-size: 56px; line-height: 1; letter-spacing: 0.02em; color: var(--fog); }
  .st-tool-card.featured .st-tool-num { color: var(--deep); }
  .st-tool-type { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); display: block; margin-bottom: 6px; }
  .st-tool-card.featured .st-tool-type { color: #888; }
  .st-tool-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 0.03em; color: var(--fog); display: block; margin-bottom: 8px; }
  .st-tool-card.featured .st-tool-title { color: var(--deep); }
  .st-tool-desc { font-family: 'Libre Baskerville', serif; font-size: 14px; line-height: 1.65; color: var(--text-muted); }
  .st-tool-card.featured .st-tool-desc { color: #555; }
  .st-tool-arrow { font-size: 20px; color: var(--fog); }
  .st-tool-card.featured .st-tool-arrow { color: var(--deep); }

  /* QUIZ OPTIONS */
  .st-options { display: flex; flex-direction: column; gap: 8px; margin-bottom: 44px; }
  .st-option { display: flex; align-items: flex-start; gap: 16px; padding: 20px 24px; border: 1px solid var(--rule); background: rgba(237,233,227,0.02); cursor: pointer; text-align: left; width: 100%; transition: all 0.15s; }
  .st-option:hover { border-color: rgba(237,233,227,0.25); background: rgba(237,233,227,0.04); }
  .st-option.selected { border-color: var(--fog); background: var(--fog); }
  .st-option-marker { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; border: 1px solid rgba(237,233,227,0.25); display: flex; align-items: center; justify-content: center; font-family: 'DM Mono', monospace; font-size: 10px; color: var(--steel); margin-top: 1px; transition: all 0.15s; }
  .st-option.selected .st-option-marker { border-color: var(--deep); background: var(--deep); color: var(--fog); }
  .st-option-text { font-family: 'Libre Baskerville', serif; font-size: 14px; line-height: 1.7; color: var(--text-muted); }
  .st-option.selected .st-option-text { color: var(--ink); }

  /* SCORE GRID */
  .st-score-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-bottom: 48px; }
  .st-score-cell { padding: 20px 18px; background: rgba(237,233,227,0.03); }
  .st-score-cell.dominant { background: var(--fog); }
  .st-score-label { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); display: block; margin-bottom: 8px; }
  .st-score-cell.dominant .st-score-label { color: #888; }
  .st-score-num { font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: var(--fog); line-height: 1; display: block; margin-bottom: 10px; }
  .st-score-cell.dominant .st-score-num { color: var(--ink); }
  .st-score-bar-track { height: 2px; background: var(--rule); margin-bottom: 10px; }
  .st-score-cell.dominant .st-score-bar-track { background: rgba(26,23,20,0.15); }
  .st-score-bar-fill { height: 100%; background: var(--fog); }
  .st-score-cell.dominant .st-score-bar-fill { background: var(--ink); }
  .st-score-name { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); }
  .st-score-cell.dominant .st-score-name { color: var(--ink); }

  /* RESULT BLOCKS */
  .st-result-block { margin-bottom: 36px; padding-bottom: 36px; border-bottom: 1px solid var(--rule); }
  .st-callout { background: var(--fog); padding: 32px 36px; margin-bottom: 32px; }
  .st-callout .st-tag { color: #888; }
  .st-callout .st-tag::before { background: #888; }
  .st-callout p { font-size: 14px; line-height: 1.85; color: var(--ink); }

  /* BLUEPRINT */
  .st-tabs { display: flex; gap: 2px; margin-bottom: 48px; flex-wrap: wrap; }
  .st-tab { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; padding: 12px 20px; border: 1px solid var(--rule); background: transparent; color: var(--text-muted); cursor: pointer; transition: all 0.15s; }
  .st-tab:hover { border-color: rgba(237,233,227,0.25); color: var(--fog); }
  .st-tab.active { background: var(--fog); color: var(--ink); border-color: var(--fog); }
  .st-prompt-box { background: rgba(237,233,227,0.03); border: 1px solid var(--rule); padding: 28px 32px; margin-top: 20px; margin-bottom: 8px; }
  .st-prompt-label { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); display: block; margin-bottom: 16px; }
  .st-prompt-text { font-family: 'DM Mono', monospace; font-size: 11px; line-height: 1.9; color: var(--text-muted); white-space: pre-wrap; }
  .st-highlight { background: var(--fog); padding: 20px 24px; margin-top: 24px; }
  .st-highlight p { font-family: 'Libre Baskerville', serif; font-size: 13px; font-style: italic; line-height: 1.75; color: var(--ink); }

  /* BUILDER */
  .st-progress-bar { background: rgba(237,233,227,0.04); border: 1px solid var(--rule); padding: 20px 28px; margin-bottom: 40px; display: flex; align-items: center; gap: 24px; }
  .st-progress-inner { flex: 1; }
  .st-progress-meta { display: flex; justify-content: space-between; margin-bottom: 10px; }
  .st-progress-meta span { font-family: 'DM Mono', monospace; font-size: 9px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--steel); }
  .st-progress-meta span:last-child { color: var(--fog); }
  .st-progress-track { height: 2px; background: var(--rule); }
  .st-progress-filled { height: 100%; background: var(--fog); transition: width 0.4s ease; }
  .st-progress-pct { font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: var(--fog); line-height: 1; }
  .st-comp-tabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; margin-bottom: 44px; }
  .st-comp-tab { padding: 18px 14px; border: 1px solid var(--rule); background: rgba(237,233,227,0.02); cursor: pointer; text-align: left; transition: all 0.15s; }
  .st-comp-tab:hover { background: rgba(237,233,227,0.05); }
  .st-comp-tab.active { background: var(--fog); border-color: var(--fog); }
  .st-comp-num { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--fog); line-height: 1; display: block; margin-bottom: 6px; }
  .st-comp-tab.active .st-comp-num { color: var(--ink); }
  .st-comp-done { font-family: 'DM Mono', monospace; font-size: 8px; letter-spacing: 0.15em; text-transform: uppercase; color: var(--steel); display: block; margin-bottom: 8px; }
  .st-comp-track { height: 2px; background: var(--rule); }
  .st-comp-tab.active .st-comp-track { background: rgba(26,23,20,0.15); }
  .st-comp-fill { height: 100%; background: var(--fog); transition: width 0.3s; }
  .st-comp-tab.active .st-comp-fill { background: var(--ink); }
  .st-steps { display: flex; flex-direction: column; gap: 8px; margin-bottom: 40px; }
  .st-step { display: flex; align-items: flex-start; gap: 16px; padding: 20px 24px; border: 1px solid var(--rule); background: rgba(237,233,227,0.02); cursor: pointer; text-align: left; width: 100%; transition: all 0.2s; }
  .st-step:hover { background: rgba(237,233,227,0.05); }
  .st-step.done { border-color: var(--fog); background: var(--fog); }
  .st-step-marker { flex-shrink: 0; width: 24px; height: 24px; border: 1px solid rgba(237,233,227,0.2); display: flex; align-items: center; justify-content: center; font-family: 'DM Mono', monospace; font-size: 10px; color: var(--steel); margin-top: 2px; transition: all 0.2s; }
  .st-step.done .st-step-marker { border-color: var(--ink); background: var(--ink); color: var(--fog); }
  .st-step-text { font-family: 'Libre Baskerville', serif; font-size: 14px; line-height: 1.75; color: var(--text-muted); }
  .st-step.done .st-step-text { color: #666; text-decoration: line-through; }
  .st-complete { background: var(--fog); padding: 32px 36px; margin-bottom: 32px; }
  .st-complete .st-tag { color: #888; }
  .st-complete .st-tag::before { background: #888; }
  .st-complete p { font-size: 14px; line-height: 1.85; color: var(--ink); margin-bottom: 12px; }
  .st-complete p.muted { color: #666; margin-bottom: 20px; }

  /* INPUTS */
  .st-input { border: 1px solid rgba(237,233,227,0.15); padding: 14px 18px; width: 100%; font-family: 'Libre Baskerville', serif; font-size: 14px; color: var(--fog); background: rgba(237,233,227,0.04); outline: none; transition: border-color 0.2s; margin-bottom: 12px; }
  .st-input::placeholder { color: var(--steel); }
  .st-input:focus { border-color: rgba(237,233,227,0.35); }

  /* BUTTONS */
  .st-btn { display: inline-flex; align-items: center; gap: 10px; font-family: 'DM Mono', monospace; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; padding: 16px 32px; border: none; cursor: pointer; transition: all 0.2s; }
  .st-btn-primary { background: var(--fog); color: var(--deep); }
  .st-btn-primary:hover { background: var(--ash); }
  .st-btn-primary:disabled { opacity: 0.3; cursor: default; }
  .st-btn-ghost { background: transparent; color: var(--fog); border: 1px solid rgba(237,233,227,0.2); }
  .st-btn-ghost:hover { background: var(--fog); color: var(--deep); border-color: var(--fog); }
  .st-btn-row { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 40px; }

  /* ANIMATIONS */
  @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.4s ease forwards; }

  /* RESPONSIVE */
  @media (max-width: 640px) {
    .st-nav { padding: 16px 20px; }
    .st-wordmark span { display: none; }
    .st-hero { padding: 60px 24px 48px; }
    .st-content { padding: 48px 24px 72px; }
    .st-tool-card { grid-template-columns: 56px 1fr 24px; gap: 16px; padding: 24px 20px; }
    .st-comp-tabs { grid-template-columns: repeat(2, 1fr); }
    .st-stat-row { gap: 28px; }
    .st-footer { padding: 16px 20px; }
  }
`;

// ─── DATA ─────────────────────────────────────────────────────────────────────
const QUESTIONS = [
  { id: 1, section: "Your Results", question: "When you finish a project or month of work, what do you send your client?", options: [{ text: "A summary showing what I achieved and the business impact", scores: { I: 0, C: 0, W: 0 } }, { text: "A list of tasks I completed", scores: { I: 1, C: 0, W: 0 } }, { text: "The final deliverable — nothing else", scores: { I: 2, C: 0, W: 0 } }, { text: "Whatever they ask for — I have no standard", scores: { I: 1, C: 1, W: 0 } }] },
  { id: 2, section: "Your Results", question: "If your client had to explain your value to someone else right now, could they do it clearly?", options: [{ text: "Yes — I make sure they can articulate what I do for their business", scores: { I: 0, C: 0, W: 0 } }, { text: "Probably — they know I'm helpful but not in specific terms", scores: { I: 1, C: 0, W: 0 } }, { text: "Unlikely — I just get things done quietly", scores: { I: 2, C: 0, W: 0 } }, { text: "I've never thought about this", scores: { I: 2, C: 1, W: 0 } }] },
  { id: 3, section: "Your Results", question: "Do you track any numbers that connect your work to your client's business outcomes?", options: [{ text: "Yes — I have metrics I report on regularly", scores: { I: 0, C: 0, W: 0 } }, { text: "I track tasks and hours but not business impact", scores: { I: 1, C: 0, W: 0 } }, { text: "No — I focus on completing work, not measuring it", scores: { I: 2, C: 0, W: 0 } }, { text: "I wouldn't know what to measure", scores: { I: 2, C: 1, W: 0 } }] },
  { id: 4, section: "Your Process", question: "When a new client starts with you, what happens in the first week?", options: [{ text: "I follow a documented onboarding process — same every time", scores: { I: 0, C: 0, W: 0 } }, { text: "I send a questionnaire but it varies each time", scores: { I: 0, C: 1, W: 0 } }, { text: "I ask what they need and figure it out from there", scores: { I: 0, C: 2, W: 0 } }, { text: "They tell me what to do and I start immediately", scores: { I: 0, C: 2, W: 1 } }] },
  { id: 5, section: "Your Process", question: "Do your clients know exactly what to expect from you each week?", options: [{ text: "Yes — I have a set communication rhythm they rely on", scores: { I: 0, C: 0, W: 0 } }, { text: "Sort of — it depends on the client and the week", scores: { I: 0, C: 1, W: 0 } }, { text: "They hear from me when I have something to share", scores: { I: 1, C: 2, W: 0 } }, { text: "No standard — I communicate when needed", scores: { I: 0, C: 2, W: 0 } }] },
  { id: 6, section: "Your Process", question: "When something goes wrong — a missed deadline, a mistake — what do you do?", options: [{ text: "Flag it early, explain what happened, propose a fix", scores: { I: 0, C: 0, W: 0 } }, { text: "Apologise immediately and fix it as fast as possible", scores: { I: 0, C: 1, W: 0 } }, { text: "Fix it quietly and hope they don't notice", scores: { I: 0, C: 2, W: 0 } }, { text: "Panic — I don't have a protocol for this", scores: { I: 0, C: 2, W: 0 } }] },
  { id: 7, section: "Your Clients", question: "How do most of your clients currently find and hire you?", options: [{ text: "Referrals from past clients or my network", scores: { I: 0, C: 0, W: 0 } }, { text: "A mix — some referrals, some job boards", scores: { I: 0, C: 0, W: 1 } }, { text: "Job boards and platforms like Upwork or OnlineJobs", scores: { I: 0, C: 0, W: 2 } }, { text: "I apply to postings and take what I can get", scores: { I: 0, C: 0, W: 2 } }] },
  { id: 8, section: "Your Clients", question: "When you pitch your services, what do you typically offer?", options: [{ text: "Monthly retainer packages with clear outcomes", scores: { I: 0, C: 0, W: 0 } }, { text: "Service packages — fixed scope, fixed price", scores: { I: 0, C: 0, W: 1 } }, { text: "Hourly rates", scores: { I: 0, C: 0, W: 2 } }, { text: "Whatever the client asks for", scores: { I: 0, C: 1, W: 2 } }] },
  { id: 9, section: "Your Clients", question: "What type of work do your current clients hire you for?", options: [{ text: "Ongoing operational support — they need me every month", scores: { I: 0, C: 0, W: 0 } }, { text: "A mix — some ongoing, some one-off projects", scores: { I: 0, C: 0, W: 1 } }, { text: "Mostly specific projects with a clear end date", scores: { I: 0, C: 0, W: 2 } }, { text: "Whatever work is available", scores: { I: 0, C: 0, W: 2 } }] },
  { id: 10, section: "Your Clients", question: "When you deliver great work, what usually happens next?", options: [{ text: "The client offers more work or asks about ongoing support", scores: { I: 0, C: 0, W: 0 } }, { text: "They say thank you — and sometimes come back later", scores: { I: 1, C: 0, W: 1 } }, { text: "They say thank you and disappear", scores: { I: 1, C: 0, W: 2 } }, { text: "I'm never sure what to expect after a project ends", scores: { I: 1, C: 1, W: 1 } }] },
];

const RESULTS = {
  I: { code: "THE INVISIBLE WORKER", tagline: "You deliver excellent work. Clients like you. But they can't see you clearly enough to keep you.", diagnosis: "Your value is real — but it's invisible. When a client decides whether to commit to a monthly retainer, they need to answer one question: 'Is this VA worth paying for every single month?' Right now, your work doesn't give them a clear answer. You complete tasks. You deliver files. But you are not showing them the business impact — which means when budget conversations happen, you're the easiest line item to cut.", costs: "Clients who genuinely liked working with you disappear after the project ends — not because you weren't good, but because they couldn't clearly articulate what keeping you would do for their business. You become a nice-to-have instead of a need-to-have.", fix: "Start reporting outcomes, not outputs. Every week or month, send your client one page showing what moved because of your work. Not a task list — a results summary. 'Last month I managed your inbox, processed 47 vendor invoices, and caught a billing error that saved you ₱18,000.' That one habit makes you undeniable.", next: "The Retainer Blueprint includes a ready-to-use AI-powered Monthly Impact Report template — the exact document that makes your value visible and your retainer renewal automatic." },
  C: { code: "THE CHAOS SIGNAL", tagline: "Your work is good. But something in how you operate tells premium clients you're not ready for long-term commitment.", diagnosis: "Premium clients don't just evaluate the quality of your deliverables — they evaluate the experience of working with you. How organized your onboarding feels. How predictable your communication is. How you handle problems when they arise. Right now, something in your process is sending a signal that working with you long-term would require too much management from their side.", costs: "Clients enjoy your work but find themselves doing extra administrative work around you — chasing updates, re-explaining context, managing expectations you should be setting. Eventually they quietly decide not to continue, even if they never tell you why.", fix: "Build three visible systems — a repeatable onboarding process, a weekly communication rhythm, and a clear protocol for when things go wrong. These three things alone signal to a premium client that you operate at retainer level. You don't need to be perfect. You need to be predictable.", next: "The Retainer Blueprint includes plug-and-play templates for all three systems — built in an afternoon using AI tools you already have." },
  W: { code: "THE WRONG CLIENT TRAP", tagline: "Your work is strong. But the clients you're attracting were never going to stay — by design.", diagnosis: "There is a category of client who hires VAs for projects. They need something built, something done, something finished — and then they're gone. No amount of excellent work converts a project client into a retainer client, because they never intended to retain anyone. The problem is not your skills or your delivery. The problem is that where you're finding clients and how you're positioning yourself is attracting exactly this type of buyer — over and over again.", costs: "You work hard, deliver well, get genuine praise — and then face another empty calendar. The feast-or-famine cycle is not a reflection of your ability. It's a reflection of your pipeline. You are filling it with the wrong people, not because you can't attract the right ones, but because nothing in your current approach signals that you offer ongoing operational partnership.", fix: "Stop pricing and positioning for projects. Restructure your offer as a monthly partnership with a clear ongoing scope — and find the channels where retainer-seeking clients actually look. This means changing how you describe what you do, how you price it, and where you show up.", next: "The Retainer Blueprint includes the exact retainer package structure and positioning language that attracts ongoing clients — plus the word-for-word conversation that transitions a project client into a retainer relationship." },
};

const KILLER_NAMES = { I: "Invisible Worker", C: "Chaos Signal", W: "Wrong Client" };
const MARKERS = ["A", "B", "C", "D"];

const BLUEPRINT_SECTIONS = [
  { number: "SHIFT 01", title: "From Deliverable to Outcome", subtitle: "Make your impact undeniable", body: "Every piece of work you deliver contains a business result your client cannot easily see on their own. Your job is to surface it. When a client sees 'managed inbox' they think admin cost. When they see 'cleared 340 emails, flagged 3 urgent client issues, and prevented one missed payment deadline' — they think operational partner worth keeping.", action: "The Monthly Impact Report", action_desc: "A one-page document you produce every month in 20 minutes using the AI prompt below. It translates your task list into business language your client uses to justify your retainer to themselves — and to anyone else who asks.", ai_prompt: `Use this prompt in ChatGPT or Claude at the end of each month:\n\n"I am a VA. Here is my task list from this month: [paste your tasks]. My client's business is [describe their business]. Rewrite my task list as a one-page impact summary showing the business value of each item. Use specific numbers where possible. Format it as a professional report I can send to my client. Keep it under one page."`, highlight: "VAs who send monthly impact reports are 3× more likely to receive unsolicited retainer offers from existing clients." },
  { number: "SHIFT 02", title: "From Ad Hoc to System", subtitle: "Signal that you operate at retainer level", body: "Premium clients make retainer decisions based on feel as much as logic. The feel of working with you — how smooth your onboarding is, how reliable your communication is, how calmly you handle problems — tells them whether you are someone they want to depend on every month. Three systems create that feel instantly.", action: "The Three Visible Systems", action_desc: "These are not complicated. They take one afternoon to build using the AI prompts below. Once built, they run on autopilot and signal professional operations to every client you onboard from this point forward.", ai_prompt: `SYSTEM 1 — Onboarding:\n"I am a VA offering [your services]. Write me a 5-step client onboarding process that I can complete in the first week of any new engagement. Include: a welcome message, an information-gathering questionnaire, a scope confirmation document, a communication preferences form, and a 30-day expectation-setting email. Make it professional and warm."\n\nSYSTEM 2 — Weekly Communication:\n"Write me a weekly check-in message template I can send every Friday to retainer clients. It should cover: what I completed this week, what's planned for next week, any blockers or decisions I need from them, and one positive observation about their business. Keep it under 150 words."\n\nSYSTEM 3 — Problem Protocol:\n"Write me a 3-step protocol for when something goes wrong with a client deliverable. Include: how to flag it proactively, how to explain what happened without over-apologising, and how to propose a fix with a clear timeline. This should feel calm and professional, not panicked."`, highlight: "A client who experiences a smooth onboarding is 5× more likely to discuss ongoing work before the project ends." },
  { number: "SHIFT 03", title: "From Project to Partnership", subtitle: "The conversation that changes everything", body: "Most VAs wait for the client to bring up ongoing work. That moment almost never comes — not because the client doesn't want ongoing support, but because they assume you're available for projects only, based on how you've positioned yourself. The retainer conversation is yours to initiate. And the timing and framing of it determines everything.", action: "The Retainer Transition Script", action_desc: "Have this conversation at the end of a successful project — after the deliverable is approved, while the client's satisfaction is highest. The script below is word-for-word. Customize the bracketed sections using the AI prompt that follows.", ai_prompt: `THE SCRIPT:\n"[Client name], I'm glad this project landed well. I've been thinking — a lot of what I did this month [reference 2-3 specific things] is the kind of work that compounds over time when done consistently. I'd love to put together a monthly support proposal for you. It would cover [outline 3 ongoing areas] for a fixed monthly rate of [your price]. Would that be something worth exploring?"\n\nAI CUSTOMISATION PROMPT:\n"I am a VA. My client is [describe their business]. The project I just completed was [describe project]. Using the retainer transition script framework, customize the bracketed sections for this specific client. Suggest three ongoing support areas that would be most valuable for their business type. Also suggest a monthly rate range based on the scope."`, highlight: "The best time to propose a retainer is within 48 hours of a client approving your best work. This script has that window built in." },
];

const SYSTEM_COMPONENTS = [
  { id: "dashboard", number: "01", title: "Client Value Dashboard", desc: "A simple tracking system that makes your impact visible to yourself and your client every single month. Without this, your value is invisible — and invisible value doesn't get renewed.", steps: [{ id: "d1", text: "List your top 3 active or target clients by name" }, { id: "d2", text: "For each client, write one sentence: what business problem do I solve for them?" }, { id: "d3", text: "Choose 2–3 metrics you will track monthly for each client (e.g. emails cleared, hours saved, tasks completed, revenue protected)" }, { id: "d4", text: "Create a simple tracking doc (Google Sheet or Notion table) with columns: Client / Metric / This Month / Last Month / Change" }, { id: "d5", text: "Set a recurring 15-minute calendar block every last Friday of the month to fill it in" }], output: "Your Value Dashboard — a living document that feeds your monthly impact reports and makes every retainer renewal conversation data-backed." },
  { id: "onboarding", number: "02", title: "Client Onboarding Sequence", desc: "The 5-step process that sets retainer expectations from day one — before a client has any reason to leave. This is the single highest-impact system a VA can build.", steps: [{ id: "o1", text: "Write your Welcome Message: a warm, confident email sent within 1 hour of a client saying yes. Include: what happens next, your communication hours, and one thing you're excited to work on together." }, { id: "o2", text: "Build your Intake Questionnaire: 8–10 questions covering their business goals, communication preferences, tools they use, and definition of success. Use Typeform or Google Forms." }, { id: "o3", text: "Create your Scope Confirmation Doc: a 1-page summary of what you will deliver, by when, at what rate — signed off before work begins. No surprises." }, { id: "o4", text: "Set your Week 1 Check-In: a scheduled 20-minute call or voice note at Day 7 to confirm alignment and catch any mismatches early." }, { id: "o5", text: "Write your 30-Day Expectation Email: sent at Day 1, it outlines what the client can expect from you in the first month — your rhythm, your reporting, your availability." }], output: "Your Onboarding Sequence — a repeatable, professional 5-step system that makes every new client feel they hired someone operating at premium level." },
  { id: "retention", number: "03", title: "Monthly Retention Ritual", desc: "A repeatable end-of-month routine that proactively renews client commitment before the invoice lands. Done consistently, this eliminates the anxiety of wondering if clients will stay.", steps: [{ id: "r1", text: "Schedule your Monthly Wrap-Up: a recurring 30-minute block on the last working day of every month — protected, non-negotiable." }, { id: "r2", text: "Fill your Value Dashboard (Component 01) with this month's metrics." }, { id: "r3", text: "Write your Monthly Impact Report using your AI prompt from the Blueprint. Send it before the invoice." }, { id: "r4", text: "Add one forward-looking line to your report: 'Next month I plan to focus on [X] — does that align with your priorities?' This opens the conversation before any doubt forms." }, { id: "r5", text: "Review: did anything go unexpectedly well this month that signals an opportunity to expand your scope? Note it. Bring it up naturally in next month's check-in." }], output: "Your Monthly Retention Ritual — a 30-minute routine that keeps clients informed, appreciated, and re-committed before you ever ask them to renew." },
  { id: "rate", number: "04", title: "Rate Escalation Trigger System", desc: "A simple decision framework that tells you exactly when and how to raise your rate with an existing retainer client — without losing them.", steps: [{ id: "ra1", text: "Define your trigger conditions: you will initiate a rate conversation when ANY of these are true — (1) you've worked with this client for 6+ months, (2) your scope has expanded beyond the original agreement, (3) you've produced a result that saved them measurably more than your monthly rate." }, { id: "ra2", text: "Write your Rate Increase Message using this framework: (1) reference a specific result you produced, (2) note the expanded scope if applicable, (3) state the new rate and effective date, (4) express your commitment to the relationship. Keep it under 150 words." }, { id: "ra3", text: "Set a 6-month recurring calendar reminder titled 'Rate Review — [Client Name]' for every active retainer client starting today." }, { id: "ra4", text: "Decide your escalation increment: a standard 15–20% increase per review cycle is professional and rarely challenged when delivered with evidence of results." }, { id: "ra5", text: "Practice the number out loud before you send it. The moment you can say your rate without hesitation is the moment clients accept it without hesitation." }], output: "Your Rate Escalation System — a trigger-based decision framework that takes the emotion out of raising your rates and makes income growth systematic, not accidental." },
];

// ─────────────────────────────────────────────────────────────────────────────
function Hub({ onSelect }) {
  const tools = [
    { id: "m1", num: "01", type: "Diagnostic Quiz · 5 min", title: "Retainer Readiness Audit", desc: "Find out exactly why clients aren't staying — in 5 minutes. Get your personalized diagnosis and the one shift that fixes it." },
    { id: "m2", num: "02", type: "Guide · 20 min read", title: "The Retainer Blueprint", desc: "Three specific shifts that transform how clients see you — from task-completer to operational partner worth keeping every month." },
    { id: "m3", num: "03", type: "Interactive Builder · 45 min", title: "Stable Income System Builder", desc: "Build your complete retainer operating system in one sitting — the four components that keep clients paying month after month." },
  ];
  return (
    <>
      <div className="st-hero fade-up">
        <div className="st-hero-grid" />
        <div className="st-hero-ghost">LT</div>
        <div className="st-hero-content">
          <div className="st-tag">Stage 03 — Lean Trifecta · Ready for Stable Income</div>
          <h1 className="st-display" style={{ fontSize: "clamp(64px, 9vw, 120px)", marginBottom: 28 }}>
            YOUR LEAN<br /><span style={{ WebkitTextStroke: "1.5px #EDE9E3", color: "transparent" }}>TRIFECTA</span>
          </h1>
          <p className="st-body" style={{ maxWidth: 560 }}>Three tools designed for one outcome: stable, predictable retainer income. Start with the audit. Follow the blueprint. Build the system.</p>
        </div>
      </div>
      <div className="st-content">
        <div className="st-stat-row">
          {[["3", "Free tools"], ["10", "Questions"], ["0", "Cost"]].map(([n, l]) => (
            <div key={l}><span className="st-stat-num">{n}</span><span className="st-stat-label">{l}</span></div>
          ))}
        </div>
        <div className="st-card-grid">
          {tools.map((t, i) => (
            <button key={t.id} onClick={() => onSelect(t.id)} className={`st-tool-card${i === 0 ? " featured" : ""}`}>
              <span className="st-tool-num">{t.num}</span>
              <div><span className="st-tool-type">{t.type}</span><span className="st-tool-title">{t.title}</span><span className="st-tool-desc">{t.desc}</span></div>
              <span className="st-tool-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function Tool1({ onBack }) {
  const [stage, setStage]         = useState("intro");
  const [qIndex, setQIndex]       = useState(0);
  const [answers, setAnswers]     = useState({});
  const [selected, setSelected]   = useState(null);
  const [email, setEmail]         = useState("");
  const [firstName, setFirstName] = useState("");
  const [result, setResult]       = useState(null);
  const [scores, setScores]       = useState(null);
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
      setResult(Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0]);
      setStage("gate");
    }
  };

  const submitEmail = async () => {
    if (!email || !firstName) return;
    setSubmitting(true);
    try {
      await fetch("https://api.convertkit.com/v3/forms/9140190/subscribe", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_key: "eC5dt0WcDmbUQmw8RVYytA", first_name: firstName, email, tags: [result === "I" ? "Invisible Worker" : result === "C" ? "Chaos Signal" : "Wrong Client Trap"] }),
      });
    } catch (e) { console.error(e); }
    setSubmitting(false);
    setStage("result");
  };

  const maxScore = scores ? Math.max(...Object.values(scores)) || 1 : 1;

  return (
    <>
      <div className="st-progress"><div className="st-progress-fill" style={{ width: `${progress}%` }} /></div>
      {stage === "intro" && (
        <div className="fade-up">
          <div className="st-hero"><div className="st-hero-grid" /><div className="st-hero-ghost">RRA</div>
            <div className="st-hero-content">
              <div className="st-tag">Tool 01 · Diagnostic Quiz · 5 min</div>
              <h2 className="st-display" style={{ fontSize: "clamp(52px, 8vw, 100px)", marginBottom: 28 }}>RETAINER<br /><span style={{ WebkitTextStroke: "1.5px #EDE9E3", color: "transparent" }}>READINESS</span><br />AUDIT</h2>
              <p className="st-body st-italic" style={{ maxWidth: 520 }}>You work hard. You deliver well. But stable retainer income feels out of reach — and you're not sure why. This audit identifies the exact reason clients aren't staying, specific to how you currently operate.</p>
            </div>
          </div>
          <div className="st-content">
            <div className="st-stat-row">{[["10", "Questions"], ["5", "Minutes"], ["1", "Clear answer"]].map(([n, l]) => (<div key={l}><span className="st-stat-num">{n}</span><span className="st-stat-label">{l}</span></div>))}</div>
            <button className="st-btn st-btn-primary" onClick={() => setStage("quiz")}>Begin the audit →</button>
          </div>
        </div>
      )}
      {stage === "quiz" && currentQ && (
        <div className="st-content fade-up" key={qIndex}>
          <div className="st-tag">{currentQ.section}</div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.2em", color: "rgba(237,233,227,0.2)", marginBottom: 28 }}>Question {qIndex + 1} of {QUESTIONS.length}</p>
          <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(18px, 2.8vw, 26px)", fontWeight: 700, lineHeight: 1.4, color: "var(--fog)", marginBottom: 36 }}>{currentQ.question}</h3>
          <div className="st-options">
            {currentQ.options.map((opt, i) => (
              <button key={i} onClick={() => setSelected(opt)} className={`st-option${selected === opt ? " selected" : ""}`}>
                <div className="st-option-marker">{selected === opt ? "✓" : MARKERS[i]}</div>
                <span className="st-option-text">{opt.text}</span>
              </button>
            ))}
          </div>
          <button className="st-btn st-btn-primary" onClick={nextQuestion} disabled={!selected} style={{ opacity: selected ? 1 : 0, pointerEvents: selected ? "all" : "none", transition: "opacity 0.2s" }}>
            {qIndex < QUESTIONS.length - 1 ? "Next question →" : "See my results →"}
          </button>
        </div>
      )}
      {stage === "gate" && (
        <div className="st-content fade-up">
          <div className="st-tag">Audit Complete</div>
          <h2 className="st-display" style={{ fontSize: "clamp(48px, 7vw, 88px)", marginBottom: 24 }}>YOUR<br />DIAGNOSIS<br />IS READY.</h2>
          <p className="st-body" style={{ maxWidth: 480, marginBottom: 36 }}>Enter your name and email to receive your full personalized diagnosis plus the one specific fix for your result.</p>
          <div style={{ maxWidth: 440 }}>
            <input className="st-input" type="text" placeholder="Your first name" value={firstName} onChange={e => setFirstName(e.target.value)} />
            <input className="st-input" type="email" placeholder="Your email address" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="st-btn st-btn-primary" onClick={submitEmail} disabled={!email || !firstName || submitting}>{submitting ? "One moment..." : "Reveal my diagnosis →"}</button>
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, letterSpacing: "0.1em", color: "rgba(237,233,227,0.2)", marginTop: 16 }}>No spam. Just your result and your next step.</p>
        </div>
      )}
      {stage === "result" && result && scores && (
        <div className="st-content fade-up">
          <div className="st-tag">{firstName ? `${firstName}'s` : "Your"} Retainer Readiness Diagnosis</div>
          <h2 className="st-display" style={{ fontSize: "clamp(40px, 6vw, 72px)", marginBottom: 20 }}>{RESULTS[result].code}</h2>
          <p className="st-body st-italic" style={{ maxWidth: 560, marginBottom: 40 }}>{RESULTS[result].tagline}</p>
          <div className="st-rule" />
          <div className="st-score-grid">
            {Object.entries(scores).map(([key, val]) => (
              <div key={key} className={`st-score-cell${result === key ? " dominant" : ""}`}>
                <span className="st-score-label">{result === key ? "Primary block" : "Also present"}</span>
                <span className="st-score-num">{val}</span>
                <div className="st-score-bar-track"><div className="st-score-bar-fill" style={{ width: `${(val / maxScore) * 100}%` }} /></div>
                <span className="st-score-name">{KILLER_NAMES[key]}</span>
              </div>
            ))}
          </div>
          {[["What This Means For You", RESULTS[result].diagnosis], ["What It's Costing You", RESULTS[result].costs], ["Your One Shift", RESULTS[result].fix]].map(([label, text]) => (
            <div key={label} className="st-result-block"><div className="st-tag">{label}</div><p className="st-body">{text}</p></div>
          ))}
          <div className="st-callout"><div className="st-tag">Your Next Step</div><p>{RESULTS[result].next}</p></div>
          <button className="st-btn st-btn-ghost" onClick={onBack}>← Back to all tools</button>
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function Tool2({ onBack }) {
  const [active, setActive]       = useState(0);
  const [showPrompt, setShowPrompt] = useState(null);
  const sec = BLUEPRINT_SECTIONS[active];
  return (
    <>
      <div className="st-hero fade-up"><div className="st-hero-grid" /><div className="st-hero-ghost">RBP</div>
        <div className="st-hero-content">
          <div className="st-tag">Tool 02 · Guide · 20 min read</div>
          <h2 className="st-display" style={{ fontSize: "clamp(52px, 8vw, 100px)", marginBottom: 28 }}>THE RETAINER<br /><span style={{ WebkitTextStroke: "1.5px #EDE9E3", color: "transparent" }}>BLUEPRINT</span></h2>
          <p className="st-body st-italic" style={{ maxWidth: 540 }}>Three specific shifts that transform how clients see you — from task-completer to operational partner worth keeping every month. Each shift includes a ready-to-use AI prompt you can implement this afternoon.</p>
        </div>
      </div>
      <div className="st-content fade-up">
        <div className="st-tabs">{BLUEPRINT_SECTIONS.map((s, i) => (<button key={i} onClick={() => { setActive(i); setShowPrompt(null); }} className={`st-tab${active === i ? " active" : ""}`}>{s.number}</button>))}</div>
        <div key={active} className="fade-up">
          <div className="st-tag">{sec.number}</div>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(32px, 4vw, 52px)", color: "var(--fog)", letterSpacing: "0.02em", marginBottom: 8 }}>{sec.title}</h3>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--steel)", marginBottom: 28 }}>{sec.subtitle}</p>
          <p className="st-body" style={{ marginBottom: 36, paddingBottom: 36, borderBottom: "1px solid var(--rule)" }}>{sec.body}</p>
          <div className="st-tag">The Action</div>
          <h4 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 18, fontWeight: 700, color: "var(--fog)", marginBottom: 14 }}>{sec.action}</h4>
          <p className="st-body" style={{ marginBottom: 28 }}>{sec.action_desc}</p>
          <button className="st-btn st-btn-ghost" onClick={() => setShowPrompt(showPrompt === active ? null : active)}>{showPrompt === active ? "Hide AI prompt ↑" : "View AI prompt →"}</button>
          {showPrompt === active && (<div className="st-prompt-box fade-up"><span className="st-prompt-label">Copy this prompt into ChatGPT or Claude</span><p className="st-prompt-text">{sec.ai_prompt}</p></div>)}
          <div className="st-highlight"><p>— {sec.highlight}</p></div>
          <div className="st-btn-row">
            {active > 0 && <button className="st-btn st-btn-ghost" onClick={() => { setActive(active - 1); setShowPrompt(null); }}>← Previous shift</button>}
            {active < BLUEPRINT_SECTIONS.length - 1 ? <button className="st-btn st-btn-primary" onClick={() => { setActive(active + 1); setShowPrompt(null); }}>Next shift →</button> : <button className="st-btn st-btn-ghost" onClick={onBack}>← Back to all tools</button>}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
function Tool3({ onBack }) {
  const [checked, setChecked] = useState({});
  const [active, setActive]   = useState(0);
  const toggle    = id => setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  const getPct    = comp => Math.round((comp.steps.filter(s => checked[s.id]).length / comp.steps.length) * 100);
  const totalSteps = SYSTEM_COMPONENTS.reduce((a, c) => a + c.steps.length, 0);
  const totalDone  = SYSTEM_COMPONENTS.reduce((a, c) => a + c.steps.filter(s => checked[s.id]).length, 0);
  const overallPct = Math.round((totalDone / totalSteps) * 100);
  const comp = SYSTEM_COMPONENTS[active];
  return (
    <>
      <div className="st-hero fade-up"><div className="st-hero-grid" /><div className="st-hero-ghost">SIS</div>
        <div className="st-hero-content">
          <div className="st-tag">Tool 03 · Interactive Builder · 45 min</div>
          <h2 className="st-display" style={{ fontSize: "clamp(52px, 8vw, 100px)", marginBottom: 28 }}>STABLE INCOME<br /><span style={{ WebkitTextStroke: "1.5px #EDE9E3", color: "transparent" }}>SYSTEM BUILDER</span></h2>
          <p className="st-body st-italic" style={{ maxWidth: 520 }}>Build your complete retainer operating system in one sitting. Work through all four components — check each step as you complete it. Your system builds as you go.</p>
        </div>
      </div>
      <div className="st-content fade-up">
        <div className="st-progress-bar">
          <div className="st-progress-inner">
            <div className="st-progress-meta"><span>Overall Progress</span><span>{totalDone}/{totalSteps} steps</span></div>
            <div className="st-progress-track"><div className="st-progress-filled" style={{ width: `${overallPct}%` }} /></div>
          </div>
          <span className="st-progress-pct">{overallPct}%</span>
        </div>
        <div className="st-comp-tabs">
          {SYSTEM_COMPONENTS.map((c, i) => {
            const pct = getPct(c);
            return (
              <button key={i} onClick={() => setActive(i)} className={`st-comp-tab${active === i ? " active" : ""}`}>
                <span className="st-comp-num">{c.number}</span>
                <span className="st-comp-done">{pct}% done</span>
                <div className="st-comp-track"><div className="st-comp-fill" style={{ width: `${pct}%` }} /></div>
              </button>
            );
          })}
        </div>
        <div key={active} className="fade-up">
          <div className="st-tag">Component {comp.number}</div>
          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", color: "var(--fog)", letterSpacing: "0.02em", marginBottom: 16 }}>{comp.title}</h3>
          <p className="st-body" style={{ marginBottom: 40, paddingBottom: 40, borderBottom: "1px solid var(--rule)" }}>{comp.desc}</p>
          <div className="st-tag">Build Steps</div>
          <div className="st-steps">
            {comp.steps.map((step, i) => (
              <button key={step.id} onClick={() => toggle(step.id)} className={`st-step${checked[step.id] ? " done" : ""}`}>
                <div className="st-step-marker">{checked[step.id] ? "✓" : i + 1}</div>
                <span className="st-step-text">{step.text}</span>
              </button>
            ))}
          </div>
          {getPct(comp) === 100 && (
            <div className="st-complete fade-up"><div className="st-tag">Component Complete ✓</div><p>{comp.output}</p></div>
          )}
          <div className="st-btn-row">
            {active > 0 && <button className="st-btn st-btn-ghost" onClick={() => setActive(active - 1)}>← Previous</button>}
            {active < SYSTEM_COMPONENTS.length - 1
              ? <button className="st-btn st-btn-primary" onClick={() => setActive(active + 1)}>Next component →</button>
              : overallPct === 100
                ? (<div className="st-complete fade-up" style={{ width: "100%" }}><div className="st-tag">System Complete</div><p>Your Retainer Operating System is built. You now have the four infrastructure components that separate stable VA income from feast-or-famine. Systems Over Hustle™.</p><p className="muted">Your income is no longer a matter of hope. It is a matter of system.</p><button className="st-btn st-btn-ghost" onClick={onBack} style={{ borderColor: "rgba(26,23,20,0.25)", color: "var(--ink)" }}>← Back to all tools</button></div>)
                : <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: "0.15em", color: "var(--steel)", paddingTop: 16 }}>Complete all steps to finish your system.</p>
            }
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("hub");
  return (
    <div className="app">
      <style>{GLOBAL_CSS}</style>
      <header className="st-nav">
        <div className="st-nav-left">
          {view !== "hub" && <button className="st-back-btn" onClick={() => setView("hub")}>← All tools</button>}
          <a href="https://marginmomentum.co" className="st-wordmark">Margin &amp; Momentum™ <span>Lean Trifecta</span></a>
        </div>
      </header>
      <main className="st-main">
        {view === "hub"  && <Hub onSelect={id => setView(id)} />}
        {view === "m1"   && <Tool1 onBack={() => setView("hub")} />}
        {view === "m2"   && <Tool2 onBack={() => setView("hub")} />}
        {view === "m3"   && <Tool3 onBack={() => setView("hub")} />}
      </main>
      <footer className="st-footer">
        <span className="st-footer-l">Margin &amp; Momentum™</span>
        <span className="st-footer-r">Systems Over Hustle™</span>
      </footer>
    </div>
  );
}
