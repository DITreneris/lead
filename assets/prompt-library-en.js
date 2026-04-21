/* English prompt library for Prompt Anatomy — loaded before inline app script. */
(function () {
    'use strict';
    var p = {
        lib_zeroShot: 'Write a one-line product tagline for [PRODUCT].',
        lib_fewShot: ['Examples:', '"[EXAMPLE 1]"', '"[EXAMPLE 2]"', 'Write 3 more taglines in the same style for [PRODUCT].'].join('\n'),
        lib_thoughtChain: [
            'Identify 3 main problems related to [SITUATION / PRODUCT / PROCESS].',
            'Suggest fixes.',
            'Outline a short action plan.'
        ].join('\n'),
        lib_promptSeq: [
            'Write 5 key talking points on [TOPIC].',
            'Outline the structure.',
            'Write a one-paragraph intro.'
        ].join('\n'),
        lib_instruct: [
            'Write a [WORD COUNT]-word piece on [TOPIC].',
            'Audience: [AUDIENCE].',
            'Tone: [TONE].',
            'Language: [LANGUAGE].'
        ].join('\n'),
        lib_constraints: [
            'Define an AI prompt with constraints so the output stays controllable.',
            '',
            'Input:',
            'Task (what the AI must do): [TASK]',
            'Length: [E.g. max 200 words / 1 page]',
            'Avoid: [E.g. jargon, hype, subjective ratings]',
            'Format: [E.g. bullets, table, paragraphs]',
            'Language: [LANGUAGE]',
            '',
            'Output:',
            'One clear prompt ready to paste into the AI',
            '"Avoid": up to 5 short bullets'
        ].join('\n'),
        lib_daySummary: [
            'Day summary from facts — fill the fields, get 5 bullets.',
            '',
            'Input:',
            'Your role (for context): [ROLE]',
            'Today’s work: [TEXT]',
            'Results: [TEXT]',
            'Blockers: [TEXT]',
            'Tomorrow’s plan: [TEXT]',
            '',
            'Output:',
            '5-bullet list',
            '1–2 sentences each'
        ].join('\n'),
        lib_meetingNotes: [
            'Turn rough notes into a structured meeting outcome.',
            '',
            'Input:',
            'Topic: [TOPIC]',
            'Participants: [NAMES]',
            'Notes: [TEXT]',
            '',
            'Output:',
            'Summary',
            'Decisions',
            'Actions (who / when)',
            'Open questions'
        ].join('\n'),
        lib_emailReply: [
            'Reply to an email or message you received.',
            '',
            'Input:',
            'Incoming email or message: [PASTE]',
            '',
            'Output:',
            '4–6 sentences',
            'Professional, polite tone',
            'Clear next step'
        ].join('\n'),
        lib_hardUpdate: [
            'Hard but professional work message (deadline, error, change).',
            '',
            'Input:',
            'Channel: [EMAIL / SLACK / TEAMS]',
            'Audience: [TEAM / CLIENT / PARTNER]',
            'Facts: [WHAT HAPPENED / WHAT IS LATE / WHAT CHANGES]',
            'Constraints: [WHAT YOU CANNOT SAY / CONFIDENTIALITY / DEADLINES]',
            '',
            'Output:',
            '2 variants: short (up to 120 words) and medium (up to 200 words)',
            'Structure: context → what happens now → next step (who / when) → risks (up to 3)',
            'Tone: calm, no blame; no speculation beyond facts'
        ].join('\n'),
        lib_feedbackAfterMistake: [
            'Feedback after a mistake or incident (1:1, work context).',
            '',
            'Input:',
            'Relationship: [LEADER–MEMBER / PEERS]',
            'Event (facts, no spin): [WHAT HAPPENED]',
            'Impact: [TEAM / CLIENT / DEADLINES]',
            'Goal for the conversation: [WHAT YOU WANT NEXT IN BEHAVIOUR OR PROCESS]',
            '',
            'Output:',
            'Opening: 2–3 sentences (clear, not “school tone”)',
            '2–3 observations tied to behaviour and outcome',
            '1 clear agreement or expectation',
            '1 question to continue the dialogue',
            'Avoid personal labels; talk about what can change'
        ].join('\n'),
        lib_deescalateMessage: [
            'Rewrite a tense message to be calmer and clearer.',
            '',
            'Input:',
            'What caused tension: [BRIEF]',
            'Current draft: [PASTE TEXT]',
            'Recipient: [ROLE / AUDIENCE]',
            '',
            'Output:',
            'Rewritten message: facts → need → proposal → next step',
            'Remove blaming phrases; keep a clear boundary if needed',
            'If facts are missing — say what to ask instead of guessing'
        ].join('\n'),
        lib_taskList: [
            'From messy text — task list with priorities.',
            '',
            'Input:',
            'Text with ideas or requirements: [TEXT]',
            '',
            'Output:',
            'Task list',
            'Priorities A / B / C',
            'Deadlines if mentioned'
        ].join('\n'),
        lib_decisionSummary: [
            'META: You are a business analyst.',
            'INPUT:',
            'Situation: [DESCRIPTION]',
            'Options: [OPTIONS]',
            'Data: [NUMBERS / FACTS]',
            'OUTPUT:',
            'Problem',
            '2–3 options',
            'Recommendation',
            'Risks'
        ].join('\n'),
        lib_processDoc: [
            'META: You are a process specialist.',
            'INPUT:',
            'Topic: [PROCESS]',
            'Current steps: [STEPS]',
            'OUTPUT:',
            '6–10 clear steps',
            'Short sentences, verbs'
        ].join('\n'),
        lib_simplifyText: [
            'Shorten text while keeping the core for the reader.',
            '',
            'Input:',
            'Text: [TEXT]',
            'Audience: [AUDIENCE]',
            '',
            'Output:',
            '30–50% shorter version',
            'Plain, clear language'
        ].join('\n'),
        lib_swot: [
            'META: You are a business consultant.',
            'INPUT:',
            'Project / company: [DESCRIPTION]',
            'Data: [FACTS]',
            'OUTPUT:',
            'SWOT table',
            '3–5 concrete bullets per quadrant'
        ].join('\n'),
        lib_qualityCheck: [
            'Review your prompt before high-stakes decisions or bulk sends.',
            '',
            'Input:',
            '[Paste your prompt here]',
            '',
            'Criteria (5 principles): Clarity; Experimentation; Simple to complex; Context; Word choice.',
            '',
            'Output:',
            '1) Table: 1–5 score per principle',
            '2) Briefly why that score',
            '3) 3 weakest spots',
            '4) Improved prompt version',
            'Rules: be specific; if facts are missing — say so; if too complex — offer V1; do not change without upside.'
        ].join('\n')
    };

    ['zeroShot', 'fewShot', 'thoughtChain', 'promptSeq', 'instruct', 'constraints', 'daySummary', 'meetingNotes', 'emailReply', 'hardUpdate', 'feedbackAfterMistake', 'deescalateMessage', 'taskList', 'decisionSummary', 'processDoc', 'simplifyText', 'swot', 'qualityCheck'].forEach(function (s) {
        var lk = 'lib_' + s;
        var mk = 'mgr_' + s;
        p[mk] = p[lk];
    });

    p.mgr_zeroShot =
        'Write a one-line business tagline or positioning line for initiative / product [NAME]. Audience: leadership or external partners.';
    p.mgr_fewShot = [
        'Examples (style for leadership or client):',
        '"[EXAMPLE 1]"',
        '"[EXAMPLE 2]"',
        'Write 3 more lines in the same style on [TOPIC].'
    ].join('\n');
    p.mgr_daySummary = [
        'Leader day summary from facts — fill the fields.',
        '',
        'Input:',
        'Today’s focus and decisions: [TEXT]',
        'Risks / blockers: [TEXT]',
        'Team state (1–2 sentences): [TEXT]',
        'Tomorrow’s priorities: [TEXT]',
        '',
        'Output:',
        '5-bullet leader summary (for execution; escalate to leadership if needed)',
        '1–2 sentences each, minimal jargon'
    ].join('\n');
    p.mgr_meetingNotes = [
        'Meeting outcome for leadership or team — from short notes.',
        '',
        'Input:',
        'Topic and goal: [TOPIC]',
        'Participants and roles: [LIST]',
        'Short raw notes: [TEXT]',
        '',
        'Output:',
        'Summary for leader',
        'Decisions and owners',
        'Actions (who / by when)',
        'Risks and open questions'
    ].join('\n');
    p.mgr_emailReply = [
        'Reply for leadership or external comms.',
        '',
        'Input:',
        'Incoming email or message: [PASTE]',
        '',
        'Output:',
        '4–7 sentences',
        'Tone: [formal / partner-like]',
        'Clear next steps and ownership',
        'Optional one line on confidentiality'
    ].join('\n');
    p.mgr_hardUpdate = [
        'Hard message to leadership or outside — reputation and risk visible.',
        '',
        'Input:',
        'Channel: [EMAIL / SLACK / TEAMS]',
        'Audience: [TEAM / CLIENT / PARTNER / LEADERSHIP]',
        'Facts: [WHAT HAPPENED / WHAT IS LATE / WHAT CHANGES]',
        'Risks: [LEGAL / COMMS / CONTRACT / REPUTATION — if any]',
        'Constraints: [WHAT YOU CANNOT SAY / CONFIDENTIALITY / DEADLINES]',
        '',
        'Output:',
        'Two variants: short and medium',
        'Structure: context → decision now → owner and deadline → risks (up to 3)',
        'Tone: calm, no blame; no speculation beyond facts'
    ].join('\n');
    p.mgr_feedbackAfterMistake = [
        'Feedback to a leader: results and behaviour (1:1).',
        '',
        'Input:',
        'Relationship: [LEADER–MEMBER / PEERS]',
        'Event (facts): [WHAT HAPPENED]',
        'Impact: [TEAM / CLIENT / DEADLINES / RISKS]',
        'Goal: [WHAT YOU WANT NEXT IN BEHAVIOUR / PROCESS]',
        '',
        'Output:',
        'Opening: 2–3 sentences (clear, not “grading” tone)',
        '2–3 observations tied to behaviour and impact',
        '1 clear expectation and 1 visible next step',
        '1 question to continue the dialogue',
        'If HR / process step is relevant — one neutral note (no diagnoses)'
    ].join('\n');
    p.mgr_deescalateMessage = [
        'De-escalation for a leader message — assess risk and continuity.',
        '',
        'Input:',
        'What caused tension: [BRIEF]',
        'Current draft: [PASTE TEXT]',
        'Recipient: [ROLE / AUDIENCE]',
        'Risk: [WHAT COULD BOOMERANG — if any]',
        '',
        'Output:',
        'Rewritten message: facts → need → proposal → clear next step',
        'Remove blaming phrases; keep a clear boundary if needed',
        'If facts are missing — say what to ask instead of guessing'
    ].join('\n');
    p.mgr_taskList = [
        'From text — tasks with owner and priorities (for leaders).',
        '',
        'Input:',
        'Ideas, email, or meeting notes: [TEXT]',
        '',
        'Output:',
        'Task list with owners',
        'Priorities A / B / C with rationale',
        'Deadlines and dependencies if known'
    ].join('\n');
    p.mgr_decisionSummary = [
        'META: You are a leadership decision analyst.',
        'INPUT:',
        'Question or dilemma: [DESCRIPTION]',
        'Options and arguments: [OPTIONS]',
        'Data / facts: [NUMBERS / FACTS]',
        'OUTPUT:',
        'Core issue',
        '2–3 scenarios with risk',
        'Recommendation for leadership',
        'What to watch after the decision'
    ].join('\n');
    p.mgr_processDoc = [
        'META: You are an org process and compliance expert.',
        'INPUT:',
        'Process or policy: [PROCESS]',
        'Current practice: [STEPS / EXCEPTIONS]',
        'OUTPUT:',
        '6–10 clear steps (incl. owners and control points)',
        'Short sentences, verbs',
        'One note on audit or documentation if relevant'
    ].join('\n');
    p.mgr_swot = [
        'META: You are a strategy consultant for leadership.',
        'INPUT:',
        'Business unit / initiative: [DESCRIPTION]',
        'Data and assumptions: [FACTS]',
        'OUTPUT:',
        'SWOT table',
        '3–5 concrete bullets per quadrant',
        'One note on competitive or regulatory context if relevant'
    ].join('\n');
    p.mgr_qualityCheck = [
        'Review a prompt before bulk send or major leadership decisions.',
        '',
        'Input:',
        '[Paste your prompt here]',
        '',
        'Criteria (5 principles): Clarity; Experimentation; Simple to complex; Context; Word choice.',
        '',
        'Output:',
        '1) Table: 1–5 score per principle',
        '2) Briefly why that score',
        '3) 3 weakest spots',
        '4) Improved prompt version',
        'Rules: be specific; if facts are missing — say so; if too complex — offer V1; do not change without upside.'
    ].join('\n');
    p.mgr_simplifyText = [
        'Shorten text for leadership, client, or market — one clear core.',
        '',
        'Input:',
        'Text: [TEXT]',
        'Audience: [LEADERSHIP / CLIENT / MARKET / INTERNAL TEAM]',
        'Goal (what the reader must grasp): [ONE STEP]',
        '',
        'Output:',
        '30–50% shorter version',
        '1 sentence — core (what to do / what to know)',
        'Plain language; no extra jargon or decoration',
        'If political or legal risk remains — one clear note, no speculation'
    ].join('\n');
    p.mgr_constraints = [
        'AI task with compliance and approval chain (for leaders).',
        '',
        'Input:',
        'Task or outcome: [WHAT MUST BE DONE]',
        'Confidentiality: [INTERNAL / CLIENT / PUBLIC — what must not leak]',
        'Legal / contract boundary: [WHAT IS FORBIDDEN OR NEEDS SIGN-OFF]',
        'Length and format: [E.g. 1 page, bullets, table]',
        'Language: [LANGUAGE]',
        'Approval chain: [WHO SIGNS OFF BEFORE SEND — if relevant]',
        '',
        'Output:',
        'One clear AI task with context and format',
        '"Avoid": up to 5 bullets',
        'If facts are missing — what to ask before acting, not guessing'
    ].join('\n');

    window.__PROMPT_LIBRARY_EN__ = p;
})();
