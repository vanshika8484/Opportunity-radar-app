import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function SkillCard(props) {
  var skill = props.skill;
  var onClick = props.onClick;
  var onViewDetails = props.onViewDetails;
  var imgErr = useState(false);
  var hasImgErr = imgErr[0];
  var setImgErr = imgErr[1];

  function getDemandColor(level) {
    if (level === 'Very High') return '#10b981';
    if (level === 'High') return '#3b82f6';
    if (level === 'Medium') return '#f59e0b';
    return '#94a3b8';
  }

  return (
    <TouchableOpacity style={styles.card} onPress={function() { if (onClick) onClick(skill); }} activeOpacity={0.85}>
      <View style={styles.imageSection}>
        {!hasImgErr ? (
          <Image source={{ uri: skill.image }} style={styles.image} onError={function() { setImgErr(true); }} />
        ) : (
          <View style={[styles.imageFallback, { backgroundColor: skill.color + '40' }]}>
            <Text style={styles.fallbackIcon}>{skill.icon}</Text>
          </View>
        )}
        <View style={styles.imageGradient} />
        <View style={styles.imageBadges}>
          <View style={styles.growthBadge}>
            <Text style={styles.growthText}>▲ {skill.growth}%</Text>
          </View>
          <View style={[styles.demandBadge, { borderColor: getDemandColor(skill.demandLevel) }]}>
            <Text style={[styles.demandText, { color: getDemandColor(skill.demandLevel) }]}>{skill.demandLevel}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.skillHeader}>
          <View style={[styles.iconCircle, { backgroundColor: skill.color + '30' }]}>
            <Text style={styles.skillIcon}>{skill.icon}</Text>
          </View>
          <View style={styles.skillInfo}>
            <Text style={styles.skillName}>{skill.name}</Text>
            <Text style={styles.skillDesc} numberOfLines={2}>{skill.description}</Text>
          </View>
        </View>

        <View style={styles.progressSection}>
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Trend Score</Text>
              <Text style={[styles.progressValue, { color: skill.color }]}>{skill.trendScore}/100</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: skill.trendScore + '%', backgroundColor: skill.color }]} />
            </View>
          </View>
          <View style={styles.progressItem}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Market Demand</Text>
              <Text style={[styles.progressValue, { color: getDemandColor(skill.demandLevel) }]}>{skill.demand}/100</Text>
            </View>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: skill.demand + '%', backgroundColor: getDemandColor(skill.demandLevel) }]} />
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          {[
            { icon: '💼', value: (skill.jobOpenings / 1000).toFixed(1) + 'K', label: 'Jobs' },
            { icon: '💰', value: '$' + (skill.avgSalary / 1000).toFixed(0) + 'K', label: 'Salary' },
            { icon: '🏠', value: skill.remotePercentage + '%', label: 'Remote' },
          ].map(function(s, i) {
            return (
              <View key={i} style={styles.statBox}>
                <Text style={styles.statIcon}>{s.icon}</Text>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.chartBtn} onPress={function(e) { if (onClick) onClick(skill); }}>
            <Text style={styles.chartBtnText}>📈 View Trends</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsBtn} onPress={function() { if (onViewDetails) onViewDetails(skill); }}>
            <Text style={styles.detailsBtnText}>🔍 Full Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  card: { backgroundColor: 'rgba(15,23,42,0.9)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 16 },
  imageSection: { height: 140, position: 'relative' },
  image: { width: '100%', height: '100%' },
  imageFallback: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  fallbackIcon: { fontSize: 40 },
  imageGradient: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(2,6,23,0.4)' },
  imageBadges: { position: 'absolute', bottom: 10, left: 12, right: 12, flexDirection: 'row', gap: 8 },
  growthBadge: { backgroundColor: 'rgba(16,185,129,0.2)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(16,185,129,0.3)' },
  growthText: { color: '#10b981', fontSize: 11, fontWeight: '700' },
  demandBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10, borderWidth: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  demandText: { fontSize: 11, fontWeight: '700' },
  content: { padding: 14 },
  skillHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 14 },
  iconCircle: { width: 42, height: 42, borderRadius: 21, alignItems: 'center', justifyContent: 'center' },
  skillIcon: { fontSize: 20 },
  skillInfo: { flex: 1 },
  skillName: { color: '#e2e8f0', fontSize: 16, fontWeight: '800', marginBottom: 2 },
  skillDesc: { color: '#64748b', fontSize: 12, lineHeight: 16 },
  progressSection: { gap: 8, marginBottom: 12 },
  progressItem: { gap: 4 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  progressLabel: { color: '#64748b', fontSize: 11 },
  progressValue: { fontSize: 11, fontWeight: '700' },
  progressTrack: { height: 6, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 3 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 10 },
  statBox: { alignItems: 'center', gap: 2 },
  statIcon: { fontSize: 14 },
  statValue: { color: '#e2e8f0', fontSize: 13, fontWeight: '800' },
  statLabel: { color: '#475569', fontSize: 10 },
  actions: { flexDirection: 'row', gap: 8 },
  chartBtn: { flex: 1, backgroundColor: 'rgba(99,102,241,0.1)', padding: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(99,102,241,0.2)' },
  chartBtnText: { color: '#a78bfa', fontSize: 12, fontWeight: '700' },
  detailsBtn: { flex: 1, backgroundColor: 'rgba(6,182,212,0.1)', padding: 10, borderRadius: 10, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(6,182,212,0.2)' },
  detailsBtnText: { color: '#22d3ee', fontSize: 12, fontWeight: '700' },
});

export default SkillCard;
