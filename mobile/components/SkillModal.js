import React, { useState } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function SkillModal(props) {
  var skill = props.skill;
  var onClose = props.onClose;
  var imgErr = useState(false);
  var hasImgErr = imgErr[0];
  var setImgErr = imgErr[1];
  var insets = useSafeAreaInsets();

  if (!skill) return null;

  function getDemandColor(level) {
    if (level === 'Very High') return '#10b981';
    if (level === 'High') return '#3b82f6';
    if (level === 'Medium') return '#f59e0b';
    return '#94a3b8';
  }

  return (
    <Modal visible={!!skill} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.banner}>
              {!hasImgErr ? (
                <Image source={{ uri: skill.bannerImage }} style={styles.bannerImg} onError={function() { setImgErr(true); }} />
              ) : (
                <View style={[styles.bannerFallback, { backgroundColor: skill.color }]} />
              )}
              <View style={styles.bannerOverlay} />
              <View style={styles.bannerContent}>
                <Text style={styles.modalIcon}>{skill.icon}</Text>
                <Text style={styles.modalTitle}>{skill.name}</Text>
                <Text style={styles.modalSubtitle}>{skill.description}</Text>
              </View>
            </View>

            <View style={styles.body}>
              <Text style={styles.sectionTitle}>📋 Overview</Text>
              <Text style={styles.description}>{skill.longDescription}</Text>

              <View style={styles.keyMetrics}>
                {[
                  { icon: '📈', value: skill.growth + '%', label: 'YoY Growth', color: skill.color },
                  { icon: '🎯', value: skill.demandLevel, label: 'Demand', color: getDemandColor(skill.demandLevel) },
                  { icon: '💰', value: '$' + (skill.avgSalary / 1000).toFixed(0) + 'K', label: 'Avg Salary', color: '#fbbf24' },
                  { icon: '💼', value: (skill.jobOpenings / 1000).toFixed(1) + 'K', label: 'Open Jobs', color: '#22d3ee' },
                ].map(function(m, i) {
                  return (
                    <View key={i} style={[styles.keyMetric, { borderColor: m.color }]}>
                      <Text style={styles.metricIcon}>{m.icon}</Text>
                      <Text style={[styles.metricValue, { color: m.color }]}>{m.value}</Text>
                      <Text style={styles.metricLabel}>{m.label}</Text>
                    </View>
                  );
                })}
              </View>

              <Text style={styles.sectionTitle}>💵 Salary by Experience</Text>
              {[
                { level: '🟢 Entry', value: skill.experienceLevels.entry, color: '#10b981' },
                { level: '🔵 Mid', value: skill.experienceLevels.mid, color: '#3b82f6' },
                { level: '🟣 Senior', value: skill.experienceLevels.senior, color: '#8b5cf6' },
                { level: '🟡 Lead', value: skill.experienceLevels.lead, color: '#f59e0b' },
              ].map(function(s, i) {
                return (
                  <View key={i} style={styles.salaryRow}>
                    <Text style={styles.salaryLevel}>{s.level}</Text>
                    <View style={styles.salaryTrack}>
                      <View style={[styles.salaryFill, { width: (s.value / skill.experienceLevels.lead * 100) + '%', backgroundColor: s.color }]} />
                    </View>
                    <Text style={styles.salaryAmount}>${(s.value / 1000).toFixed(0)}K</Text>
                  </View>
                );
              })}

              <Text style={styles.sectionTitle}>🏢 Top Companies</Text>
              {skill.topCompanies.map(function(company, i) {
                return (
                  <View key={i} style={styles.companyItem}>
                    <Text style={styles.companyRank}>#{i + 1}</Text>
                    <Text style={styles.companyName}>{company}</Text>
                  </View>
                );
              })}

              <Text style={styles.sectionTitle}>📜 Certifications</Text>
              {skill.certifications.map(function(cert, i) {
                return (
                  <View key={i} style={styles.certItem}>
                    <Text style={styles.certIcon}>🏅</Text>
                    <Text style={styles.certName}>{cert}</Text>
                  </View>
                );
              })}

              <Text style={styles.sectionTitle}>🛤️ Learning Path</Text>
              {skill.learningPath.map(function(step, i) {
                return (
                  <View key={i} style={styles.pathStep}>
                    <View style={styles.pathNumber}><Text style={styles.pathNumberText}>{i + 1}</Text></View>
                    <Text style={styles.pathName}>{step}</Text>
                  </View>
                );
              })}

              <Text style={styles.sectionTitle}>🔗 Related Skills</Text>
              <View style={styles.relatedSkills}>
                {skill.relatedSkills.map(function(rs, i) {
                  return <View key={i} style={styles.relatedTag}><Text style={styles.relatedText}>{rs}</Text></View>;
                })}
              </View>

              <View style={styles.extras}>
                <View style={styles.extraItem}>
                  <Text style={styles.extraIcon}>🏠</Text>
                  <Text style={styles.extraLabel}>Remote Work</Text>
                  <Text style={styles.extraValue}>{skill.remotePercentage}% of roles</Text>
                </View>
                <View style={styles.extraItem}>
                  <Text style={styles.extraIcon}>🎯</Text>
                  <Text style={styles.extraLabel}>Freelance</Text>
                  <Text style={styles.extraValue}>{skill.freelanceOpportunity}% opportunity</Text>
                </View>
              </View>

              <Text style={styles.sectionTitle}>🔮 Future Outlook</Text>
              <Text style={styles.outlookText}>{skill.futureOutlook}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

var styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  container: { backgroundColor: '#0f172a', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '92%' },
  closeBtn: { position: 'absolute', top: 16, right: 16, zIndex: 10, width: 32, height: 32, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' },
  closeText: { color: '#94a3b8', fontSize: 16 },
  banner: { height: 180, position: 'relative' },
  bannerImg: { width: '100%', height: '100%' },
  bannerFallback: { width: '100%', height: '100%' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(2,6,23,0.6)' },
  bannerContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 },
  modalIcon: { fontSize: 28, marginBottom: 4 },
  modalTitle: { color: '#f1f5f9', fontSize: 22, fontWeight: '900', marginBottom: 4 },
  modalSubtitle: { color: '#94a3b8', fontSize: 13 },
  body: { padding: 16 },
  sectionTitle: { color: '#e2e8f0', fontSize: 15, fontWeight: '800', marginTop: 16, marginBottom: 10 },
  description: { color: '#64748b', fontSize: 13, lineHeight: 20 },
  keyMetrics: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginVertical: 12 },
  keyMetric: { flex: 1, minWidth: '45%', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 12, borderWidth: 1, alignItems: 'center', gap: 4 },
  metricIcon: { fontSize: 18 },
  metricValue: { fontSize: 16, fontWeight: '800' },
  metricLabel: { color: '#64748b', fontSize: 11 },
  salaryRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  salaryLevel: { color: '#94a3b8', fontSize: 12, width: 70 },
  salaryTrack: { flex: 1, height: 8, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' },
  salaryFill: { height: '100%', borderRadius: 4 },
  salaryAmount: { color: '#e2e8f0', fontSize: 12, fontWeight: '700', width: 42, textAlign: 'right' },
  companyItem: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  companyRank: { color: '#6366f1', fontSize: 12, fontWeight: '800', width: 28 },
  companyName: { color: '#e2e8f0', fontSize: 13 },
  certItem: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.04)' },
  certIcon: { fontSize: 14 },
  certName: { color: '#94a3b8', fontSize: 13 },
  pathStep: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  pathNumber: { width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(99,102,241,0.2)', alignItems: 'center', justifyContent: 'center' },
  pathNumberText: { color: '#a78bfa', fontSize: 12, fontWeight: '700' },
  pathName: { color: '#e2e8f0', fontSize: 13 },
  relatedSkills: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  relatedTag: { backgroundColor: 'rgba(99,102,241,0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(99,102,241,0.2)' },
  relatedText: { color: '#a78bfa', fontSize: 12 },
  extras: { flexDirection: 'row', gap: 10, marginTop: 16 },
  extraItem: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, padding: 12, alignItems: 'center', gap: 4 },
  extraIcon: { fontSize: 18 },
  extraLabel: { color: '#64748b', fontSize: 11 },
  extraValue: { color: '#e2e8f0', fontSize: 13, fontWeight: '700' },
  outlookText: { color: '#94a3b8', fontSize: 13, lineHeight: 20, marginBottom: 30 },
});

export default SkillModal;
