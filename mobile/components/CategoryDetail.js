import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import SkillCard from './SkillCard';
import TrendChart from './TrendChart';
import SkillModal from './SkillModal';
import { fetchSkillsByCategory } from '../api/mockApi';
import { useAutoRefresh } from '../hooks/useAutoRefresh';
import LoadingSpinner from './LoadingSpinner';

var SORT_OPTIONS = [
  { value: 'trendScore', label: '🎯 Trend Score' },
  { value: 'growth', label: '📈 Growth %' },
  { value: 'demand', label: '🔥 Demand' },
  { value: 'salary', label: '💰 Avg Salary' },
  { value: 'jobs', label: '💼 Jobs' },
];

function CategoryDetail(props) {
  var categoryId = props.categoryId;
  var categoryName = props.categoryName;
  var selectedState = useState(null);
  var selectedSkill = selectedState[0]; var setSelectedSkill = selectedState[1];
  var modalState = useState(null);
  var modalSkill = modalState[0]; var setModalSkill = modalState[1];
  var sortState = useState('trendScore');
  var sortBy = sortState[0]; var setSortBy = sortState[1];

  var fetchSkills = useCallback(function() { return fetchSkillsByCategory(categoryId); }, [categoryId]);
  var hookResult = useAutoRefresh(fetchSkills, 30000);
  var skills = hookResult.data;
  var loading = hookResult.loading;

  function getSortedSkills() {
    if (!skills) return [];
    return skills.slice().sort(function(a, b) {
      if (sortBy === 'growth') return b.growth - a.growth;
      if (sortBy === 'demand') return b.demand - a.demand;
      if (sortBy === 'salary') return b.avgSalary - a.avgSalary;
      if (sortBy === 'jobs') return b.jobOpenings - a.jobOpenings;
      return b.trendScore - a.trendScore;
    });
  }

  if (loading && !skills) return <LoadingSpinner />;

  var sortedSkills = getSortedSkills();
  var medals = ['🥇', '🥈', '🥉'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>{categoryId === 'tech' ? '💻' : '🎯'} {categoryName} Skills</Text>
          <Text style={styles.heroSubtitle}>Real-time market intelligence • {sortedSkills.length} skills tracked</Text>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.sortRow} contentContainerStyle={styles.sortContent}>
        {SORT_OPTIONS.map(function(opt) {
          return (
            <TouchableOpacity key={opt.value} style={[styles.sortBtn, sortBy === opt.value && styles.sortBtnActive]} onPress={function() { setSortBy(opt.value); }}>
              <Text style={[styles.sortText, sortBy === opt.value && styles.sortTextActive]}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.topBanner}>
        <Text style={styles.topBannerLabel}>🏆 Top Performers</Text>
        <View style={styles.topSkillsList}>
          {sortedSkills.slice(0, 3).map(function(skill, idx) {
            return (
              <View key={skill.id} style={styles.topSkillItem}>
                <Text style={styles.topMedal}>{medals[idx]}</Text>
                <Text style={styles.topIcon}>{skill.icon}</Text>
                <Text style={styles.topName}>{skill.shortName}</Text>
                <Text style={[styles.topScore, { color: skill.color }]}>{skill.trendScore}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {sortedSkills.map(function(skill, index) {
        return (
          <SkillCard
            key={skill.id}
            skill={skill}
            onClick={function(s) { setSelectedSkill(function(prev) { return prev && prev.id === s.id ? null : s; }); }}
            onViewDetails={setModalSkill}
            index={index}
          />
        );
      })}

      {selectedSkill && (
        <View style={styles.chartSection}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>{selectedSkill.icon} {selectedSkill.name} — Trend Analysis</Text>
            <TouchableOpacity onPress={function() { setSelectedSkill(null); }}>
              <Text style={styles.closeChart}>✕</Text>
            </TouchableOpacity>
          </View>
          <TrendChart skill={selectedSkill} allSkills={sortedSkills} />
        </View>
      )}

      <SkillModal skill={modalSkill} onClose={function() { setModalSkill(null); }} />
    </ScrollView>
  );
}

var styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { marginBottom: 16 },
  heroContent: { padding: 4 },
  heroTitle: { color: '#f1f5f9', fontSize: 22, fontWeight: '900', marginBottom: 4 },
  heroSubtitle: { color: '#475569', fontSize: 12 },
  sortRow: { marginBottom: 14 },
  sortContent: { paddingRight: 16, gap: 8 },
  sortBtn: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginRight: 8 },
  sortBtnActive: { backgroundColor: 'rgba(99,102,241,0.15)', borderColor: 'rgba(99,102,241,0.3)' },
  sortText: { color: '#64748b', fontSize: 12, fontWeight: '600' },
  sortTextActive: { color: '#a78bfa' },
  topBanner: { backgroundColor: 'rgba(15,23,42,0.6)', borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  topBannerLabel: { color: '#e2e8f0', fontSize: 13, fontWeight: '700', marginBottom: 10 },
  topSkillsList: { flexDirection: 'row', justifyContent: 'space-around' },
  topSkillItem: { alignItems: 'center', gap: 4 },
  topMedal: { fontSize: 18 },
  topIcon: { fontSize: 16 },
  topName: { color: '#94a3b8', fontSize: 11, fontWeight: '600' },
  topScore: { fontSize: 14, fontWeight: '800' },
  chartSection: { backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: 16, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  chartTitle: { color: '#e2e8f0', fontSize: 14, fontWeight: '700', flex: 1 },
  closeChart: { color: '#64748b', fontSize: 18, paddingLeft: 10 },
});

export default CategoryDetail;
