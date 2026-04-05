
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Svg, {
  Rect,
  Circle,
  Polyline,
  Line,
  Path,
  Text as SvgText,
} from 'react-native-svg';

const { width } = Dimensions.get('window');

// ─── Color Tokens ────────────────────────────────────────────────────────────
const C = {
  bg: '#0B0F1A',
  surface: '#121828',
  card: '#1A2235',
  border: '#232D42',

  blue: '#3A8EE8',
  blueSoft: '#1A3A5C',
  blueText: '#7DC3FF',

  green: '#1DB97A',
  greenSoft: '#0D3B2A',
  greenText: '#5EDCA9',

  amber: '#E09A2A',
  amberSoft: '#3D2B0A',
  amberText: '#F5C96B',

  textPrimary: '#F0F4FF',
  textSecondary: '#8A97B0',
  textMuted: '#4A566A',

  white: '#FFFFFF',
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const TABS = [
  { key: 'ai',    label: 'AI Recommendations', accent: C.blue,  soft: C.blueSoft,  textCol: C.blueText  },
  { key: 'skill', label: 'Skill Gap Analysis',  accent: C.green, soft: C.greenSoft, textCol: C.greenText },
  { key: 'trend', label: 'Industry Trends',     accent: C.amber, soft: C.amberSoft, textCol: C.amberText },
];

const PANELS = {
  ai: {
    badge: 'AI-Powered',
    title: 'Jobs matched\nto you, personally',
    desc: 'Our AI analyzes your skills, experience, and goals to surface roles you\'re most likely to land — and love.',
    features: [
      { title: 'Profile-based matching',   body: 'Connects your background to roles that actually fit, not just keyword hits.' },
      { title: 'Career goal alignment',    body: 'Set where you want to be in 2–5 years and get recommendations that move you there.' },
      { title: 'Real-time job feed',       body: 'Fresh listings pulled daily, ranked by your personal fit score.' },
      { title: 'Application success tips', body: 'AI highlights what to emphasize for each specific job listing.' },
    ],
    cta: 'See my job matches',
    
    soft: C.blue,
   
  },
  skill: {
    badge: 'Skill Analysis',
    title: 'Know exactly what\nto learn next',
    desc: 'Compare your current skills against what employers are hiring for and find the fastest path to close the gap.',
    features: [
      { title: 'Gap heatmap',        body: 'Instantly see which skills are holding you back the most for target roles.' },
      { title: 'Course recommendations', body: 'Curated learning paths from top platforms matched to your missing skills.' },
      { title: 'Market demand scores',   body: 'Each skill rated by how much employers are actively searching for it.' },
      { title: 'Progress tracker',       body: 'Mark skills as learned and watch your match scores improve in real time.' },
    ],
    cta: 'Analyse my skill gaps',
    
    soft: C.green,
    
  },
  trend: {
    badge: 'Market Intelligence',
    title: 'Stay ahead of\nthe job market',
    desc: 'Real-time signals from thousands of postings reveal which industries are hiring and where salaries are moving.',
    features: [
      { title: 'Industry hiring pulse',  body: 'Weekly snapshot of which sectors are growing headcount fast.' },
      { title: 'Emerging skill alerts',  body: 'Get notified when a new skill starts appearing across your target roles.' },
      { title: 'Salary benchmarks',      body: 'See how your compensation compares to current market rates.' },
      { title: 'Location heat maps',     body: 'Discover which cities have the highest demand for your role.' },
    ],
    cta: 'Explore market trends',
  soft: C.amber,
    
  },
};

// ─── SVG Illustrations ────────────────────────────────────────────────────────
function AIVisual() {
  return (
    <Svg viewBox="0 0 240 160" width="100%" height={160}>
      <Rect x="10" y="10" width="220" height="140" rx="12" fill={C.blueSoft} />
      {/* Job cards */}
      <Rect x="24" y="26" width="192" height="34" rx="8" fill="#1A3A5C" />
      <SvgText x="38" y="46" fontFamily="System" fontSize="11" fill={C.blueText} fontWeight="600">Senior Data Analyst</SvgText>
      <SvgText x="38" y="58" fontFamily="System" fontSize="9" fill={C.blue}>98% match</SvgText>
      <Circle cx="196" cy="43" r="7" fill={C.blue} />
      <SvgText x="196" y="47" fontFamily="System" fontSize="7" fill="#fff" textAnchor="middle">✓</SvgText>

      <Rect x="24" y="68" width="192" height="28" rx="8" fill="#152A46" />
      <SvgText x="38" y="85" fontFamily="System" fontSize="10" fill={C.textSecondary}>UX Research Lead</SvgText>
      <SvgText x="196" y="85" fontFamily="System" fontSize="9" fill={C.blue} textAnchor="middle">87%</SvgText>

      <Rect x="24" y="104" width="192" height="28" rx="8" fill="#152A46" />
      <SvgText x="38" y="121" fontFamily="System" fontSize="10" fill={C.textSecondary}>Product Manager</SvgText>
      <SvgText x="196" y="121" fontFamily="System" fontSize="9" fill={C.blue} textAnchor="middle">81%</SvgText>

      {/* AI badge */}
      <Circle cx="210" cy="148" r="12" fill={C.blue} />
      <SvgText x="210" y="152" fontFamily="System" fontSize="8" fill="#fff" textAnchor="middle" fontWeight="700">AI</SvgText>
    </Svg>
  );
}

function SkillVisual() {
  const bars = [
    { label: 'Python',          pct: 0.87, color: C.green,  warn: false },
    { label: 'SQL',             pct: 0.65, color: C.green,  warn: false },
    { label: 'Machine Learning',pct: 0.25, color: '#E24B4A',warn: true  },
    { label: 'Tableau',         pct: 0.38, color: C.amber,  warn: true  },
  ];
  return (
    <Svg viewBox="0 0 240 160" width="100%" height={160}>
      <Rect x="10" y="10" width="220" height="140" rx="12" fill={C.greenSoft} />
      <SvgText x="24" y="34" fontFamily="System" fontSize="10" fill={C.greenText} fontWeight="600">Your skill profile</SvgText>
      {bars.map((b, i) => {
        const y = 46 + i * 26;
        return (
          <React.Fragment key={b.label}>
            <SvgText x="24" y={y} fontFamily="System" fontSize="9" fill={b.warn ? '#F09595' : C.textSecondary}>{b.label}</SvgText>
            <Rect x="24" y={y + 4} width="160" height="6" rx="3" fill="#0D3B2A" />
            <Rect x="24" y={y + 4} width={160 * b.pct} height="6" rx="3" fill={b.color} />
            {b.warn && <SvgText x="192" y={y + 10} fontFamily="System" fontSize="8" fill="#E24B4A">Gap</SvgText>}
          </React.Fragment>
        );
      })}
      <SvgText x="24" y="152" fontFamily="System" fontSize="9" fill={C.greenText}>2 gaps to close for target role</SvgText>
    </Svg>
  );
}

function TrendVisual() {
  const pts = [[24,120],[54,105],[84,92],[114,75],[144,58],[174,40]];
  const ptStr = pts.map(p => p.join(',')).join(' ');
  return (
    <Svg viewBox="0 0 240 160" width="100%" height={160}>
      <Rect x="10" y="10" width="220" height="140" rx="12" fill={C.amberSoft} />
      <SvgText x="24" y="34" fontFamily="System" fontSize="10" fill={C.amberText} fontWeight="600">Hiring trend — Tech roles</SvgText>

      <Line x1="24" y1="130" x2="210" y2="130" stroke={C.amber} strokeWidth="0.5" opacity="0.4" />
      <Line x1="24" y1="130" x2="24" y2="36" stroke={C.amber} strokeWidth="0.5" opacity="0.4" />

      <Polyline points={ptStr} stroke={C.amber} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="5" fill={C.amber} />

      {['Jan','Feb','Mar','Apr','May','Jun'].map((m, i) => (
        <SvgText key={m} x={24 + i * 30} y="145" fontFamily="System" fontSize="8" fill={C.textMuted}>{m}</SvgText>
      ))}

      <Rect x="138" y="32" width="68" height="24" rx="6" fill={C.amber} opacity="0.18" />
      <SvgText x="172" y="46" fontFamily="System" fontSize="10" fill={C.amberText} textAnchor="middle" fontWeight="700">+34% YoY</SvgText>
      <SvgText x="172" y="54" fontFamily="System" fontSize="8" fill={C.amber} textAnchor="middle">hiring surge</SvgText>
    </Svg>
  );
}

const VISUALS = { ai: AIVisual, skill: SkillVisual, trend: TrendVisual };

// ─── Tab Button ───────────────────────────────────────────────────────────────
function TabButton({ tab, isActive, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[
        styles.tabBtn,
        isActive && { backgroundColor: tab.soft, borderColor: tab.accent },
      ]}
    >
      <Text style={[styles.tabLabel, isActive && { color: tab.textCol }]}>
        {tab.label}
      </Text>
    </TouchableOpacity>
  );
}

// ─── Feature Item ─────────────────────────────────────────────────────────────
function FeatureItem({ title, body, accent }) {
  return (
    <View style={styles.featureItem}>
      <View style={[styles.featureDot, { backgroundColor: accent }]} />
      <View style={styles.featureText}>
        <Text style={styles.featureTitle}>{title}</Text>
        <Text style={styles.featureBody}>{body}</Text>
      </View>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function OpportunityRadarScreen() {
  const [active, setActive] = useState('ai');
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const switchTab = (key) => {
    if (key === active) return;
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 120, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
    ]).start();
    setTimeout(() => setActive(key), 120);
  };

  const panel = PANELS[active];
  const Visual = VISUALS[active];

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={C.bg} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>OPPORTUNITY RADAR</Text>
          <Text style={styles.heading}>Your career{'\n'}intelligence hub</Text>
          <Text style={styles.subheading}>
            Three powerful tools helping you discover the right job, fill skill gaps, and stay ahead of the market.
          </Text>
        </View>

        {/* Tab Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContainer}
        >
          {TABS.map(tab => (
            <TabButton
              key={tab.key}
              tab={tab}
              isActive={active === tab.key}
              onPress={() => switchTab(tab.key)}
            />
          ))}
        </ScrollView>

        {/* Panel */}
        <Animated.View style={[styles.panel, { opacity: fadeAnim }]}>

          {/* Panel Header */}
          <View style={styles.panelHeader}>
            <View style={[styles.badge, { backgroundColor: panel.soft }]}>
              <Text style={[styles.badgeText, { color: panel.textCol }]}>{panel.badge}</Text>
            </View>
            <Text style={styles.panelTitle}>{panel.title}</Text>
            <Text style={styles.panelDesc}>{panel.desc}</Text>
          </View>

          {/* Visual */}
          <View style={[styles.visualBox, { borderColor: panel.accent + '33' }]}>
            <Visual />
          </View>

          {/* Features */}
          <View style={styles.featuresBox}>
            {panel.features.map(f => (
              <FeatureItem key={f.title} title={f.title} body={f.body} accent={panel.accent} />
            ))}
          </View>

          {/* CTA */}
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.ctaBtn, { borderColor: panel.accent }]}
          >
            <Text style={[styles.ctaText, { color: panel.textCol }]}>{panel.cta}  →</Text>
          </TouchableOpacity>

        </Animated.View>

        {/* Bottom Spacing */}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: C.bg,
  },
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // Header
  header: {
    marginBottom: 28,
  },
  eyebrow: {
    fontSize: 10,
    letterSpacing: 2,
    color: C.textMuted,
    fontWeight: '600',
    marginBottom: 8,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: C.textPrimary,
    lineHeight: 36,
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    color: C.textSecondary,
    lineHeight: 22,
  },

  // Tabs
  tabsContainer: {
    gap: 10,
    paddingBottom: 4,
    marginBottom: 20,
  },
  tabBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
    marginRight: 8,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: C.textSecondary,
  },

  // Panel
  panel: {
    backgroundColor: C.surface,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: C.border,
    overflow: 'hidden',
  },
  panelHeader: {
    padding: 24,
    paddingBottom: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 14,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  panelTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: C.textPrimary,
    lineHeight: 28,
    marginBottom: 10,
  },
  panelDesc: {
    fontSize: 14,
    color: C.textSecondary,
    lineHeight: 22,
  },

  // Visual
  visualBox: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    backgroundColor: C.card,
  },

  // Features
  featuresBox: {
    paddingHorizontal: 24,
    gap: 16,
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
    flexShrink: 0,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: C.textPrimary,
    marginBottom: 2,
  },
  featureBody: {
    fontSize: 12,
    color: C.textSecondary,
    lineHeight: 18,
  },

  // CTA
  ctaBtn: {
    marginHorizontal: 24,
    marginBottom: 24,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  ctaText: {
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
