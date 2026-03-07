

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Animated,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import * as Haptics from "expo-haptics";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const { width: SCREEN_W } = Dimensions.get("window");

// ─── TYPES ───────────────────────────────────────────────────────────────────
type Screen = "landing" | "setup" | "loading" | "interview" | "evaluating" | "results";
type Difficulty = "Easy" | "Medium" | "Hard";
type QuestionType = "technical" | "coding" | "system" | "behavioral" | "hr";
type HireVerdict = "Strong Hire" | "Hire" | "Borderline" | "No Hire";
type InputMode = "text" | "voice";

interface Question {
  id: number;
  question: string;
  type: QuestionType;
  difficulty: Difficulty;
  why_asked: string;
  hint: string;
  ideal_answer: string;
  lp: string | null;
}

interface VoiceMetrics {
  duration: number;
  confidence: number;
  clarity: number;
  pace: string;
}

interface AnswerData {
  text: string;
  voiceMetrics?: VoiceMetrics;
  inputMode: InputMode;
}

interface SkillScore {
  score: number;
  comment: string;
}

interface NextStep {
  icon: string;
  title: string;
  desc: string;
}

interface ScoreItem {
  id: number;
  score: number;
  feedback: string;
  voiceFeedback?: string;
}

interface Evaluation {
  scores: ScoreItem[];
  skill_breakdown: {
    technical_depth: SkillScore;
    communication: SkillScore;
    problem_solving: SkillScore;
    confidence: SkillScore;
    vocabulary: SkillScore;
  };
  overall_score: number;
  hire_verdict: HireVerdict;
  verdict_reason: string;
  strengths: string[];
  improvements: string[];
  next_steps: NextStep[];
  voice_analysis?: {
    overall_confidence: number;
    speaking_pace: string;
    recommendation: string;
  };
}

interface CompanyProfile {
  color: string;
  emoji: string;
  gradient: [string, string];
  difficulty: string;
  focus: string;
  known_for: string;
  rounds: string[];
  isCustom?: boolean;
}

interface IndustryProfile {
  name: string;
  emoji: string;
  color: string;
  focus: string;
  companies: string[];
}

// ─── COMPANY DATA ─────────────────────────────────────────────────────────────
const COMPANY_PROFILES: Record<string, CompanyProfile> = {
  Google: {
    color: "#4285F4",
    emoji: "🔵",
    gradient: ["#4285F4", "#34A853"],
    difficulty: "Very High",
    focus: "Algorithms, System Design, Googleyness",
    known_for: "4-5 rounds: Coding (DSA heavy), System Design, Googleyness behavioral.",
    rounds: ["Coding", "System Design", "Googleyness", "Team Match"],
  },
  Amazon: {
    color: "#FF9900",
    emoji: "📦",
    gradient: ["#FF9900", "#FF6600"],
    difficulty: "High",
    focus: "14 Leadership Principles, OOP, Distributed Systems",
    known_for: "Every behavioral maps to LP. Bar Raiser can veto. STAR method mandatory.",
    rounds: ["LP Behavioral", "Coding", "System Design", "Bar Raiser"],
  },
  Microsoft: {
    color: "#00A4EF",
    emoji: "🪟",
    gradient: ["#00A4EF", "#7FBA00"],
    difficulty: "High",
    focus: "Problem solving, Growth Mindset, OOP/OOD",
    known_for: "Collaborative style. OOP design questions.",
    rounds: ["Coding", "OOD/Design", "Behavioral", "As-Appropriate"],
  },
  Meta: {
    color: "#0668E1",
    emoji: "Ⓜ️",
    gradient: ["#0668E1", "#833AB4"],
    difficulty: "Very High",
    focus: "Speed coding, Product Sense, Move Fast",
    known_for: "Fastest-paced interviews. Two coding rounds back-to-back.",
    rounds: ["Coding x2", "System Design", "Behavioral"],
  },
  Apple: {
    color: "#555555",
    emoji: "🍎",
    gradient: ["#555555", "#333333"],
    difficulty: "High",
    focus: "Deep domain expertise, Attention to detail",
    known_for: "Domain-specific deep dives. Focus on craftsmanship.",
    rounds: ["Technical", "Coding", "Design Review", "Team Fit"],
  },
  Netflix: {
    color: "#E50914",
    emoji: "🎬",
    gradient: ["#E50914", "#B20710"],
    difficulty: "Very High",
    focus: "Senior-level, Freedom & Responsibility",
    known_for: "High autonomy culture. Keeper test mentality.",
    rounds: ["Technical", "Culture", "Cross-functional"],
  },
  Startups: {
    color: "#10B981",
    emoji: "🚀",
    gradient: ["#10B981", "#059669"],
    difficulty: "Medium",
    focus: "Full-stack, Speed, Product thinking",
    known_for: "Practical coding. Attitude over pure DSA.",
    rounds: ["Live Coding", "Product", "Culture Fit"],
  },
  Other: {
    color: "#8B5CF6",
    emoji: "🏢",
    gradient: ["#8B5CF6", "#6366F1"],
    difficulty: "Varies",
    focus: "General interview skills",
    known_for: "Standard interview process with behavioral and technical rounds.",
    rounds: ["Technical", "Behavioral", "Culture Fit"],
    isCustom: true,
  },
};

// ─── INDUSTRY DATA ────────────────────────────────────────────────────────────
const INDUSTRIES: Record<string, IndustryProfile> = {
  tech: {
    name: "Technology",
    emoji: "💻",
    color: "#3B82F6",
    focus: "Software development, system design, algorithms",
    companies: ["Salesforce", "Adobe", "Oracle", "SAP", "VMware", "Atlassian"],
  },
  fintech: {
    name: "FinTech & Banking",
    emoji: "🏦",
    color: "#10B981",
    focus: "Financial systems, security, compliance, trading platforms",
    companies: ["Stripe", "Square", "PayPal", "Robinhood", "Plaid", "Goldman Sachs"],
  },
  ecommerce: {
    name: "E-Commerce & Retail",
    emoji: "🛒",
    color: "#F59E0B",
    focus: "Scalable systems, inventory, payments, user experience",
    companies: ["Shopify", "Walmart", "Target", "eBay", "Etsy", "Instacart"],
  },
  healthcare: {
    name: "Healthcare & Biotech",
    emoji: "🏥",
    color: "#EF4444",
    focus: "HIPAA compliance, data privacy, reliability, patient safety",
    companies: ["Epic", "Cerner", "Moderna", "Pfizer", "UnitedHealth"],
  },
  gaming: {
    name: "Gaming & Entertainment",
    emoji: "🎮",
    color: "#8B5CF6",
    focus: "Real-time systems, graphics, multiplayer, performance",
    companies: ["EA", "Activision", "Riot Games", "Epic Games", "Unity"],
  },
  automotive: {
    name: "Automotive & Mobility",
    emoji: "🚗",
    color: "#06B6D4",
    focus: "Embedded systems, safety-critical software, IoT",
    companies: ["Tesla", "Waymo", "Cruise", "Rivian", "Ford", "GM"],
  },
  cloud: {
    name: "Cloud & Infrastructure",
    emoji: "☁️",
    color: "#6366F1",
    focus: "Distributed systems, DevOps, reliability, scalability",
    companies: ["AWS", "Azure", "GCP", "Cloudflare", "Datadog", "Snowflake"],
  },
  ai_ml: {
    name: "AI & Machine Learning",
    emoji: "🤖",
    color: "#EC4899",
    focus: "ML systems, data pipelines, model deployment, research",
    companies: ["OpenAI", "Anthropic", "DeepMind", "Hugging Face", "Scale AI"],
  },
  social: {
    name: "Social Media & Content",
    emoji: "📱",
    color: "#F472B6",
    focus: "Content delivery, recommendation systems, real-time features",
    companies: ["TikTok", "Snap", "Twitter/X", "Pinterest", "Reddit", "Discord"],
  },
  consulting: {
    name: "Consulting & Services",
    emoji: "💼",
    color: "#64748B",
    focus: "Client management, problem-solving, communication",
    companies: ["McKinsey", "BCG", "Accenture", "Deloitte", "Capgemini"],
  },
  cybersecurity: {
    name: "Cybersecurity",
    emoji: "🔒",
    color: "#DC2626",
    focus: "Security protocols, threat detection, encryption, compliance",
    companies: ["CrowdStrike", "Palo Alto Networks", "Okta", "Fortinet"],
  },
  edtech: {
    name: "EdTech & Learning",
    emoji: "📚",
    color: "#22C55E",
    focus: "Learning platforms, content delivery, accessibility",
    companies: ["Coursera", "Udemy", "Duolingo", "Khan Academy", "Chegg"],
  },
  travel: {
    name: "Travel & Hospitality",
    emoji: "✈️",
    color: "#0EA5E9",
    focus: "Booking systems, real-time availability, geolocation",
    companies: ["Airbnb", "Booking.com", "Expedia", "Uber", "Lyft", "DoorDash"],
  },
  media: {
    name: "Media & Streaming",
    emoji: "🎥",
    color: "#A855F7",
    focus: "Content delivery, streaming, recommendation engines",
    companies: ["Spotify", "Hulu", "Disney+", "HBO Max", "Twitch"],
  },
  telecom: {
    name: "Telecom & Networking",
    emoji: "📡",
    color: "#14B8A6",
    focus: "Network infrastructure, 5G, protocols, reliability",
    companies: ["Cisco", "Qualcomm", "Ericsson", "Nokia", "Verizon", "AT&T"],
  },
};

const FEATURED_COMPANIES = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", "Startups", "Other"];

const ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "ML Engineer",
  "DevOps / SRE",
  "iOS Developer",
  "Android Developer",
  "Product Manager",
  "Data Engineer",
  "QA Engineer",
  "Security Engineer",
  "Solutions Architect",
  "Engineering Manager",
];

const EXPERIENCE_LEVELS = [
  { label: "Fresher", value: "Fresher (0-1y)", icon: "🌱", years: "0-1 years" },
  { label: "Junior", value: "Junior (1-3y)", icon: "📚", years: "1-3 years" },
  { label: "Mid-level", value: "Mid-level (3-6y)", icon: "💼", years: "3-6 years" },
  { label: "Senior", value: "Senior (6+y)", icon: "⭐", years: "6+ years" },
];

// ─── VOCABULARY ANALYSIS ──────────────────────────────────────────────────────
const POWER_WORDS = [
  "implemented", "designed", "led", "architected", "optimized", "scaled",
  "improved", "achieved", "increased", "decreased", "automated", "built",
  "developed", "created", "managed", "delivered", "launched", "reduced",
  "streamlined", "transformed", "innovated", "collaborated", "mentored",
  "analyzed", "resolved", "enhanced", "established", "executed", "spearheaded",
];

const FILLER_WORDS = [
  "um", "uh", "like", "you know", "basically", "actually", "literally",
  "kind of", "sort of", "i mean", "right", "so yeah", "anyway",
];

const TECHNICAL_TERMS = [
  "api", "database", "algorithm", "complexity", "scalability", "microservices",
  "cache", "latency", "throughput", "distributed", "concurrent", "async",
  "rest", "graphql", "sql", "nosql", "kubernetes", "docker", "ci/cd",
  "testing", "deployment", "monitoring", "logging", "security", "authentication",
  "react", "node", "python", "java", "typescript", "javascript", "aws", "azure",
];

// ─── COLORS ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#0A0A0F",
  surface: "#14141C",
  surface2: "#1C1C28",
  surface3: "#252532",
  border: "rgba(255,255,255,0.08)",
  borderLight: "rgba(255,255,255,0.12)",
  text: "#F8FAFC",
  textSecondary: "#94A3B8",
  muted: "#64748B",
  primary: "#8B5CF6",
  primaryLight: "#A78BFA",
  primaryDark: "#7C3AED",
  secondary: "#06B6D4",
  success: "#10B981",
  successLight: "#34D399",
  warning: "#F59E0B",
  warningLight: "#FBBF24",
  error: "#EF4444",
  errorLight: "#F87171",
  info: "#3B82F6",
  voice: "#EC4899",
  voiceLight: "#F472B6",
};

const TYPE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  technical: { bg: "rgba(59,130,246,0.12)", text: "#60A5FA", border: "rgba(59,130,246,0.25)" },
  coding: { bg: "rgba(239,68,68,0.12)", text: "#F87171", border: "rgba(239,68,68,0.25)" },
  system: { bg: "rgba(139,92,246,0.12)", text: "#A78BFA", border: "rgba(139,92,246,0.25)" },
  behavioral: { bg: "rgba(245,158,11,0.12)", text: "#FBBF24", border: "rgba(245,158,11,0.25)" },
  hr: { bg: "rgba(16,185,129,0.12)", text: "#34D399", border: "rgba(16,185,129,0.25)" },
};

// ─── QUESTION TEMPLATES ───────────────────────────────────────────────────────
// Generic questions that can be customized for any company/industry
const GENERIC_QUESTIONS = {
  behavioral: [
    {
      question: "Tell me about yourself and your career journey so far.",
      why_asked: "Understand your background and how you present yourself.",
      hint: "2-minute summary: education, experience, key achievements, why this role.",
      ideal_answer: "Concise career narrative highlighting relevant experience and genuine interest.",
    },
    {
      question: "Describe a challenging project you worked on. What made it difficult and how did you overcome the challenges?",
      why_asked: "Assess problem-solving abilities and resilience.",
      hint: "Use STAR method. Focus on YOUR specific contributions and learnings.",
      ideal_answer: "Clear challenge, systematic approach, specific actions taken, measurable outcome.",
    },
    {
      question: "Tell me about a time you had a conflict with a colleague. How did you handle it?",
      why_asked: "Evaluate interpersonal skills and conflict resolution.",
      hint: "Focus on constructive resolution, empathy, and maintaining professionalism.",
      ideal_answer: "Situation with clear resolution, showing emotional intelligence and positive outcome.",
    },
    {
      question: "Describe a situation where you had to learn something new quickly. How did you approach it?",
      why_asked: "Assess learning agility and adaptability.",
      hint: "Show systematic learning approach, resources used, and successful application.",
      ideal_answer: "Clear learning strategy, proactive approach, successful implementation.",
    },
    {
      question: "Tell me about a time you failed. What did you learn from it?",
      why_asked: "Evaluate self-awareness and growth mindset.",
      hint: "Be honest about failure, focus on learning and how you've applied it since.",
      ideal_answer: "Genuine failure with accountability, deep reflection, concrete changes made.",
    },
    {
      question: "Describe a time when you went above and beyond what was expected.",
      why_asked: "Assess initiative and dedication.",
      hint: "Show intrinsic motivation, not just completing tasks but adding value.",
      ideal_answer: "Clear example of extra effort with positive impact on team/company.",
    },
    {
      question: "How do you prioritize when you have multiple urgent tasks?",
      why_asked: "Evaluate time management and decision-making.",
      hint: "Describe your framework: urgency vs importance, stakeholder communication.",
      ideal_answer: "Systematic approach with clear criteria, communication with stakeholders.",
    },
    {
      question: "Tell me about a time you influenced someone without direct authority.",
      why_asked: "Assess leadership and persuasion skills.",
      hint: "Show data-driven persuasion, relationship building, finding common ground.",
      ideal_answer: "Clear influence strategy, respectful approach, successful outcome.",
    },
  ],
  technical: [
    {
      question: "Explain a complex technical concept to me as if I were non-technical.",
      why_asked: "Assess communication skills and depth of understanding.",
      hint: "Use analogies, avoid jargon, check for understanding.",
      ideal_answer: "Clear explanation using relatable examples, appropriate level of detail.",
    },
    {
      question: "What's your debugging process when something isn't working?",
      why_asked: "Evaluate systematic problem-solving approach.",
      hint: "Describe step-by-step process: reproduce, isolate, identify, fix, verify.",
      ideal_answer: "Systematic methodology showing logical thinking and thoroughness.",
    },
    {
      question: "How do you stay updated with new technologies and industry trends?",
      why_asked: "Assess continuous learning mindset.",
      hint: "Mention specific resources, communities, side projects, or courses.",
      ideal_answer: "Multiple learning channels, genuine curiosity, practical application.",
    },
    {
      question: "Describe the architecture of a project you've worked on. What were the key design decisions?",
      why_asked: "Assess technical depth and architectural thinking.",
      hint: "Explain tradeoffs, scalability considerations, why specific choices were made.",
      ideal_answer: "Clear architecture explanation with justified decisions and tradeoffs.",
    },
    {
      question: "How do you approach code reviews? What do you look for?",
      why_asked: "Evaluate quality mindset and collaboration.",
      hint: "Mention readability, correctness, performance, security, best practices.",
      ideal_answer: "Comprehensive review criteria with focus on learning and improvement.",
    },
    {
      question: "Tell me about a time you had to optimize something for performance.",
      why_asked: "Assess optimization skills and measurement approach.",
      hint: "Describe profiling, bottleneck identification, solution, and impact measurement.",
      ideal_answer: "Data-driven optimization with clear before/after metrics.",
    },
  ],
  system: [
    {
      question: "Design a URL shortening service. How would you handle millions of requests?",
      why_asked: "Test basic system design skills and scalability thinking.",
      hint: "Cover: unique ID generation, database choice, caching, analytics.",
      ideal_answer: "Scalable architecture with proper data modeling and caching strategy.",
    },
    {
      question: "How would you design a notification system for a mobile app?",
      why_asked: "Assess understanding of distributed systems and user experience.",
      hint: "Consider: push vs pull, delivery guarantees, user preferences, scaling.",
      ideal_answer: "Robust system handling different channels with reliability and personalization.",
    },
    {
      question: "Design a rate limiter. What algorithms would you use?",
      why_asked: "Test knowledge of common system components.",
      hint: "Discuss: token bucket, sliding window, distributed coordination.",
      ideal_answer: "Multiple approaches with tradeoffs, distributed system considerations.",
    },
    {
      question: "How would you design a real-time chat application?",
      why_asked: "Assess understanding of real-time systems.",
      hint: "Cover: WebSockets, message ordering, presence, offline support, scaling.",
      ideal_answer: "Real-time architecture with proper message delivery and user experience.",
    },
  ],
  coding: [
    {
      question: "Given an array of integers, find two numbers that sum to a target. What's the optimal approach?",
      why_asked: "Test basic algorithm optimization skills.",
      hint: "Hash map approach for O(n) time complexity.",
      ideal_answer: "Optimal solution with clear time/space complexity analysis.",
    },
    {
      question: "How would you implement a cache with LRU eviction policy?",
      why_asked: "Test data structure knowledge and implementation skills.",
      hint: "HashMap + Doubly Linked List for O(1) operations.",
      ideal_answer: "Correct implementation with explanation of why this approach works.",
    },
    {
      question: "Write a function to detect if a linked list has a cycle.",
      why_asked: "Test pointer manipulation and algorithm knowledge.",
      hint: "Floyd's cycle detection (tortoise and hare).",
      ideal_answer: "Optimal O(1) space solution with clear explanation.",
    },
    {
      question: "How would you implement a function to flatten a nested array?",
      why_asked: "Test recursion and problem decomposition.",
      hint: "Recursive or iterative with stack approach.",
      ideal_answer: "Clean implementation handling arbitrary depth with edge cases.",
    },
  ],
  hr: [
    {
      question: "Why are you interested in this role and our company?",
      why_asked: "Assess genuine interest and research.",
      hint: "Show specific knowledge about the company, align with your career goals.",
      ideal_answer: "Genuine enthusiasm with specific company knowledge and career alignment.",
    },
    {
      question: "Where do you see yourself in 5 years?",
      why_asked: "Understand career aspirations and retention potential.",
      hint: "Show ambition while being realistic and flexible.",
      ideal_answer: "Clear growth vision aligned with company's trajectory.",
    },
    {
      question: "What are your salary expectations?",
      why_asked: "Understand compensation alignment.",
      hint: "Research market rates, give a range, express flexibility.",
      ideal_answer: "Researched range with openness to discussion.",
    },
    {
      question: "What questions do you have for us?",
      why_asked: "Assess engagement and critical thinking.",
      hint: "Ask about team, culture, challenges, growth opportunities.",
      ideal_answer: "Thoughtful questions showing genuine interest and due diligence.",
    },
    {
      question: "What's your ideal work environment?",
      why_asked: "Assess cultural fit.",
      hint: "Be honest while connecting to what you know about their culture.",
      ideal_answer: "Clear preferences with flexibility and cultural awareness.",
    },
  ],
};

// Industry-specific question additions
const INDUSTRY_QUESTIONS: Record<string, Partial<typeof GENERIC_QUESTIONS>> = {
  fintech: {
    technical: [
      {
        question: "How would you ensure security and compliance in a financial application?",
        why_asked: "Critical for any fintech role - understanding of regulations.",
        hint: "Cover: encryption, authentication, PCI-DSS, audit trails, fraud detection.",
        ideal_answer: "Comprehensive security approach with regulatory compliance awareness.",
      },
      {
        question: "Explain how you would handle concurrent transactions to prevent race conditions.",
        why_asked: "Critical for financial systems accuracy.",
        hint: "Discuss: locks, transactions, idempotency, eventual consistency vs strong consistency.",
        ideal_answer: "Clear understanding of concurrency patterns in financial contexts.",
      },
    ],
    system: [
      {
        question: "Design a payment processing system. How do you ensure reliability?",
        why_asked: "Core fintech challenge.",
        hint: "Cover: idempotency, retry logic, reconciliation, audit trails.",
        ideal_answer: "Robust design with proper error handling and compliance considerations.",
      },
    ],
  },
  healthcare: {
    technical: [
      {
        question: "How would you handle sensitive patient data in a healthcare application?",
        why_asked: "HIPAA compliance is critical.",
        hint: "Cover: encryption, access controls, audit logging, de-identification.",
        ideal_answer: "Comprehensive approach to data privacy with HIPAA awareness.",
      },
      {
        question: "How do you ensure high availability for a critical healthcare system?",
        why_asked: "Patient safety depends on system reliability.",
        hint: "Discuss: redundancy, failover, monitoring, disaster recovery.",
        ideal_answer: "Robust reliability strategy with healthcare-specific considerations.",
      },
    ],
  },
  gaming: {
    technical: [
      {
        question: "How would you handle real-time multiplayer game synchronization?",
        why_asked: "Core gaming challenge.",
        hint: "Discuss: client prediction, server reconciliation, lag compensation.",
        ideal_answer: "Understanding of netcode patterns and player experience.",
      },
      {
        question: "How do you optimize game performance for different devices?",
        why_asked: "Gaming requires performance optimization.",
        hint: "Cover: profiling, LOD, memory management, rendering optimization.",
        ideal_answer: "Systematic optimization approach with measurement.",
      },
    ],
  },
  ai_ml: {
    technical: [
      {
        question: "How would you deploy and monitor a machine learning model in production?",
        why_asked: "MLOps is critical for ML roles.",
        hint: "Cover: model serving, A/B testing, monitoring drift, retraining pipelines.",
        ideal_answer: "End-to-end MLOps understanding with production considerations.",
      },
      {
        question: "How do you handle bias in ML models?",
        why_asked: "Ethical AI is increasingly important.",
        hint: "Discuss: bias detection, fairness metrics, mitigation strategies.",
        ideal_answer: "Awareness of bias issues with practical mitigation approaches.",
      },
    ],
  },
  cybersecurity: {
    technical: [
      {
        question: "Walk me through how you would respond to a security incident.",
        why_asked: "Incident response is core to security roles.",
        hint: "Cover: detection, containment, eradication, recovery, lessons learned.",
        ideal_answer: "Structured incident response with communication considerations.",
      },
      {
        question: "How would you perform a security assessment of an application?",
        why_asked: "Security assessment skills are essential.",
        hint: "Discuss: threat modeling, vulnerability scanning, penetration testing.",
        ideal_answer: "Comprehensive assessment methodology with prioritization.",
      },
    ],
  },
  cloud: {
    technical: [
      {
        question: "How would you migrate a legacy application to the cloud?",
        why_asked: "Common cloud engineering challenge.",
        hint: "Cover: assessment, strategy (rehost/refactor), testing, rollout.",
        ideal_answer: "Structured migration approach with risk mitigation.",
      },
      {
        question: "How do you optimize cloud costs while maintaining performance?",
        why_asked: "FinOps is important for cloud roles.",
        hint: "Discuss: right-sizing, reserved instances, spot instances, monitoring.",
        ideal_answer: "Data-driven cost optimization with performance awareness.",
      },
    ],
  },
};

// Company-specific questions (for featured companies)
const COMPANY_QUESTIONS: Record<string, Question[]> = {
  Google: [
    {
      id: 1,
      question: "Tell me about yourself and why you're interested in joining Google.",
      type: "behavioral",
      difficulty: "Easy",
      why_asked: "Google wants to understand your motivation and fit with Googleyness.",
      hint: "2 minutes max. Focus on relevant experience and genuine passion for Google's mission.",
      ideal_answer: "Concise career summary with specific Google products/values that resonate.",
      lp: null,
    },
    {
      id: 2,
      question: "Given an array of integers, find two numbers that add up to a target sum. Optimize for time complexity.",
      type: "coding",
      difficulty: "Medium",
      why_asked: "Classic Google algorithm question testing hash map optimization.",
      hint: "Use a hash set for O(n) time. Handle edge cases like duplicates.",
      ideal_answer: "O(n) solution using hash map with clear complexity analysis.",
      lp: null,
    },
    {
      id: 3,
      question: "Design YouTube's video recommendation system. How would you handle billions of users?",
      type: "system",
      difficulty: "Hard",
      why_asked: "Tests system design at Google scale with ML components.",
      hint: "Consider: collaborative filtering, content-based, cold start, real-time updates.",
      ideal_answer: "Hybrid ML approach with efficient serving and A/B testing framework.",
      lp: null,
    },
    {
      id: 4,
      question: "Tell me about a time you had to push back on a decision. What was the outcome?",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Google values people who can respectfully challenge ideas.",
      hint: "Use STAR. Show data-driven disagreement and commitment to final decision.",
      ideal_answer: "Specific example showing healthy debate while remaining collaborative.",
      lp: null,
    },
    {
      id: 5,
      question: "What technology trend are you most excited about and why?",
      type: "hr",
      difficulty: "Easy",
      why_asked: "Tests passion for technology and strategic thinking.",
      hint: "Pick something you genuinely care about with nuanced view.",
      ideal_answer: "Thoughtful analysis of trend with applications to Google's products.",
      lp: null,
    },
  ],
  Amazon: [
    {
      id: 1,
      question: "Tell me about a time you went above and beyond for a customer.",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Tests Customer Obsession - Amazon's #1 leadership principle.",
      hint: "Use STAR. Focus on understanding deep customer needs.",
      ideal_answer: "Specific example with measurable positive customer outcome.",
      lp: "Customer Obsession",
    },
    {
      id: 2,
      question: "Design an inventory management system for Amazon warehouses.",
      type: "system",
      difficulty: "Hard",
      why_asked: "Amazon needs engineers who understand e-commerce scale.",
      hint: "Consider: real-time tracking, distributed databases, consistency tradeoffs.",
      ideal_answer: "Distributed architecture with proper partitioning and real-time sync.",
      lp: "Think Big",
    },
    {
      id: 3,
      question: "Tell me about a time you took ownership of something outside your responsibility.",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Tests Ownership - leaders never say 'that's not my job'.",
      hint: "Show initiative and end-to-end ownership without being asked.",
      ideal_answer: "Clear ownership story with measurable impact.",
      lp: "Ownership",
    },
    {
      id: 4,
      question: "Implement an LRU cache with O(1) get and put operations.",
      type: "coding",
      difficulty: "Medium",
      why_asked: "Common Amazon coding question testing data structures.",
      hint: "HashMap + Doubly Linked List combination.",
      ideal_answer: "Correct implementation with edge case handling.",
      lp: null,
    },
    {
      id: 5,
      question: "Tell me about a time you made a decision with incomplete data.",
      type: "behavioral",
      difficulty: "Hard",
      why_asked: "Tests Bias for Action - speed matters in business.",
      hint: "Show calculated risk-taking and willingness to course-correct.",
      ideal_answer: "Quick data gathering, reasoned decision, outcome and learnings.",
      lp: "Bias for Action",
    },
  ],
  Microsoft: [
    {
      id: 1,
      question: "Tell me about a time you failed. What did you learn?",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Microsoft values growth mindset.",
      hint: "Be genuine. Focus on learnings and how you applied them.",
      ideal_answer: "Honest failure with accountability, reflection, and growth.",
      lp: null,
    },
    {
      id: 2,
      question: "Design an object-oriented parking lot system.",
      type: "system",
      difficulty: "Medium",
      why_asked: "Microsoft loves OOP design questions.",
      hint: "Use inheritance, interfaces, SOLID principles.",
      ideal_answer: "Clean class hierarchy with extensible design.",
      lp: null,
    },
    {
      id: 3,
      question: "Reverse a linked list iteratively and recursively. Analyze space complexity.",
      type: "coding",
      difficulty: "Medium",
      why_asked: "Tests fundamental data structure understanding.",
      hint: "Iterative: O(1) space. Recursive: O(n) call stack.",
      ideal_answer: "Both solutions with clear complexity analysis.",
      lp: null,
    },
    {
      id: 4,
      question: "Describe working with people who had different working styles.",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Tests collaboration and adaptability.",
      hint: "Show empathy and finding common ground.",
      ideal_answer: "Specific example of adapting and effective collaboration.",
      lp: null,
    },
    {
      id: 5,
      question: "How would you improve Microsoft Teams?",
      type: "hr",
      difficulty: "Easy",
      why_asked: "Tests product thinking and Microsoft knowledge.",
      hint: "Identify real pain points with thoughtful solutions.",
      ideal_answer: "Specific improvement with user benefit and tradeoffs.",
      lp: null,
    },
  ],
  Meta: [
    {
      id: 1,
      question: "Given a binary tree, return the level order traversal of nodes.",
      type: "coding",
      difficulty: "Medium",
      why_asked: "Meta asks fast-paced coding. BFS is fundamental.",
      hint: "Use a queue, process level by level.",
      ideal_answer: "BFS with queue, O(n) time and space.",
      lp: null,
    },
    {
      id: 2,
      question: "Find minimum parentheses to remove for valid string.",
      type: "coding",
      difficulty: "Medium",
      why_asked: "String manipulation is common at Meta.",
      hint: "Track unmatched opening and closing separately.",
      ideal_answer: "O(n) solution with clear logic.",
      lp: null,
    },
    {
      id: 3,
      question: "Design Instagram's news feed with ranking and personalization.",
      type: "system",
      difficulty: "Hard",
      why_asked: "Meta expects deep understanding of social systems.",
      hint: "Consider: ML ranking, caching, push vs pull, viral content.",
      ideal_answer: "Hybrid model with ML ranking and efficient caching.",
      lp: null,
    },
    {
      id: 4,
      question: "Tell me about a time you moved fast and broke things. How did you handle it?",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Tests alignment with Meta's culture.",
      hint: "Show bias for action but also accountability.",
      ideal_answer: "Fast decision, owned outcome, quick recovery, safeguards added.",
      lp: null,
    },
    {
      id: 5,
      question: "Why Meta? What impact do you want to have?",
      type: "hr",
      difficulty: "Easy",
      why_asked: "Tests genuine interest and mission alignment.",
      hint: "Research Meta's products and mission specifically.",
      ideal_answer: "Genuine connection with specific impact goals.",
      lp: null,
    },
  ],
  Apple: [
    {
      id: 1,
      question: "Tell me about a product you love. How would you improve it?",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Apple tests product intuition and attention to detail.",
      hint: "Pick something you use. Focus on specific, thoughtful improvements.",
      ideal_answer: "Deep understanding with specific UX improvements and tradeoffs.",
      lp: null,
    },
    {
      id: 2,
      question: "How would you optimize battery life for an app needing frequent location updates?",
      type: "technical",
      difficulty: "Hard",
      why_asked: "Apple cares deeply about device performance.",
      hint: "Significant location changes, geofencing, adaptive accuracy.",
      ideal_answer: "Multiple optimization strategies with tradeoff analysis.",
      lp: null,
    },
    {
      id: 3,
      question: "Implement a thread-safe singleton. What are potential pitfalls?",
      type: "coding",
      difficulty: "Medium",
      why_asked: "Tests concurrency understanding.",
      hint: "dispatch_once or static let in Swift.",
      ideal_answer: "Correct implementation with thread safety discussion.",
      lp: null,
    },
    {
      id: 4,
      question: "Describe defending a design decision against pushback.",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Apple values people who care about their work.",
      hint: "Show conviction backed by reasoning, but openness to feedback.",
      ideal_answer: "Clear rationale with constructive handling of disagreement.",
      lp: null,
    },
    {
      id: 5,
      question: "What does craftsmanship mean to you in software development?",
      type: "hr",
      difficulty: "Easy",
      why_asked: "Apple's culture centers on quality.",
      hint: "Connect your values to Apple's focus on polish.",
      ideal_answer: "Personal philosophy with examples of attention to detail.",
      lp: null,
    },
  ],
  Netflix: [
    {
      id: 1,
      question: "Design a chaos engineering platform for testing microservices resilience.",
      type: "system",
      difficulty: "Hard",
      why_asked: "Netflix pioneered chaos engineering.",
      hint: "Blast radius, automated rollback, monitoring, gradual rollout.",
      ideal_answer: "Safe failure injection with proper guardrails.",
      lp: null,
    },
    {
      id: 2,
      question: "Tell me about taking full ownership of a critical system.",
      type: "behavioral",
      difficulty: "Hard",
      why_asked: "Netflix expects full ownership from engineers.",
      hint: "End-to-end ownership, proactive improvement, on-call.",
      ideal_answer: "Complete ownership with reliability improvements.",
      lp: null,
    },
    {
      id: 3,
      question: "How would you handle strongly disagreeing with your team's direction?",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Tests Netflix's candor culture.",
      hint: "Direct communication, willingness to disagree, then commit.",
      ideal_answer: "Direct, respectful disagreement with commitment.",
      lp: null,
    },
    {
      id: 4,
      question: "Design Netflix's video encoding pipeline for different devices.",
      type: "system",
      difficulty: "Hard",
      why_asked: "Core Netflix infrastructure.",
      hint: "Adaptive bitrate, per-title encoding, device profiles.",
      ideal_answer: "Comprehensive pipeline with adaptive streaming.",
      lp: null,
    },
    {
      id: 5,
      question: "Give an example of Freedom and Responsibility in your work.",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Core Netflix cultural principle.",
      hint: "Autonomous decision-making with accountability.",
      ideal_answer: "Freedom exercised responsibly with positive outcome.",
      lp: null,
    },
  ],
  Startups: [
    {
      id: 1,
      question: "Build a REST API for task management. What tech stack and why?",
      type: "coding",
      difficulty: "Medium",
      why_asked: "Startups need practical full-stack skills.",
      hint: "Consider speed of development, scalability, team familiarity.",
      ideal_answer: "Justified stack choice with proper API design.",
      lp: null,
    },
    {
      id: 2,
      question: "Limited runway. How would you decide what to build for MVP?",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Startups need product-minded engineers.",
      hint: "User research, impact vs effort, iterative approach.",
      ideal_answer: "Clear prioritization framework with user focus.",
      lp: null,
    },
    {
      id: 3,
      question: "Tell me about wearing multiple hats and managing competing priorities.",
      type: "behavioral",
      difficulty: "Medium",
      why_asked: "Startup roles require flexibility.",
      hint: "Show adaptability and successful delivery across areas.",
      ideal_answer: "Concrete example of juggling responsibilities.",
      lp: null,
    },
    {
      id: 4,
      question: "Our app is slow. Walk through diagnosing and fixing performance.",
      type: "technical",
      difficulty: "Medium",
      why_asked: "Practical debugging and optimization skills.",
      hint: "Profiling, DB queries, network, rendering, memory.",
      ideal_answer: "Systematic approach with common optimizations.",
      lp: null,
    },
    {
      id: 5,
      question: "Why startup instead of big tech? What excites you?",
      type: "hr",
      difficulty: "Easy",
      why_asked: "Cultural fit is crucial.",
      hint: "Show you understand tradeoffs and are excited.",
      ideal_answer: "Authentic motivation with self-awareness.",
      lp: null,
    },
  ],
};

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const generateQuestionsForCompany = (
  company: string,
  industry: string | null,
  role: string,
  customCompanyName?: string
): Question[] => {
  // For featured companies, use predefined questions
  if (COMPANY_QUESTIONS[company]) {
    return COMPANY_QUESTIONS[company];
  }

  // For custom companies, generate questions based on industry and role
  const displayName = customCompanyName || company;
  const industryData = industry ? INDUSTRIES[industry] : null;
  const industryQuestions = industry ? INDUSTRY_QUESTIONS[industry] : null;

  const questions: Question[] = [];
  let id = 1;

  // Add a behavioral intro question
  const introQ = GENERIC_QUESTIONS.behavioral[0];
  questions.push({
    id: id++,
    question: `Tell me about yourself and why you're interested in joining ${displayName}.`,
    type: "behavioral",
    difficulty: "Easy",
    why_asked: introQ.why_asked,
    hint: introQ.hint,
    ideal_answer: introQ.ideal_answer,
    lp: null,
  });

  // Add industry-specific technical question if available
  if (industryQuestions?.technical?.[0]) {
    const techQ = industryQuestions.technical[0];
    questions.push({
      id: id++,
      question: techQ.question,
      type: "technical",
      difficulty: "Medium" as Difficulty,
      why_asked: techQ.why_asked,
      hint: techQ.hint,
      ideal_answer: techQ.ideal_answer,
      lp: null,
    });
  } else {
    // Use generic technical question
    const techQ = GENERIC_QUESTIONS.technical[1];
    questions.push({
      id: id++,
      question: techQ.question,
      type: "technical",
      difficulty: "Medium",
      why_asked: techQ.why_asked,
      hint: techQ.hint,
      ideal_answer: techQ.ideal_answer,
      lp: null,
    });
  }

  // Add system design question
  const sysQ = industryQuestions?.system?.[0] || GENERIC_QUESTIONS.system[0];
  questions.push({
    id: id++,
    question: sysQ.question,
    type: "system",
    difficulty: "Hard",
    why_asked: sysQ.why_asked,
    hint: sysQ.hint,
    ideal_answer: sysQ.ideal_answer,
    lp: null,
  });

  // Add behavioral question
  const behavQ = GENERIC_QUESTIONS.behavioral[2];
  questions.push({
    id: id++,
    question: behavQ.question,
    type: "behavioral",
    difficulty: "Medium",
    why_asked: behavQ.why_asked,
    hint: behavQ.hint,
    ideal_answer: behavQ.ideal_answer,
    lp: null,
  });

  // Add HR question
  const hrQ = GENERIC_QUESTIONS.hr[0];
  questions.push({
    id: id++,
    question: `Why are you interested in ${displayName}? What excites you about this opportunity?`,
    type: "hr",
    difficulty: "Easy",
    why_asked: hrQ.why_asked,
    hint: hrQ.hint,
    ideal_answer: hrQ.ideal_answer,
    lp: null,
  });

  return questions;
};

const analyzeText = (text: string) => {
  const lower = text.toLowerCase();
  const words = lower.split(/\s+/).filter(w => w.length > 2);
  
  const foundPowerWords = POWER_WORDS.filter(pw => lower.includes(pw));
  const foundTechnical = TECHNICAL_TERMS.filter(tt => lower.includes(tt));
  const fillerCount = FILLER_WORDS.reduce((count, fw) => {
    const regex = new RegExp(`\\b${fw}\\b`, 'gi');
    return count + (lower.match(regex) || []).length;
  }, 0);

  const uniqueWords = new Set(words).size;
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / (words.length || 1);
  
  let vocabScore = 50;
  vocabScore += Math.min(20, foundPowerWords.length * 5);
  vocabScore += Math.min(15, foundTechnical.length * 3);
  vocabScore += Math.min(10, (uniqueWords / (words.length || 1)) * 20);
  vocabScore += Math.min(5, (avgWordLength - 4) * 2);
  vocabScore -= fillerCount * 3;

  return {
    vocabulary: Math.min(100, Math.max(0, Math.round(vocabScore))),
    powerWords: foundPowerWords,
    technicalTerms: foundTechnical,
    fillerCount,
  };
};

const analyzeVoiceRecording = (duration: number): VoiceMetrics => {
  let confidence = 70;
  if (duration >= 30 && duration <= 180) {
    confidence = 75 + Math.random() * 20;
  } else if (duration < 30) {
    confidence = 50 + Math.random() * 15;
  } else {
    confidence = 60 + Math.random() * 15;
  }

  const clarity = 65 + Math.random() * 30;

  let pace = "moderate";
  if (duration < 20) pace = "too fast";
  else if (duration > 180) pace = "too slow";
  else if (duration < 45) pace = "slightly fast";
  else if (duration > 120) pace = "slightly slow";

  return {
    duration,
    confidence: Math.round(confidence),
    clarity: Math.round(clarity),
    pace,
  };
};

const generateEvaluation = (
  questions: Question[],
  answers: Record<number, AnswerData>,
  company: string
): Evaluation => {
  const scores: ScoreItem[] = [];
  let totalVoiceConfidence = 0;
  let voiceAnswerCount = 0;
  let totalVocabulary = 0;

  questions.forEach((q) => {
    const answerData = answers[q.id];
    const text = answerData?.text ?? "";
    const voiceMetrics = answerData?.voiceMetrics;
    
    const textAnalysis = analyzeText(text);
    totalVocabulary += textAnalysis.vocabulary;

    let score = 5;
    const length = text.length;

    if (length > 400) score = 8 + Math.random();
    else if (length > 250) score = 7 + Math.random();
    else if (length > 150) score = 6 + Math.random();
    else if (length > 80) score = 5 + Math.random();
    else if (length > 30) score = 4 + Math.random();
    else score = 2 + Math.random();

    score += textAnalysis.powerWords.length * 0.2;
    score += textAnalysis.technicalTerms.length * 0.15;
    score -= textAnalysis.fillerCount * 0.1;

    if (voiceMetrics) {
      totalVoiceConfidence += voiceMetrics.confidence;
      voiceAnswerCount++;
      score += (voiceMetrics.confidence - 50) * 0.02;
    }

    score = Math.min(10, Math.max(1, score));

    let feedback = "";
    if (score >= 8) {
      feedback = "Excellent response! Well-structured with specific examples and clear communication.";
    } else if (score >= 6) {
      feedback = "Good answer. Consider adding more specific metrics or examples to strengthen it.";
    } else if (score >= 4) {
      feedback = "Adequate response but needs more depth. Use the STAR method for behavioral questions.";
    } else {
      feedback = "Response is too brief. Elaborate with specific examples and demonstrate your expertise.";
    }

    let voiceFeedback;
    if (voiceMetrics) {
      if (voiceMetrics.confidence >= 80) {
        voiceFeedback = "Confident delivery with good pacing.";
      } else if (voiceMetrics.confidence >= 60) {
        voiceFeedback = "Decent delivery. Work on maintaining steady pace.";
      } else {
        voiceFeedback = "Practice speaking more confidently.";
      }
    }

    scores.push({
      id: q.id,
      score: Math.round(score * 10) / 10,
      feedback,
      voiceFeedback,
    });
  });

  const avgScore = scores.reduce((a, b) => a + b.score, 0) / scores.length;
  const overall = Math.round(avgScore * 10);
  const avgVocabulary = Math.round(totalVocabulary / questions.length);
  const avgVoiceConfidence = voiceAnswerCount > 0 
    ? Math.round(totalVoiceConfidence / voiceAnswerCount) 
    : 0;

  const skill_breakdown = {
    technical_depth: {
      score: Math.min(100, Math.round(overall * (0.85 + Math.random() * 0.3))),
      comment: overall >= 70 
        ? "Strong technical foundation demonstrated."
        : "Consider deepening technical explanations.",
    },
    communication: {
      score: avgVocabulary,
      comment: avgVocabulary >= 70
        ? "Clear and professional communication style."
        : "Work on using more impactful language.",
    },
    problem_solving: {
      score: Math.min(100, Math.round(overall * (0.9 + Math.random() * 0.2))),
      comment: overall >= 70
        ? "Good analytical approach."
        : "Practice breaking down problems systematically.",
    },
    confidence: {
      score: voiceAnswerCount > 0 ? avgVoiceConfidence : Math.min(100, Math.round(overall * 0.9)),
      comment: avgVoiceConfidence >= 70 || overall >= 70
        ? "Confident presentation."
        : "Practice delivering answers with more confidence.",
    },
    vocabulary: {
      score: avgVocabulary,
      comment: avgVocabulary >= 70
        ? "Professional vocabulary with technical terms."
        : "Use more action verbs and technical terminology.",
    },
  };

  let hire_verdict: HireVerdict;
  let verdict_reason: string;

  if (overall >= 80) {
    hire_verdict = "Strong Hire";
    verdict_reason = `Excellent performance! Demonstrates strong skills and great fit for ${company}. Ready for final rounds.`;
  } else if (overall >= 65) {
    hire_verdict = "Hire";
    verdict_reason = `Solid performance with good fundamentals. Shows potential and aligns well with expectations.`;
  } else if (overall >= 50) {
    hire_verdict = "Borderline";
    verdict_reason = `Mixed performance. Would benefit from more preparation before proceeding.`;
  } else {
    hire_verdict = "No Hire";
    verdict_reason = `Needs significant improvement. Practice with STAR method and prepare concrete examples.`;
  }

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (skill_breakdown.technical_depth.score >= 70) strengths.push("Strong technical knowledge");
  else improvements.push("Deepen technical explanations");

  if (skill_breakdown.communication.score >= 70) strengths.push("Clear communication");
  else improvements.push("Use more structured responses (STAR)");

  if (skill_breakdown.confidence.score >= 70) strengths.push("Confident delivery");
  else improvements.push("Practice to improve confidence");

  if (avgVocabulary >= 70) strengths.push("Professional vocabulary");
  else improvements.push("Add more action verbs and metrics");

  if (scores.some(s => s.score >= 8)) strengths.push("Excellent individual responses");
  if (scores.some(s => s.score < 5)) improvements.push("Avoid overly brief responses");

  const next_steps: NextStep[] = [
    { icon: "📚", title: "Study System Design", desc: "Review distributed systems and scalability patterns" },
    { icon: "🎯", title: "Practice STAR Method", desc: "Situation, Task, Action, Result for behavioral Qs" },
    { icon: "🎤", title: "Mock Interviews", desc: "Practice speaking aloud with a timer" },
    { icon: "📊", title: "Add Metrics", desc: "Quantify impact: percentages, numbers, timeframes" },
  ];

  const voice_analysis = voiceAnswerCount > 0 ? {
    overall_confidence: avgVoiceConfidence,
    speaking_pace: avgVoiceConfidence >= 70 ? "Well-paced" : "Needs work",
    recommendation: avgVoiceConfidence >= 70
      ? "Good vocal presence. Keep practicing."
      : "Record yourself to identify improvement areas.",
  } : undefined;

  return {
    scores,
    skill_breakdown,
    overall_score: Math.min(100, Math.max(0, overall)),
    hire_verdict,
    verdict_reason,
    strengths: strengths.slice(0, 4),
    improvements: improvements.slice(0, 4),
    next_steps,
    voice_analysis,
  };
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

const GlassCard: React.FC<{ children: React.ReactNode; style?: object }> = ({ children, style }) => (
  <View style={[styles.glassCard, style]}>{children}</View>
);

const PrimaryButton: React.FC<{
  label: string;
  onPress: () => void;
  disabled?: boolean;
  icon?: string;
  loading?: boolean;
  color?: string;
  size?: "normal" | "large";
}> = ({ label, onPress, disabled, icon, loading, color, size = "normal" }) => (
  <TouchableOpacity onPress={onPress} disabled={disabled || loading} activeOpacity={0.85}>
    <LinearGradient
      colors={disabled ? [C.surface2, C.surface3] : [color || C.primary, color ? color + "CC" : C.primaryDark]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.primaryBtn, size === "large" && styles.primaryBtnLarge, disabled && styles.primaryBtnDisabled]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={[styles.primaryBtnText, size === "large" && styles.primaryBtnTextLarge]}>
          {icon ? `${icon}  ` : ""}{label}
        </Text>
      )}
    </LinearGradient>
  </TouchableOpacity>
);

const SecondaryButton: React.FC<{ label: string; onPress: () => void; icon?: string }> = ({ label, onPress, icon }) => (
  <TouchableOpacity onPress={onPress} style={styles.secondaryBtn} activeOpacity={0.7}>
    <Text style={styles.secondaryBtnText}>{icon ? `${icon}  ` : ""}{label}</Text>
  </TouchableOpacity>
);

const Badge: React.FC<{ text: string; type?: QuestionType }> = ({ text, type }) => {
  const colors = type ? TYPE_COLORS[type] : { bg: C.surface3, text: C.textSecondary, border: C.border };
  return (
    <View style={[styles.badge, { backgroundColor: colors.bg, borderColor: colors.border }]}>
      <Text style={[styles.badgeText, { color: colors.text }]}>{text.toUpperCase()}</Text>
    </View>
  );
};

const ProgressBar: React.FC<{ progress: number; color?: string }> = ({ progress, color = C.primary }) => (
  <View style={styles.progressBar}>
    <View style={[styles.progressFill, { width: `${Math.min(100, progress * 100)}%`, backgroundColor: color }]} />
  </View>
);

const SkillMeter: React.FC<{ label: string; score: number; comment: string; icon?: string }> = ({ label, score, comment, icon }) => {
  const color = score >= 75 ? C.success : score >= 50 ? C.warning : C.error;
  return (
    <View style={styles.skillMeter}>
      <View style={styles.skillMeterHeader}>
        <Text style={styles.skillLabel}>{icon} {label}</Text>
        <Text style={[styles.skillScore, { color }]}>{score}</Text>
      </View>
      <View style={styles.skillBarBg}>
        <View style={[styles.skillBarFill, { width: `${score}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.skillComment}>{comment}</Text>
    </View>
  );
};

const ScoreCircle: React.FC<{ score: number; size?: number }> = ({ score, size = 140 }) => {
  const color = score >= 75 ? C.success : score >= 50 ? C.warning : C.error;
  const radius = (size - 16) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <View style={[styles.scoreCircle, { width: size, height: size }]}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: "-90deg" }] }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={C.surface3} strokeWidth={10} fill="none" />
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={color} strokeWidth={10} fill="none" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} />
      </Svg>
      <View style={styles.scoreCircleInner}>
        <Text style={[styles.scoreCircleValue, { color }]}>{score}</Text>
        <Text style={styles.scoreCircleLabel}>/ 100</Text>
      </View>
    </View>
  );
};

const VoiceRecordButton: React.FC<{
  isRecording: boolean;
  duration: number;
  onPress: () => void;
}> = ({ isRecording, duration, onPress }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 1.15, duration: 500, useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <LinearGradient
          colors={isRecording ? [C.error, C.errorLight] : [C.voice, C.voiceLight]}
          style={styles.voiceBtnGradient}
        >
          {isRecording ? <View style={styles.voiceStopIcon} /> : <Text style={styles.voiceBtnIcon}>🎤</Text>}
        </LinearGradient>
      </Animated.View>
      <Text style={styles.voiceBtnLabel}>{isRecording ? formatTime(duration) : "Tap to Record"}</Text>
    </TouchableOpacity>
  );
};

const WaveformVisualizer: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const animations = useRef(Array(20).fill(0).map(() => new Animated.Value(0.3))).current;

  useEffect(() => {
    if (isActive) {
      animations.forEach((anim) => {
        Animated.loop(
          Animated.sequence([
            Animated.timing(anim, { toValue: 0.3 + Math.random() * 0.7, duration: 100 + Math.random() * 200, useNativeDriver: true }),
            Animated.timing(anim, { toValue: 0.3, duration: 100 + Math.random() * 200, useNativeDriver: true }),
          ])
        ).start();
      });
    } else {
      animations.forEach((anim) => anim.setValue(0.3));
    }
  }, [isActive]);

  return (
    <View style={styles.waveform}>
      {animations.map((anim, i) => (
        <Animated.View key={i} style={[styles.waveformBar, { transform: [{ scaleY: anim }], backgroundColor: isActive ? C.voice : C.muted }]} />
      ))}
    </View>
  );
};

// ─── SCREENS ──────────────────────────────────────────────────────────────────

const LandingScreen: React.FC<{ onBegin: () => void }> = ({ onBegin }) => (
  <GlassCard style={styles.heroCard}>
    <LinearGradient colors={[C.primary, C.primaryDark]} style={styles.heroIconBg}>
      <Text style={styles.heroIcon}>🎯</Text>
    </LinearGradient>

    <Text style={styles.heroTitle}>AI Mock{"\n"}Interview</Text>
    <Text style={styles.heroSubtitle}>
      Practice with <Text style={{ color: C.primary }}>any company's questions</Text>,
      {" "}record answers, get detailed feedback on content, confidence & vocabulary.
    </Text>

    <View style={styles.featureGrid}>
      {[
        { icon: "🏢", title: "Any Company", desc: "15+ industries" },
        { icon: "🎤", title: "Voice Input", desc: "Confidence check" },
        { icon: "📊", title: "AI Analysis", desc: "Detailed feedback" },
      ].map((f) => (
        <View key={f.title} style={styles.featureItem}>
          <Text style={styles.featureIcon}>{f.icon}</Text>
          <Text style={styles.featureTitle}>{f.title}</Text>
          <Text style={styles.featureDesc}>{f.desc}</Text>
        </View>
      ))}
    </View>

   
    <PrimaryButton label="Start Interview" onPress={onBegin} icon="▶" size="large" />
  </GlassCard>
);

const SetupScreen: React.FC<{
  onStart: (company: string, role: string, exp: string, industry: string | null, customName?: string) => void;
  onBack: () => void;
}> = ({ onStart, onBack }) => {
  const [step, setStep] = useState<"company" | "industry" | "details">("company");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState<string | null>(null);
  const [customCompanyName, setCustomCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [exp, setExp] = useState("");
  const [showIndustryModal, setShowIndustryModal] = useState(false);

  const profile = company ? COMPANY_PROFILES[company] : null;
  const industryProfile = industry ? INDUSTRIES[industry] : null;

  const handleCompanySelect = (c: string) => {
    setCompany(c);
    if (c === "Other") {
      setShowIndustryModal(true);
    } else {
      setIndustry(null);
      setCustomCompanyName("");
    }
  };

  const handleIndustrySelect = (ind: string) => {
    setIndustry(ind);
    setShowIndustryModal(false);
  };

  const canStart = company && role && exp && (company !== "Other" || (industry && customCompanyName));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <GlassCard>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.setupTitle}>Configure Interview</Text>
        <Text style={styles.setupSubtitle}>Select company, role, and experience level</Text>

        {/* Featured Companies */}
        <Text style={styles.fieldLabel}>SELECT COMPANY</Text>
        <View style={styles.companyGrid}>
          {FEATURED_COMPANIES.map((c) => {
            const p = COMPANY_PROFILES[c];
            const selected = company === c;
            return (
              <TouchableOpacity
                key={c}
                style={[styles.companyCard, selected && styles.companyCardSelected]}
                onPress={() => handleCompanySelect(c)}
              >
                <LinearGradient colors={selected ? p.gradient : [C.surface2, C.surface3]} style={styles.companyCardGradient}>
                  <Text style={styles.companyEmoji}>{p.emoji}</Text>
                  <Text style={[styles.companyName, selected && styles.companyNameSelected]}>{c}</Text>
                  {c !== "Other" && (
                    <Text style={[styles.companyDifficulty, selected && { color: "rgba(255,255,255,0.7)" }]}>{p.difficulty}</Text>
                  )}
                  {c === "Other" && <Text style={[styles.companyDifficulty, selected && { color: "rgba(255,255,255,0.7)" }]}>Custom</Text>}
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Company Info or Custom Company Input */}
        {company === "Other" && industry && (
          <View style={[styles.companyInfo, { borderColor: industryProfile?.color + "40" }]}>
            <Text style={[styles.companyInfoTitle, { color: industryProfile?.color }]}>
              {industryProfile?.emoji} {industryProfile?.name}
            </Text>
            <Text style={styles.companyInfoText}>{industryProfile?.focus}</Text>
            
            <Text style={[styles.fieldLabel, { marginTop: 16, marginBottom: 8 }]}>COMPANY NAME</Text>
            <TextInput
              style={styles.customInput}
              value={customCompanyName}
              onChangeText={setCustomCompanyName}
              placeholder="Enter company name (e.g., Stripe, Airbnb)"
              placeholderTextColor={C.muted}
            />
            
            <TouchableOpacity onPress={() => setShowIndustryModal(true)} style={styles.changeIndustryBtn}>
              <Text style={styles.changeIndustryText}>Change Industry</Text>
            </TouchableOpacity>
          </View>
        )}

        {company && company !== "Other" && profile && (
          <View style={[styles.companyInfo, { borderColor: profile.color + "40" }]}>
            <Text style={[styles.companyInfoTitle, { color: profile.color }]}>📋 {company} Interview Style</Text>
            <Text style={styles.companyInfoText}>{profile.known_for}</Text>
            <View style={styles.roundsRow}>
              {profile.rounds.map((r) => (
                <View key={r} style={[styles.roundChip, { borderColor: profile.color + "50" }]}>
                  <Text style={[styles.roundChipText, { color: profile.color }]}>{r}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Role */}
        <Text style={[styles.fieldLabel, { marginTop: 28 }]}>TARGET ROLE</Text>
        <View style={styles.roleGrid}>
          {ROLES.map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.roleChip, role === r && styles.roleChipSelected]}
              onPress={() => setRole(r)}
            >
              <Text style={[styles.roleChipText, role === r && styles.roleChipTextSelected]}>{r}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Experience */}
        <Text style={[styles.fieldLabel, { marginTop: 28 }]}>EXPERIENCE LEVEL</Text>
        <View style={styles.expGrid}>
          {EXPERIENCE_LEVELS.map((e) => (
            <TouchableOpacity
              key={e.value}
              style={[styles.expCard, exp === e.value && styles.expCardSelected]}
              onPress={() => setExp(e.value)}
            >
              <Text style={styles.expIcon}>{e.icon}</Text>
              <Text style={[styles.expLabel, exp === e.value && styles.expLabelSelected]}>{e.label}</Text>
              <Text style={styles.expYears}>{e.years}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ marginTop: 32 }}>
          <PrimaryButton
            label="Generate Interview Questions"
            onPress={() => onStart(company, role, exp, industry, customCompanyName)}
            disabled={!canStart}
            icon="⚡"
            size="large"
          />
        </View>
      </GlassCard>

      {/* Industry Selection Modal */}
      <Modal visible={showIndustryModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Industry</Text>
            <Text style={styles.modalSubtitle}>Choose the industry for your target company</Text>
            
            <ScrollView style={styles.industryList} showsVerticalScrollIndicator={false}>
              {Object.entries(INDUSTRIES).map(([key, ind]) => (
                <TouchableOpacity
                  key={key}
                  style={[styles.industryItem, industry === key && styles.industryItemSelected]}
                  onPress={() => handleIndustrySelect(key)}
                >
                  <Text style={styles.industryEmoji}>{ind.emoji}</Text>
                  <View style={styles.industryInfo}>
                    <Text style={[styles.industryName, industry === key && { color: ind.color }]}>{ind.name}</Text>
                    <Text style={styles.industryFocus}>{ind.focus}</Text>
                    <Text style={styles.industryCompanies}>e.g., {ind.companies.slice(0, 3).join(", ")}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <SecondaryButton label="Cancel" onPress={() => { setShowIndustryModal(false); setCompany(""); }} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const LoadingScreen: React.FC<{ company: string; customName?: string }> = ({ company, customName }) => {
  const profile = COMPANY_PROFILES[company];
  const displayName = customName || company;
  const [step, setStep] = useState(0);
  const steps = ["Analyzing interview patterns...", "Generating questions...", "Preparing voice analysis...", "Almost ready..."];

  useEffect(() => {
    const interval = setInterval(() => setStep((s) => Math.min(s + 1, steps.length - 1)), 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <GlassCard style={styles.centerCard}>
      <LinearGradient colors={profile?.gradient || [C.primary, C.primaryDark]} style={styles.loadingIconBg}>
        <Text style={styles.loadingEmoji}>{profile?.emoji || "🏢"}</Text>
      </LinearGradient>
      <ActivityIndicator size="large" color={C.primary} style={{ marginVertical: 24 }} />
      <Text style={styles.loadingTitle}>Preparing {displayName} Interview</Text>
      <Text style={styles.loadingSubtitle}>{steps[step]}</Text>
    </GlassCard>
  );
};

const InterviewScreen: React.FC<{
  questions: Question[];
  company: string;
  role: string;
  customName?: string;
  onFinish: (answers: Record<number, AnswerData>) => void;
  onCancel: () => void;
}> = ({ questions, company, role, customName, onFinish, onCancel }) => {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerData>>({});
  const [showHint, setShowHint] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  
  const recordingRef = useRef<Audio.Recording | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const profile = COMPANY_PROFILES[company];
  const displayName = customName || company;
  const q = questions[index];
  const currentAnswer = answers[q?.id] ?? { text: "", inputMode: "text" as InputMode };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      Speech.stop();
    };
  }, []);

  const speakQuestion = async () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      Speech.speak(q.question, {
        language: "en-US",
        pitch: 1,
        rate: 0.9,
        onDone: () => setIsSpeaking(false),
        onError: () => setIsSpeaking(false),
      });
    }
  };

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      recordingRef.current = recording;
      setIsRecording(true);
      setRecordingDuration(0);
      if (Platform.OS !== "web") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      timerRef.current = setInterval(() => setRecordingDuration((d) => d + 1), 1000);
    } catch (err) {
      Alert.alert("Error", "Could not start recording.");
    }
  };

  const stopRecording = async () => {
    if (!recordingRef.current) return;
    try {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      await recordingRef.current.stopAndUnloadAsync();
      const duration = recordingDuration;
      recordingRef.current = null;
      setIsRecording(false);
      if (Platform.OS !== "web") Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      const voiceMetrics = analyzeVoiceRecording(duration);
      setAnswers((prev) => ({
        ...prev,
        [q.id]: { ...prev[q.id], text: prev[q.id]?.text ?? "", voiceMetrics, inputMode: "voice" },
      }));
      Alert.alert("Recording Complete! 🎉", `Duration: ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}\nConfidence: ${voiceMetrics.confidence}%\nPace: ${voiceMetrics.pace}\n\nNow type your answer for content analysis.`);
    } catch (err) { console.error(err); }
  };

  const toggleRecording = () => isRecording ? stopRecording() : startRecording();

  const updateText = (text: string) => {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: { ...prev[q.id], text, inputMode: prev[q.id]?.voiceMetrics ? "voice" : "text" },
    }));
  };

  const goNext = () => {
    setShowHint(false);
    Speech.stop();
    setIsSpeaking(false);
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setRecordingDuration(0);
    } else {
      onFinish(answers);
    }
  };

  const goPrev = () => {
    if (index > 0) {
      setShowHint(false);
      Speech.stop();
      setIsSpeaking(false);
      setIndex((i) => i - 1);
    }
  };

  if (!q) return null;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <GlassCard>
        {/* Header */}
        <View style={styles.interviewHeader}>
          <View style={styles.interviewHeaderLeft}>
            <View style={[styles.companyDot, { backgroundColor: profile?.color || C.primary }]} />
            <Text style={styles.interviewCompany}>{displayName}</Text>
            <Text style={styles.interviewDivider}>•</Text>
            <Text style={styles.interviewRole}>{role}</Text>
          </View>
          <TouchableOpacity onPress={onCancel} style={styles.exitBtn}>
            <Text style={styles.exitBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Progress */}
        <ProgressBar progress={(index + 1) / questions.length} color={profile?.color} />
        <Text style={styles.progressText}>Question {index + 1} of {questions.length}</Text>

        {/* Question */}
        <View style={styles.questionCard}>
          <View style={styles.questionMeta}>
            <Badge text={q.type} type={q.type} />
            <Badge text={q.difficulty} />
            <TouchableOpacity onPress={speakQuestion} style={styles.speakBtn}>
              <Text style={styles.speakBtnText}>{isSpeaking ? "🔊" : "🔈"}</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.questionText}>{q.question}</Text>

          {q.lp && (
            <View style={styles.lpBadge}>
              <Text style={styles.lpBadgeLabel}>LEADERSHIP PRINCIPLE</Text>
              <Text style={styles.lpBadgeValue}>{q.lp}</Text>
            </View>
          )}

          {q.why_asked && (
            <View style={styles.whyAsked}>
              <Text style={styles.whyAskedText}>💡 {q.why_asked}</Text>
            </View>
          )}
        </View>

        {/* Voice Recording */}
        <View style={styles.voiceSection}>
          <Text style={styles.voiceSectionTitle}>🎤 Voice Recording (Optional)</Text>
          <Text style={styles.voiceSectionDesc}>Record yourself to analyze confidence and pace</Text>
          
          <View style={styles.voiceControls}>
            <VoiceRecordButton isRecording={isRecording} duration={recordingDuration} onPress={toggleRecording} />
          </View>

          {isRecording && <WaveformVisualizer isActive={isRecording} />}

          {currentAnswer.voiceMetrics && (
            <View style={styles.voiceMetricsCard}>
              <Text style={styles.voiceMetricsTitle}>📊 Voice Analysis</Text>
              <View style={styles.voiceMetricsRow}>
                <View style={styles.voiceMetric}>
                  <Text style={styles.voiceMetricValue}>{currentAnswer.voiceMetrics.confidence}%</Text>
                  <Text style={styles.voiceMetricLabel}>Confidence</Text>
                </View>
                <View style={styles.voiceMetric}>
                  <Text style={styles.voiceMetricValue}>{currentAnswer.voiceMetrics.clarity}%</Text>
                  <Text style={styles.voiceMetricLabel}>Clarity</Text>
                </View>
                <View style={styles.voiceMetric}>
                  <Text style={[styles.voiceMetricValue, { fontSize: 14 }]}>{currentAnswer.voiceMetrics.pace}</Text>
                  <Text style={styles.voiceMetricLabel}>Pace</Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Text Answer */}
        <View style={styles.answerSection}>
          <Text style={styles.answerLabel}>✍️ YOUR ANSWER</Text>
          <TextInput
            style={styles.answerInput}
            multiline
            placeholder="Type your answer here...&#10;&#10;Use STAR method for behavioral questions: Situation, Task, Action, Result"
            placeholderTextColor={C.muted}
            value={currentAnswer.text}
            onChangeText={updateText}
            textAlignVertical="top"
          />
          <View style={styles.answerFooter}>
            <Text style={styles.charCount}>{currentAnswer.text.length} characters</Text>
            <Text style={[styles.charHint, currentAnswer.text.length >= 200 && { color: C.success }]}>
              {currentAnswer.text.length < 50 ? "Add more detail" : currentAnswer.text.length < 150 ? "Good start..." : currentAnswer.text.length < 200 ? "Getting better!" : "✓ Great detail!"}
            </Text>
          </View>
        </View>

        {/* Hint */}
        {showHint && (
          <View style={styles.hintBox}>
            <Text style={styles.hintTitle}>💡 Key Points to Cover</Text>
            <Text style={styles.hintText}>{q.hint}</Text>
          </View>
        )}

        {/* Actions */}
        <View style={styles.interviewActions}>
          {index > 0 && <SecondaryButton label="← Previous" onPress={goPrev} />}
          <View style={{ flex: 1, marginLeft: index > 0 ? 12 : 0 }}>
            <PrimaryButton
              label={index < questions.length - 1 ? "Next" : "🏁 Submit & Get Results"}
              onPress={goNext}
              color={index === questions.length - 1 ? C.success : undefined}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.hintToggle} onPress={() => setShowHint((h) => !h)}>
          <Text style={styles.hintToggleText}>{showHint ? "Hide Hint" : "Need a hint?"} 💡</Text>
        </TouchableOpacity>
      </GlassCard>
    </ScrollView>
  );
};

const EvaluatingScreen: React.FC<{ progress: number }> = ({ progress }) => {
  const steps = ["Content Analysis", "Vocabulary Check", "Confidence Score", "Final Report"];
  
  return (
    <GlassCard style={styles.centerCard}>
      <ActivityIndicator size="large" color={C.primary} style={{ marginBottom: 24 }} />
      <Text style={styles.loadingTitle}>Analyzing Your Interview</Text>
      <Text style={styles.loadingSubtitle}>Evaluating content, vocabulary & confidence...</Text>
      
      <View style={styles.evalProgress}>
        {steps.map((step, i) => (
          <View key={step} style={[styles.evalStep, i <= progress && styles.evalStepActive]}>
            <View style={[styles.evalStepDot, i <= progress && styles.evalStepDotActive]}>
              {i < progress ? <Text style={styles.evalStepCheck}>✓</Text> : i === progress ? <ActivityIndicator size="small" color={C.primary} /> : <Text style={styles.evalStepNum}>{i + 1}</Text>}
            </View>
            <Text style={[styles.evalStepText, i <= progress && styles.evalStepTextActive]}>{step}</Text>
          </View>
        ))}
      </View>
    </GlassCard>
  );
};

const ResultsScreen: React.FC<{
  questions: Question[];
  answers: Record<number, AnswerData>;
  evaluation: Evaluation;
  company: string;
  customName?: string;
  onRetry: () => void;
}> = ({ questions, answers, evaluation, company, customName, onRetry }) => {
  const [expandedQ, setExpandedQ] = useState<number | null>(null);
  const displayName = customName || company;

  const verdictColors: Record<string, string> = { "Strong Hire": C.success, Hire: "#84CC16", Borderline: C.warning, "No Hire": C.error };
  const verdictColor = verdictColors[evaluation.hire_verdict] || C.primary;
  const verdictEmoji = { "Strong Hire": "🌟", Hire: "✅", Borderline: "⚠️", "No Hire": "📚" }[evaluation.hire_verdict];

  const scoreMap: Record<number, ScoreItem> = {};
  evaluation.scores.forEach((s) => (scoreMap[s.id] = s));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {/* Hero Score */}
      <GlassCard style={styles.resultsHeroCard}>
        <View style={styles.resultsHero}>
          <ScoreCircle score={evaluation.overall_score} size={160} />
          <View style={styles.resultsHeroInfo}>
            <View style={[styles.verdictPill, { backgroundColor: verdictColor + "25" }]}>
              <Text style={styles.verdictEmoji}>{verdictEmoji}</Text>
              <Text style={[styles.verdictPillText, { color: verdictColor }]}>{evaluation.hire_verdict}</Text>
            </View>
            <Text style={styles.resultsTitle}>
              {evaluation.overall_score >= 80 ? "Outstanding!" : evaluation.overall_score >= 65 ? "Great Job!" : evaluation.overall_score >= 50 ? "Good Effort" : "Keep Practicing"}
            </Text>
            <Text style={styles.resultsVerdict}>{evaluation.verdict_reason}</Text>
          </View>
        </View>
      </GlassCard>

      {/* Voice Analysis */}
      {evaluation.voice_analysis && (
        <GlassCard>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionIcon}>🎤</Text>
            <Text style={styles.sectionTitle}>Voice Analysis</Text>
          </View>
          <View style={styles.voiceAnalysisGrid}>
            <View style={styles.voiceAnalysisItem}>
              <Text style={styles.voiceAnalysisValue}>{evaluation.voice_analysis.overall_confidence}%</Text>
              <Text style={styles.voiceAnalysisLabel}>Confidence</Text>
            </View>
            <View style={styles.voiceAnalysisItem}>
              <Text style={styles.voiceAnalysisValue}>{evaluation.voice_analysis.speaking_pace}</Text>
              <Text style={styles.voiceAnalysisLabel}>Pace</Text>
            </View>
          </View>
          <Text style={styles.voiceRecommendation}>💡 {evaluation.voice_analysis.recommendation}</Text>
        </GlassCard>
      )}

      {/* Skill Breakdown */}
      <GlassCard>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionIcon}>📊</Text>
          <Text style={styles.sectionTitle}>Skill Breakdown</Text>
        </View>
        <SkillMeter label="Technical Depth" icon="🔧" score={evaluation.skill_breakdown.technical_depth.score} comment={evaluation.skill_breakdown.technical_depth.comment} />
        <SkillMeter label="Communication" icon="💬" score={evaluation.skill_breakdown.communication.score} comment={evaluation.skill_breakdown.communication.comment} />
        <SkillMeter label="Problem Solving" icon="🧩" score={evaluation.skill_breakdown.problem_solving.score} comment={evaluation.skill_breakdown.problem_solving.comment} />
        <SkillMeter label="Confidence" icon="💪" score={evaluation.skill_breakdown.confidence.score} comment={evaluation.skill_breakdown.confidence.comment} />
        <SkillMeter label="Vocabulary" icon="📖" score={evaluation.skill_breakdown.vocabulary.score} comment={evaluation.skill_breakdown.vocabulary.comment} />
      </GlassCard>

      {/* Strengths & Improvements */}
      <View style={styles.twoColumnContainer}>
        <GlassCard style={[styles.halfCard, { borderColor: C.success + "30" }]}>
          <Text style={[styles.miniSectionTitle, { color: C.success }]}>✓ Strengths</Text>
          {evaluation.strengths.map((s, i) => (
            <View key={i} style={styles.listItem}>
              <View style={[styles.listDot, { backgroundColor: C.success }]} />
              <Text style={styles.listText}>{s}</Text>
            </View>
          ))}
        </GlassCard>
        <GlassCard style={[styles.halfCard, { borderColor: C.warning + "30" }]}>
          <Text style={[styles.miniSectionTitle, { color: C.warning }]}>↑ Improve</Text>
          {evaluation.improvements.map((s, i) => (
            <View key={i} style={styles.listItem}>
              <View style={[styles.listDot, { backgroundColor: C.warning }]} />
              <Text style={styles.listText}>{s}</Text>
            </View>
          ))}
        </GlassCard>
      </View>

      {/* Question Reviews */}
      <View style={styles.sectionHeaderStandalone}>
        <Text style={styles.sectionIcon}>📝</Text>
        <Text style={styles.sectionTitle}>Question-by-Question Review</Text>
      </View>

      {questions.map((q) => {
        const ev = scoreMap[q.id] ?? { score: 5, feedback: "N/A" };
        const answerData = answers[q.id];
        const isExpanded = expandedQ === q.id;
        const scoreColor = ev.score >= 7 ? C.success : ev.score >= 4 ? C.warning : C.error;

        return (
          <GlassCard key={q.id} style={styles.reviewCard}>
            <TouchableOpacity style={styles.reviewHeader} onPress={() => setExpandedQ(isExpanded ? null : q.id)}>
              <View style={styles.reviewHeaderLeft}>
                <View style={styles.reviewBadges}>
                  <Badge text={q.type} type={q.type} />
                  {answerData?.voiceMetrics && <View style={styles.voiceRecordedBadge}><Text style={styles.voiceRecordedText}>🎤</Text></View>}
                </View>
                <Text style={styles.reviewQuestion} numberOfLines={isExpanded ? undefined : 2}>{q.question}</Text>
              </View>
              <View style={styles.reviewHeaderRight}>
                <View style={[styles.scorePill, { backgroundColor: scoreColor + "20" }]}>
                  <Text style={[styles.scorePillText, { color: scoreColor }]}>{ev.score.toFixed(1)}</Text>
                </View>
                <Text style={[styles.expandIcon, isExpanded && styles.expandIconRotated]}>▼</Text>
              </View>
            </TouchableOpacity>

            {isExpanded && (
              <View style={styles.reviewBody}>
                <View style={styles.reviewDivider} />
                <View style={styles.reviewSection}>
                  <Text style={styles.reviewLabel}>Your Answer</Text>
                  <Text style={styles.reviewAnswer}>{answerData?.text || "(No written answer)"}</Text>
                </View>
                {answerData?.voiceMetrics && (
                  <View style={styles.reviewSection}>
                    <Text style={styles.reviewLabel}>Voice Metrics</Text>
                    <View style={styles.miniVoiceMetrics}>
                      <Text style={styles.miniVoiceMetric}>Confidence: <Text style={{ color: C.voice }}>{answerData.voiceMetrics.confidence}%</Text></Text>
                      <Text style={styles.miniVoiceMetric}>Clarity: <Text style={{ color: C.voice }}>{answerData.voiceMetrics.clarity}%</Text></Text>
                      <Text style={styles.miniVoiceMetric}>Pace: <Text style={{ color: C.voice }}>{answerData.voiceMetrics.pace}</Text></Text>
                    </View>
                  </View>
                )}
                <View style={styles.reviewSection}>
                  <Text style={styles.reviewLabel}>AI Feedback</Text>
                  <View style={styles.feedbackBox}><Text style={styles.feedbackText}>💬 {ev.feedback}</Text></View>
                  {ev.voiceFeedback && <View style={[styles.feedbackBox, { marginTop: 8, backgroundColor: C.voice + "10" }]}><Text style={[styles.feedbackText, { color: C.voiceLight }]}>🎤 {ev.voiceFeedback}</Text></View>}
                </View>
                <View style={styles.reviewSection}>
                  <Text style={styles.reviewLabel}>Ideal Answer</Text>
                  <Text style={styles.reviewIdeal}>{q.ideal_answer}</Text>
                </View>
              </View>
            )}
          </GlassCard>
        );
      })}

     
      <View style={styles.retryContainer}>
        <PrimaryButton label="Start New Interview" onPress={onRetry} icon="↩" size="large" />
      </View>
    </ScrollView>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function MockInterviewScreen() {
  const [screen, setScreen] = useState<Screen>("landing");
  const [config, setConfig] = useState({ company: "", role: "", exp: "", industry: null as string | null, customName: "" });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, AnswerData>>({});
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);
  const [evalProgress, setEvalProgress] = useState(0);

  const handleStart = useCallback(async (company: string, role: string, exp: string, industry: string | null, customName?: string) => {
    setConfig({ company, role, exp, industry, customName: customName || "" });
    setScreen("loading");
    await delay(1500);
    const qs = generateQuestionsForCompany(company, industry, role, customName);
    setQuestions(qs);
    setScreen("interview");
  }, []);

  const handleFinish = useCallback(async (ans: Record<number, AnswerData>) => {
    setAnswers(ans);
    setScreen("evaluating");
    setEvalProgress(0);
    for (let i = 0; i <= 3; i++) { await delay(700); setEvalProgress(i); }
    await delay(500);
    const ev = generateEvaluation(questions, ans, config.customName || config.company);
    setEvaluation(ev);
    setScreen("results");
  }, [questions, config]);

  const handleRetry = useCallback(() => {
    setScreen("setup");
    setQuestions([]);
    setAnswers({});
    setEvaluation(null);
    setEvalProgress(0);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

        {screen === "landing" && <LandingScreen onBegin={() => setScreen("setup")} />}
        {screen === "setup" && <SetupScreen onStart={handleStart} onBack={() => setScreen("landing")} />}
        {screen === "loading" && <LoadingScreen company={config.company} customName={config.customName} />}
        {screen === "interview" && questions.length > 0 && (
          <InterviewScreen questions={questions} company={config.company} role={config.role} customName={config.customName} onFinish={handleFinish} onCancel={handleRetry} />
        )}
        {screen === "evaluating" && <EvaluatingScreen progress={evalProgress} />}
        {screen === "results" && evaluation && (
          <ResultsScreen questions={questions} answers={answers} evaluation={evaluation} company={config.company} customName={config.customName} onRetry={handleRetry} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  scrollView: { flex: 1 },
  scrollContent: { padding: 20, paddingTop: Platform.OS === "android" ? 48 : 20, paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 24 },
  headerBadge: { fontSize: 11, letterSpacing: 2, color: C.primary, fontWeight: "600", marginBottom: 8 },
  headerTitle: { fontSize: 40, fontWeight: "900", color: C.text, textAlign: "center" },
  headerTitleAccent: { color: C.primary, fontStyle: "italic" },
  glassCard: { backgroundColor: C.surface, borderRadius: 24, borderWidth: 1, borderColor: C.border, padding: 24, marginBottom: 16 },
  centerCard: { alignItems: "center", paddingVertical: 48 },
  primaryBtn: { paddingVertical: 16, paddingHorizontal: 24, borderRadius: 16, alignItems: "center" },
  primaryBtnLarge: { paddingVertical: 18 },
  primaryBtnDisabled: { opacity: 0.5 },
  primaryBtnText: { color: "#fff", fontSize: 15, fontWeight: "700" },
  primaryBtnTextLarge: { fontSize: 16 },
  secondaryBtn: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: C.surface2, alignItems: "center" },
  secondaryBtnText: { color: C.textSecondary, fontSize: 14, fontWeight: "600" },
  badge: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 20, borderWidth: 1, marginRight: 8 },
  badgeText: { fontSize: 10, fontWeight: "700", letterSpacing: 1 },
  progressBar: { height: 5, backgroundColor: C.surface3, borderRadius: 3, overflow: "hidden", marginBottom: 8 },
  progressFill: { height: "100%", borderRadius: 3 },
  progressText: { fontSize: 12, color: C.muted, textAlign: "right", marginBottom: 20 },
  skillMeter: { marginBottom: 24 },
  skillMeterHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  skillLabel: { fontSize: 14, color: C.textSecondary, fontWeight: "600" },
  skillScore: { fontSize: 20, fontWeight: "800" },
  skillBarBg: { height: 8, backgroundColor: C.surface3, borderRadius: 4, overflow: "hidden" },
  skillBarFill: { height: "100%", borderRadius: 4 },
  skillComment: { fontSize: 12, color: C.muted, marginTop: 8, lineHeight: 18 },
  scoreCircle: { alignItems: "center", justifyContent: "center", position: "relative" },
  scoreCircleInner: { position: "absolute", alignItems: "center" },
  scoreCircleValue: { fontSize: 42, fontWeight: "900" },
  scoreCircleLabel: { fontSize: 14, color: C.muted, marginTop: -4 },
  heroCard: { alignItems: "center", paddingVertical: 40 },
  heroIconBg: { width: 88, height: 88, borderRadius: 28, alignItems: "center", justifyContent: "center", marginBottom: 24 },
  heroIcon: { fontSize: 44 },
  heroTitle: { fontSize: 36, fontWeight: "900", color: C.text, textAlign: "center", lineHeight: 42, marginBottom: 16 },
  heroSubtitle: { fontSize: 15, color: C.textSecondary, textAlign: "center", lineHeight: 24, marginBottom: 28, paddingHorizontal: 10 },
  featureGrid: { flexDirection: "row", justifyContent: "center", gap: 16, marginBottom: 24, marginLeft:20 },
  featureItem: { alignItems: "center", width: 90 },
  featureIcon: { fontSize: 32, marginBottom: 8 },
  featureTitle: { fontSize: 13, fontWeight: "700", color: C.text, marginBottom: 2 ,justifyContent:"center", marginLeft:10},
  featureDesc: { fontSize: 11, color: C.muted, justifyContent:"center", marginLeft:10 },
  demoBadge: { flexDirection: "row", alignItems: "center", backgroundColor: C.success + "15", paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginBottom: 24 },
  demoBadgeIcon: { fontSize: 14, marginRight: 6 },
  demoBadgeText: { fontSize: 13, color: C.success, fontWeight: "600" },
  backButton: { marginBottom: 16 },
  backButtonText: { fontSize: 14, color: C.textSecondary },
  setupTitle: { fontSize: 28, fontWeight: "900", color: C.text, marginBottom: 8 },
  setupSubtitle: { fontSize: 14, color: C.muted, marginBottom: 28 },
  fieldLabel: { fontSize: 11, color: C.muted, fontWeight: "700", letterSpacing: 2, marginBottom: 12 },
  companyGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 16 },
  companyCard: { width: (SCREEN_W - 40 - 48 - 20) / 2, minWidth: 75, borderRadius: 16, overflow: "hidden" },
  companyCardSelected: {},
  companyCardGradient: { padding: 12, alignItems: "center" },
  companyEmoji: { fontSize: 24, marginBottom: 4 },
  companyName: { fontSize: 10, fontWeight: "700", color: C.text, textAlign: "center" },
  companyNameSelected: { color: "#fff" },
  companyDifficulty: { fontSize: 9, color: C.muted, marginTop: 2 },
  companyInfo: { borderRadius: 16, backgroundColor: C.surface2, padding: 18, borderWidth: 1 },
  companyInfoTitle: { fontSize: 15, fontWeight: "700", marginBottom: 8 },
  companyInfoText: { fontSize: 13, color: C.textSecondary, lineHeight: 20, marginBottom: 12 },
  roundsRow: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
  roundChip: { paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12, borderWidth: 1, backgroundColor: "rgba(255,255,255,0.03)" },
  roundChipText: { fontSize: 10, fontWeight: "600" },
  customInput: { backgroundColor: C.surface3, borderRadius: 12, padding: 14, color: C.text, fontSize: 14, borderWidth: 1, borderColor: C.border },
  changeIndustryBtn: { marginTop: 12 },
  changeIndustryText: { color: C.primary, fontSize: 13, fontWeight: "600" },
  roleGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  roleChip: { paddingVertical: 11, paddingHorizontal: 14, borderRadius: 12, borderWidth: 1, borderColor: C.border, backgroundColor: C.surface2 },
  roleChipSelected: { borderColor: C.secondary, backgroundColor: C.secondary + "15" },
  roleChipText: { fontSize: 12, color: C.textSecondary },
  roleChipTextSelected: { color: C.secondary, fontWeight: "600" },
  expGrid: { flexDirection: "row", gap: 10 },
  expCard: { flex: 1, paddingVertical: 16, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: C.surface2, alignItems: "center" },
  expCardSelected: { borderColor: C.success, backgroundColor: C.success + "15" },
  expIcon: { fontSize: 22, marginBottom: 4 },
  expLabel: { fontSize: 12, color: C.textSecondary, fontWeight: "600" },
  expLabelSelected: { color: C.success, fontWeight: "700" },
  expYears: { fontSize: 10, color: C.muted, marginTop: 2 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.9)", justifyContent: "flex-end" },
  modalContent: { backgroundColor: C.surface, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, maxHeight: "80%" },
  modalTitle: { fontSize: 22, fontWeight: "800", color: C.text, textAlign: "center", marginBottom: 4 },
  modalSubtitle: { fontSize: 14, color: C.muted, textAlign: "center", marginBottom: 20 },
  industryList: { marginBottom: 20 },
  industryItem: { flexDirection: "row", padding: 16, borderRadius: 14, borderWidth: 1, borderColor: C.border, backgroundColor: C.surface2, marginBottom: 10 },
  industryItemSelected: { borderColor: C.primary, backgroundColor: C.primary + "10" },
  industryEmoji: { fontSize: 28, marginRight: 14 },
  industryInfo: { flex: 1 },
  industryName: { fontSize: 15, fontWeight: "700", color: C.text, marginBottom: 2 },
  industryFocus: { fontSize: 12, color: C.textSecondary, marginBottom: 4 },
  industryCompanies: { fontSize: 11, color: C.muted },
  loadingIconBg: { width: 80, height: 80, borderRadius: 24, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  loadingEmoji: { fontSize: 40 },
  loadingTitle: { fontSize: 22, fontWeight: "800", color: C.text, marginBottom: 8, textAlign: "center" },
  loadingSubtitle: { fontSize: 14, color: C.textSecondary, textAlign: "center" },
  interviewHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  interviewHeaderLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  companyDot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  interviewCompany: { fontSize: 14, color: C.text, fontWeight: "700" },
  interviewDivider: { fontSize: 14, color: C.muted, marginHorizontal: 8 },
  interviewRole: { fontSize: 14, color: C.textSecondary },
  exitBtn: { padding: 8 },
  exitBtnText: { fontSize: 20, color: C.muted },
  questionCard: { backgroundColor: C.surface2, borderRadius: 16, padding: 20, marginBottom: 20 },
  questionMeta: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  speakBtn: { marginLeft: "auto", padding: 8 },
  speakBtnText: { fontSize: 20 },
  questionText: { fontSize: 18, fontWeight: "700", color: C.text, lineHeight: 28 },
  lpBadge: { backgroundColor: C.warning + "12", borderLeftWidth: 3, borderLeftColor: C.warning, borderRadius: 10, padding: 14, marginTop: 16 },
  lpBadgeLabel: { fontSize: 10, color: C.warning, fontWeight: "700", letterSpacing: 1, marginBottom: 4 },
  lpBadgeValue: { fontSize: 14, color: C.text, fontWeight: "600" },
  whyAsked: { backgroundColor: C.surface3, borderRadius: 12, padding: 14, marginTop: 16 },
  whyAskedText: { fontSize: 13, color: C.textSecondary, lineHeight: 20 },
  voiceSection: { backgroundColor: C.surface2, borderRadius: 16, padding: 20, marginBottom: 20, borderWidth: 1, borderColor: C.voice + "20" },
  voiceSectionTitle: { fontSize: 16, fontWeight: "700", color: C.text, marginBottom: 4 },
  voiceSectionDesc: { fontSize: 12, color: C.muted, marginBottom: 20 },
  voiceControls: { alignItems: "center" },
  voiceBtnGradient: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center" },
  voiceBtnIcon: { fontSize: 32 },
  voiceStopIcon: { width: 24, height: 24, backgroundColor: "#fff", borderRadius: 4 },
  voiceBtnLabel: { fontSize: 12, color: C.muted, textAlign: "center", marginTop: 8 },
  waveform: { flexDirection: "row", justifyContent: "center", alignItems: "center", height: 40, marginTop: 16, gap: 3 },
  waveformBar: { width: 4, height: 30, borderRadius: 2 },
  voiceMetricsCard: { backgroundColor: C.surface3, borderRadius: 12, padding: 16, marginTop: 16 },
  voiceMetricsTitle: { fontSize: 13, fontWeight: "600", color: C.text, marginBottom: 12 },
  voiceMetricsRow: { flexDirection: "row", justifyContent: "space-around" },
  voiceMetric: { alignItems: "center" },
  voiceMetricValue: { fontSize: 20, fontWeight: "800", color: C.voice },
  voiceMetricLabel: { fontSize: 11, color: C.muted, marginTop: 2 },
  answerSection: { marginBottom: 16 },
  answerLabel: { fontSize: 13, color: C.text, fontWeight: "700", marginBottom: 10 },
  answerInput: { backgroundColor: C.surface2, borderWidth: 1, borderColor: C.border, borderRadius: 16, padding: 18, color: C.text, fontSize: 15, lineHeight: 24, minHeight: 160 },
  answerFooter: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  charCount: { fontSize: 12, color: C.muted },
  charHint: { fontSize: 12, color: C.muted },
  hintBox: { backgroundColor: C.info + "12", borderLeftWidth: 3, borderLeftColor: C.info, borderRadius: 12, padding: 16, marginBottom: 20 },
  hintTitle: { fontSize: 14, color: C.info, fontWeight: "700", marginBottom: 8 },
  hintText: { fontSize: 13, color: C.textSecondary, lineHeight: 22 },
  interviewActions: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  hintToggle: { alignItems: "center", padding: 12 },
  hintToggleText: { fontSize: 14, color: C.muted },
  evalProgress: { width: "100%", marginTop: 32 },
  evalStep: { flexDirection: "row", alignItems: "center", paddingVertical: 12, opacity: 0.4 },
  evalStepActive: { opacity: 1 },
  evalStepDot: { width: 32, height: 32, borderRadius: 16, backgroundColor: C.surface3, alignItems: "center", justifyContent: "center", marginRight: 14 },
  evalStepDotActive: { backgroundColor: C.primary + "20" },
  evalStepCheck: { color: C.success, fontSize: 14, fontWeight: "bold" },
  evalStepNum: { color: C.muted, fontSize: 12, fontWeight: "600" },
  evalStepText: { fontSize: 14, color: C.muted },
  evalStepTextActive: { color: C.text, fontWeight: "500" },
  resultsHeroCard: { paddingVertical: 32 },
  resultsHero: { flexDirection: "row", alignItems: "flex-start" },
  resultsHeroInfo: { flex: 1, marginLeft: 20 },
  verdictPill: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, alignSelf: "flex-start", marginBottom: 12 },
  verdictEmoji: { fontSize: 16, marginRight: 6 },
  verdictPillText: { fontSize: 13, fontWeight: "700" },
  resultsTitle: { fontSize: 26, fontWeight: "900", color: C.text, marginBottom: 12, lineHeight: 32 },
  resultsVerdict: { fontSize: 14, color: C.textSecondary, lineHeight: 22 },
  sectionHeader: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  sectionHeaderStandalone: { flexDirection: "row", alignItems: "center", marginBottom: 16, marginTop: 8 },
  sectionIcon: { fontSize: 20, marginRight: 10 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: C.text },
  voiceAnalysisGrid: { flexDirection: "row", justifyContent: "space-around", marginBottom: 16 },
  voiceAnalysisItem: { alignItems: "center" },
  voiceAnalysisValue: { fontSize: 28, fontWeight: "900", color: C.voice },
  voiceAnalysisLabel: { fontSize: 12, color: C.muted, marginTop: 4 },
  voiceRecommendation: { fontSize: 13, color: C.textSecondary, lineHeight: 20, backgroundColor: C.surface2, padding: 14, borderRadius: 12 },
  twoColumnContainer: { flexDirection: "row", gap: 12, marginBottom: 16 },
  halfCard: { flex: 1, marginBottom: 0 },
  miniSectionTitle: { fontSize: 14, fontWeight: "700", marginBottom: 14 },
  listItem: { flexDirection: "row", alignItems: "flex-start", marginBottom: 10 },
  listDot: { width: 6, height: 6, borderRadius: 3, marginTop: 7, marginRight: 10 },
  listText: { flex: 1, fontSize: 13, color: C.textSecondary, lineHeight: 20 },
  reviewCard: { marginBottom: 12, padding: 0, overflow: "hidden" },
  reviewHeader: { flexDirection: "row", padding: 18 },
  reviewHeaderLeft: { flex: 1 },
  reviewBadges: { flexDirection: "row", alignItems: "center" },
  voiceRecordedBadge: { backgroundColor: C.voice + "20", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10, marginLeft: 4 },
  voiceRecordedText: { fontSize: 12 },
  reviewQuestion: { fontSize: 14, color: C.text, lineHeight: 22, marginTop: 10 },
  reviewHeaderRight: { alignItems: "flex-end", marginLeft: 14 },
  scorePill: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, marginBottom: 8 },
  scorePillText: { fontSize: 16, fontWeight: "800" },
  expandIcon: { fontSize: 12, color: C.muted },
  expandIconRotated: { transform: [{ rotate: "180deg" }] },
  reviewBody: { paddingHorizontal: 18, paddingBottom: 18 },
  reviewDivider: { height: 1, backgroundColor: C.border, marginBottom: 18 },
  reviewSection: { marginBottom: 18 },
  reviewLabel: { fontSize: 11, color: C.muted, fontWeight: "700", letterSpacing: 1, marginBottom: 8 },
  reviewAnswer: { fontSize: 14, color: C.textSecondary, lineHeight: 22, fontStyle: "italic" },
  miniVoiceMetrics: { flexDirection: "row", flexWrap: "wrap", gap: 16 },
  miniVoiceMetric: { fontSize: 13, color: C.textSecondary },
  feedbackBox: { backgroundColor: C.primary + "12", borderRadius: 12, padding: 14 },
  feedbackText: { fontSize: 14, color: C.primaryLight, lineHeight: 22 },
  reviewIdeal: { fontSize: 14, color: C.textSecondary, lineHeight: 22 },
  actionPlan: { borderRadius: 24, padding: 24, marginTop: 8, borderWidth: 1, borderColor: C.primary + "20" },
  actionPlanTitle: { fontSize: 20, fontWeight: "800", color: C.text, marginBottom: 20 },
  actionGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  actionItem: { width: (SCREEN_W - 40 - 48 - 12) / 2, backgroundColor: C.surface + "90", borderRadius: 16, padding: 18, borderWidth: 1, borderColor: C.border },
  actionIcon: { fontSize: 28, marginBottom: 10 },
  actionTitle: { fontSize: 14, fontWeight: "700", color: C.text, marginBottom: 4 },
  actionDesc: { fontSize: 12, color: C.textSecondary, lineHeight: 18 },
  retryContainer: { marginTop: 24, marginBottom: 24 },
});