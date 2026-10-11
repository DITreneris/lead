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
            'Role: You are my work assistant.',
            'Goal: Prepare one prompt with limits, not the finished work.',
            'Context:',
            'Task that prompt must do: [TASK]',
            'Confidentiality: [INTERNAL / CLIENT / PUBLIC — what must not leak]',
            'Legal or approval boundary: [WHAT IS FORBIDDEN OR NEEDS SIGN-OFF]',
            'Who signs off before send: [NAME]',
            'Length: [E.g. max 200 words / 1 page]',
            'Avoid: [E.g. jargon, hype, subjective ratings]',
            'Format: [E.g. bullets, table, paragraphs]',
            'Language: [LANGUAGE]',
            'Output: 1) One prompt, ready to paste into the AI. 2) "Avoid": up to 5 bullets. 3) What to ask before acting.',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
        ].join('\n'),
        lib_daySummary: [
            'Role: You are my work assistant.',
            'Goal: Write a day summary only from the fields below.',
            'Context:',
            'Position: [POSITION]',
            'Today’s work: [TEXT]',
            'Results: [TEXT]',
            'Blockers: [TEXT]',
            'Tomorrow’s plan: [TEXT]',
            'Output: Write 5 bullets, 1–2 sentences each. Each bullet rests on one entered fact.',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
        ].join('\n'),
        lib_meetingNotes: [
            'Role: You are my work assistant.',
            'Goal: Turn the notes into a meeting outcome.',
            'Context:',
            'Topic: [TOPIC]',
            'Participants: [NAMES]',
            'Notes: [TEXT]',
            'Output: Four blocks: Summary; Decisions; Actions (who and when); Open questions. Write an owner and a date only if they are in the notes; otherwise — "not stated".',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
        ].join('\n'),
        lib_emailReply: [
            'Role: You are my work assistant.',
            'Goal: Write a reply to the email you received.',
            'Context:',
            'Incoming email: [PASTE]',
            'What you answer: [AGREE / DELAY / ASK / DECLINE]',
            'What you will not promise: [TEXT]',
            'Output: 4–6 sentences. Professional, polite tone. The last sentence is the next step (who and when).',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
        ].join('\n'),
        lib_hardUpdate: [
            'Role: You are my work assistant.',
            'Goal: Write a hard work message from the facts.',
            'Context:',
            'Channel: [EMAIL / SLACK / TEAMS]',
            'Audience: [TEAM / CLIENT / PARTNER]',
            'Facts: [WHAT HAPPENED]',
            'Constraints: [WHAT YOU CANNOT SAY]',
            'Output: Two variants, both with the same parts: context; what happens now; next step (who and when); risks, up to 3. Short — up to 120 words. Medium — up to 200 words. Tone calm, no blame.',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
        ].join('\n'),
        lib_feedbackAfterMistake: [
            'Role: You are my work assistant.',
            'Goal: Draft the opening of a 1:1 after a mistake.',
            'Context:',
            'Relationship: [LEADER–MEMBER / PEERS]',
            'Event (facts): [WHAT HAPPENED]',
            'Impact: [TEAM / CLIENT / DEADLINES]',
            'What you want next: [BEHAVIOR OR PROCESS]',
            'Reasoning: Tie each observation to behavior and outcome. Do not use personal labels.',
            'Output: Opening, 2–3 sentences. 2–3 observations. 1 agreement. 1 question.',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
        ].join('\n'),
        lib_deescalateMessage: [
            'Role: You are my work assistant.',
            'Goal: Rewrite the tense message so it is calmer.',
            'Context:',
            'What caused tension: [BRIEF]',
            'Draft: [PASTE TEXT]',
            'Recipient: [POSITION / AUDIENCE]',
            'Output: One message, four parts: facts; need; proposal; next step. No blaming phrases. If the draft has a boundary, keep it.',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
        ].join('\n'),
        lib_taskList: [
            'Role: You are my work assistant.',
            'Goal: Turn the text into a task list with priorities.',
            'Context:',
            'Text: [TEXT]',
            'Output: Each line: task, priority A, B, or C, deadline if it is in the text.',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
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
            'Role: You are my work assistant.',
            'Goal: Shorten the text and keep the core.',
            'Context:',
            'Text: [TEXT]',
            'Audience: [AUDIENCE]',
            'Output: A version 30–50% shorter. The same facts. No new claims.',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
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
            'Role: You are my work assistant.',
            'Goal: Review the pasted prompt before it is used.',
            'Context:',
            'Prompt: [PASTE PROMPT]',
            'Reasoning: For each principle answer only "yes" or "no". Next to "no", say what is missing.',
            'Output: Five lines: Role; Context; Output; Reasoning; Quality control. Each is yes or no and one sentence. Then one rewritten prompt. If the prompt is already complete — rewrite it unchanged and write "No changes".',
            'An empty field or […] — do not invent the fact. Write "Missing:".'
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
        'Role: You are my work assistant.',
        'Goal: Write a leader day summary only from the fields below.',
        'Context:',
        'Today’s focus and decisions: [TEXT]',
        'Risks and blockers: [TEXT]',
        'Team state (1–2 sentences): [TEXT]',
        'Tomorrow’s priorities: [TEXT]',
        'Output: Write 5 bullets, 1–2 sentences each. Each bullet rests on one entered fact.',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
    ].join('\n');
    p.mgr_meetingNotes = [
        'Role: You are my work assistant.',
        'Goal: Turn the notes into a meeting outcome for leadership.',
        'Context:',
        'Topic and goal: [TOPIC]',
        'Participants and positions: [LIST]',
        'Notes: [TEXT]',
        'Output: Five blocks: Summary; Decisions and owners; Actions (who and by when); Risks; Open questions. Write an owner and a date only if they are in the notes; otherwise — "not stated".',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
    ].join('\n');
    p.mgr_emailReply = [
        'Role: You are my work assistant.',
        'Goal: Write a reply to leadership or an outside party.',
        'Context:',
        'Incoming email: [PASTE]',
        'What you answer: [AGREE / DELAY / ASK / DECLINE]',
        'What you will not promise: [TEXT]',
        'Tone: [formal / partner-like]',
        'Output: 4–7 sentences. The last two sentences are the next step and who owns it. One confidentiality note if it is in the input.',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
    ].join('\n');
    p.mgr_hardUpdate = [
        'Role: You are my work assistant.',
        'Goal: Write a hard message to leadership or an outside party from the facts.',
        'Context:',
        'Channel: [EMAIL / SLACK / TEAMS]',
        'Audience: [TEAM / CLIENT / PARTNER / LEADERSHIP]',
        'Facts: [WHAT HAPPENED]',
        'Risks: [LEGAL / COMMS / CONTRACT / REPUTATION]',
        'Constraints: [WHAT YOU CANNOT SAY]',
        'Output: Two variants, both with the same parts: context; decision now; owner and deadline; risks, up to 3. Short — up to 120 words. Medium — up to 200 words. Tone calm, no blame.',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
    ].join('\n');
    p.mgr_feedbackAfterMistake = [
        'Role: You are my work assistant.',
        'Goal: Draft the opening of a 1:1 after a mistake.',
        'Context:',
        'Relationship: [LEADER–MEMBER / PEERS]',
        'Event (facts): [WHAT HAPPENED]',
        'Impact: [TEAM / CLIENT / DEADLINES]',
        'What you want next: [BEHAVIOR OR PROCESS]',
        'Reasoning: Tie each observation to behavior and consequence. Do not use personal labels.',
        'Output: Opening, 2–3 sentences. 2–3 observations. 1 expectation. 1 next step. 1 question.',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
    ].join('\n');
    p.mgr_deescalateMessage = [
        'Role: You are my work assistant.',
        'Goal: Rewrite a tense leader message so it is calmer.',
        'Context:',
        'What caused tension: [BRIEF]',
        'Draft: [PASTE TEXT]',
        'Recipient: [POSITION / AUDIENCE]',
        'Risk to the organization or client: [TEXT]',
        'Output: One message, four parts: facts; need; proposal; next step. No blaming phrases. If the draft has a boundary, keep it.',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
    ].join('\n');
    p.mgr_taskList = [
        'Role: You are my work assistant.',
        'Goal: Turn the text into tasks with an owner and a priority.',
        'Context:',
        'Text: [TEXT]',
        'Output: Each line: task, owner, priority A, B, or C, one sentence on why that priority, deadline if it is in the text.',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
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
        'Role: You are my work assistant.',
        'Goal: Review the pasted prompt before it goes to leadership.',
        'Context:',
        'Prompt: [PASTE PROMPT]',
        'Reasoning: For each principle answer only "yes" or "no". Next to "no", say what is missing.',
        'Output: Five lines: Role; Context; Output; Reasoning; Quality control. Each is yes or no and one sentence. Then one rewritten prompt. If the prompt is already complete — rewrite it unchanged and write "No changes".',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
    ].join('\n');
    p.mgr_simplifyText = [
        'Role: You are my work assistant.',
        'Goal: Shorten the text to one core point.',
        'Context:',
        'Text: [TEXT]',
        'Audience: [LEADERSHIP / CLIENT / MARKET / INTERNAL TEAM]',
        'What the reader must understand: [ONE SENTENCE]',
        'Output: A version 30–50% shorter. The first sentence is the core. The same facts. If the text has a legal risk — one note, no guess.',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
    ].join('\n');
    p.mgr_constraints = [
        'Role: You are my work assistant.',
        'Goal: Prepare one prompt with compliance and sign-off, not the finished work.',
        'Context:',
        'Task that prompt must do: [WHAT MUST BE DONE]',
        'Confidentiality: [INTERNAL / CLIENT / PUBLIC — what must not leak]',
        'Legal or contract boundary: [WHAT IS FORBIDDEN OR NEEDS SIGN-OFF]',
        'Length and format: [E.g. 1 page, bullets, table]',
        'Language: [LANGUAGE]',
        'Who signs off before send: [NAME]',
        'Output: 1) One prompt, ready to paste into the AI. 2) "Avoid": up to 5 bullets. 3) What to ask before acting.',
        'An empty field or […] — do not invent the fact. Write "Missing:".'
    ].join('\n');

    window.__PROMPT_LIBRARY_EN__ = p;
})();
