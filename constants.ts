import { GroupOffering, GroupType, SiteContent, BlogPost } from './types';

export const INITIAL_CONTENT: SiteContent = {
  heroTitle: "Structured Support. Facilitated Growth.",
  heroSubtitle: "Reflective Sessions offers clinically guided, virtual group spaces for adults navigating life's complexities. Not therapy, but therapeutic.",
  aboutText: "We believe that healing happens in community. Reflective Sessions bridges the gap between individual therapy and casual support groups. Our programs are designed to provide psychoeducation, emotional regulation tools, and a safe container for shared experience.",
  methodologyText: "All groups meet virtually via secure video platform. Our sessions follow a structured arc: Check-in, Psychoeducational Focus, Guided Reflection, and Integrative Closing. This ensures safety, predictability, and purpose in every gathering.",
  contactEmail: "reflectivesessions@dreamucares.org",
  contactPhone: "855-797-7177",
  organizationName: "DreamU Psychiatric Support Services",
  logoUrl: "https://blogger.googleusercontent.com/img/a/AVvXsEi9WEyri2CQQiRbtaQqyWsKrVHAF8DC8OiAPMyrpL1B7nhomGoWAg8oIe2U9jYymO7E_lUfwzkJDSphkPM_ZJL1od_lteozsGCwa4M0xPXWyd4CejVcZAk-H4f53bBt1s667xkRy-sXBu4Z_KNJzWIbrnG_EiJWXwsuXzdUAmxzUUIIe1gNHjfoTi4tNAEE",
  globalScheduleStatus: "All sessions are due to start March of 2026."
};

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'd446a816-566c-4993-8a33-28f41530938f',
    title: 'The Power of Shared Experience',
    excerpt: 'Why healing in community can be more effective than healing alone.',
    content: "Humans are biologically wired for connection. When we experience stress, our nervous system looks for 'safety cues' in the faces and voices of others. In this post, we explore the neurobiology of co-regulation and why group support offers a unique pathway to resilience that individual therapy cannot always replicate.\n\nKey takeaways include understanding mirror neurons, the importance of validation, and how witnessing others' growth can catalyze our own.",
    author: 'Ashley Smith, PMHNP-BC',
    publishDate: '2023-10-15',
    imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80',
    tags: ['Community', 'Neurobiology', 'Healing']
  },
  {
    id: 'f28a3818-6923-4246-8822-426532284920',
    title: 'Navigating the Neutral Zone',
    excerpt: 'Understanding the confusing space between an ending and a new beginning.',
    content: "William Bridges, a transition consultant, famously described transition as a three-part process: The Ending, The Neutral Zone, and The New Beginning. Most of us rush through the Neutral Zone because it feels uncomfortable and unproductive. However, this liminal space is where the real psychological realignment happens.\n\nWe discuss strategies for tolerating the ambiguity of the Neutral Zone and how to use this time for deep reflection rather than anxiety-driven action.",
    author: 'Reflective Sessions Team',
    publishDate: '2023-11-02',
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80',
    tags: ['Transitions', 'Growth', 'Psychology']
  }
];

// Images updated to abstract/gradient styles as per brand guidelines
export const INITIAL_GROUPS: GroupOffering[] = [
  {
    id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
    title: 'Navigating Transitions',
    description: 'A supportive space focusing on life transitions, identity continuity, and stress regulation for those moving through career changes, relocation, or relationship shifts.',
    longDescription: "Change is the only constant, yet it often leaves us feeling unmoored. 'Navigating Transitions' is a dedicated cohort for individuals moving through significant life chapters—whether that be a career pivot, a breakup, relocation, or a shift in family dynamics. In this group, we explore the psychology of change, the grief that often accompanies new beginnings, and practical strategies for maintaining a sense of self when everything around you is shifting.",
    benefits: [
      "Understand the psychological stages of transition",
      "Develop a personal 'continuity plan' for times of chaos",
      "Process the grief of what is being left behind",
      "Connect with peers who are also in the 'neutral zone' of change"
    ],
    type: GroupType.SUPPORT,
    schedule: 'Tuesdays, 6:00 PM EST (Virtual)',
    facilitator: 'Reflective Sessions Facilitator',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&q=80', // Soft gradient
    active: true,
    focus: 'Life Transitions'
  },
  {
    id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    title: 'Social Context & Identity',
    description: 'Processing systemic stressors, social dynamics, and resilience, with a specific lens on the Black experience.',
    longDescription: "This group provides a safe, affirming space to process the unique psychological toll of navigating systemic stressors and social dynamics. With a specific lens on the Black experience, we explore themes of resilience, identity, code-switching, and rest as resistance. This is a place to unmask, share openly without the need for explanation, and build community with others who understand the nuance of your lived experience.",
    benefits: [
      "Process the impact of microaggressions and systemic stress",
      "Explore tools for protective emotional boundaries",
      "Celebrate cultural identity and resilience",
      "Practice 'radical rest' and nervous system regulation"
    ],
    type: GroupType.SUPPORT,
    schedule: 'Thursdays, 7:00 PM EST (Virtual)',
    facilitator: 'Licensed Clinical Facilitator',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80', // Abstract liquid
    active: true,
    focus: 'Identity & Resilience'
  },
  {
    id: '6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b',
    title: 'Regulation & Grounding',
    description: 'Skills-based support focused on nervous system regulation and grounding techniques for emotional balance.',
    longDescription: "Do you often feel overwhelmed, on edge, or shut down? 'Regulation & Grounding' is a skills-building workshop series designed to help you befriend your nervous system. We move beyond 'just relax' advice and dive into the physiology of stress. You will learn and practice evidence-based somatic techniques to return to a state of safety and connection, building a personal toolkit for emotional balance.",
    benefits: [
      "Map your personal nervous system states (Fight/Flight/Freeze)",
      "Learn somatic tools to down-regulate anxiety in real-time",
      "Practice co-regulation in a safe group environment",
      "Build a personalized 'menu' of grounding activities"
    ],
    type: GroupType.SKILL_BUILDING,
    schedule: 'Wednesdays, 5:30 PM EST (Virtual)',
    facilitator: 'Reflective Sessions Facilitator',
    // Fixed image URL that was previously broken/not rendering
    image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?auto=format&fit=crop&q=80', 
    active: true,
    focus: 'Coping Skills'
  },
  {
    id: 'c56a4180-65aa-42ec-a945-5fd21dec0538',
    title: 'Smoking Cessation & Behavior Change',
    description: 'Structured support for reducing or quitting smoking through reflection, regulation, and habit awareness.',
    longDescription: "Breaking a habit is rarely just about willpower—it's about understanding the function the behavior serves. This group offers a non-judgmental, shame-free environment to explore your relationship with smoking. We combine behavioral science with emotional regulation tools to help you identify triggers, manage cravings, and build a life that feels complete without the habit. Whether you are ready to quit today or just contemplating change, you are welcome here.",
    benefits: [
      "Identify emotional and environmental triggers",
      "Learn urge-surfing and distress tolerance skills",
      "Create a relapse prevention plan",
      "Replace the 'ritual' of smoking with healthy alternatives"
    ],
    type: GroupType.SKILL_BUILDING,
    schedule: 'Mondays, 6:00 PM EST (Virtual)',
    facilitator: 'Reflective Sessions Facilitator',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80', // Abstract colors
    active: true,
    focus: 'Behavior Change'
  }
];