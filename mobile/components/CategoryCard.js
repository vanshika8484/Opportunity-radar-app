import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

function CategoryCard(props) {
  var category = props.category;
  var onClick = props.onClick;
  var imgError = useState(false);
  var hasImgError = imgError[0];
  var setImgError = imgError[1];

  return (
    <TouchableOpacity style={styles.card} onPress={function() { onClick(category.id); }} activeOpacity={0.85}>
      <View style={styles.imageWrapper}>
        {!hasImgError ? (
          <Image source={{ uri: category.image }} style={styles.image} onError={function() { setImgError(true); }} />
        ) : (
          <View style={[styles.imageFallback, { backgroundColor: '#1e1b4b' }]}>
            <Text style={styles.fallbackIcon}>{category.icon}</Text>
          </View>
        )}
        <View style={styles.imageOverlay} />
        <View style={styles.imageContent}>
          <View style={styles.badgeRow}>
            <View style={styles.typeBadge}>
              <Text style={styles.typeBadgeText}>{category.icon} {category.name}</Text>
            </View>
            <View style={styles.countBadge}>
              <Text style={styles.countBadgeText}>{category.skillCount} Skills</Text>
            </View>
          </View>
          <Text style={styles.title}>{category.fullName}</Text>
          <Text style={styles.desc} numberOfLines={2}>{category.description}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.highlights}>
          {category.highlights.map(function(h, i) {
            return <View key={i} style={styles.highlightTag}><Text style={styles.highlightText}>🔥 {h}</Text></View>;
          })}
        </View>

        <View style={styles.metrics}>
          {[
            { value: category.summary.avgGrowth + '%', label: 'Growth', bg: '#4f46e5' },
            { value: category.summary.avgDemand, label: 'Demand', bg: '#0891b2' },
            { value: (category.summary.totalJobs / 1000).toFixed(0) + 'K', label: 'Jobs', bg: '#059669' },
            { value: '$' + (category.summary.avgSalary / 1000).toFixed(0) + 'K', label: 'Avg Salary', bg: '#d97706' },
          ].map(function(m, i) {
            return (
              <View key={i} style={styles.metric}>
                <View style={[styles.metricCircle, { backgroundColor: m.bg }]}>
                  <Text style={styles.metricValue}>{m.value}</Text>
                </View>
                <Text style={styles.metricLabel}>{m.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.topTrending}>
          <Text style={styles.trendingLabel}>🏆 Top Trending:</Text>
          <Text style={styles.trendingValue}>{category.summary.topSkillIcon} {category.summary.topSkill}</Text>
        </View>

        <View style={styles.exploreBtn}>
          <Text style={styles.exploreBtnText}>Explore {category.name} Skills  →</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

var styles = StyleSheet.create({
  card: { backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', overflow: 'hidden', marginBottom: 20 },
  imageWrapper: { height: 180, position: 'relative' },
  image: { width: '100%', height: '100%' },
  imageFallback: { width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' },
  fallbackIcon: { fontSize: 48 },
  imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(2,6,23,0.5)' },
  imageContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 14 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  typeBadge: { backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  typeBadgeText: { color: '#e2e8f0', fontSize: 11, fontWeight: '700' },
  countBadge: { backgroundColor: 'rgba(99,102,241,0.3)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  countBadgeText: { color: '#a78bfa', fontSize: 11, fontWeight: '700' },
  title: { color: '#f1f5f9', fontSize: 20, fontWeight: '900', marginBottom: 4 },
  desc: { color: 'rgba(226,232,240,0.7)', fontSize: 12 },
  body: { padding: 16 },
  highlights: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 14 },
  highlightTag: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  highlightText: { color: '#94a3b8', fontSize: 11, fontWeight: '600' },
  metrics: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 14 },
  metric: { alignItems: 'center', gap: 6 },
  metricCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  metricValue: { color: '#fff', fontSize: 12, fontWeight: '800' },
  metricLabel: { color: '#64748b', fontSize: 10 },
  topTrending: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14, backgroundColor: 'rgba(255,255,255,0.03)', padding: 10, borderRadius: 10 },
  trendingLabel: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  trendingValue: { color: '#e2e8f0', fontSize: 13, fontWeight: '700' },
  exploreBtn: { backgroundColor: 'rgba(99,102,241,0.15)', padding: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(99,102,241,0.3)' },
  exploreBtnText: { color: '#a78bfa', fontSize: 14, fontWeight: '700' },
});

export default CategoryCard;
