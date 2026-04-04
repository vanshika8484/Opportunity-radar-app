import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function StatsBar(props) {
  var categories = props.categories;
  if (!categories) return null;

  var totalSkills = categories.reduce(function(sum, c) { return sum + c.skillCount; }, 0);
  var totalJobs = categories.reduce(function(sum, c) { return sum + c.summary.totalJobs; }, 0);
  var avgGrowth = Math.round(categories.reduce(function(sum, c) { return sum + c.summary.avgGrowth; }, 0) / categories.length);

  var stats = [
    { icon: '🎯', label: 'Skills Tracked', value: totalSkills, suffix: '' },
    { icon: '📈', label: 'Avg Growth', value: avgGrowth, suffix: '%' },
    { icon: '💼', label: 'Job Openings', value: (totalJobs / 1000).toFixed(1), suffix: 'K+' },
    { icon: '🌍', label: 'Industries', value: '15', suffix: '+' },
    { icon: '🔄', label: 'Data Points', value: '2.4', suffix: 'M' },
    { icon: '⚡', label: 'Updates', value: 'Real', suffix: '-time' },
  ];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {stats.map(function(stat, index) {
          return (
            <View key={index} style={styles.item}>
              <Text style={styles.icon}>{stat.icon}</Text>
              <View style={styles.info}>
                <Text style={styles.value}>{stat.value}{stat.suffix}</Text>
                <Text style={styles.label}>{stat.label}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

var styles = StyleSheet.create({
  container: { marginVertical: 16, backgroundColor: 'rgba(15,23,42,0.6)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  scroll: { paddingHorizontal: 12, paddingVertical: 14, gap: 8 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', marginRight: 8 },
  icon: { fontSize: 20 },
  info: {},
  value: { color: '#e2e8f0', fontSize: 15, fontWeight: '800' },
  label: { color: '#475569', fontSize: 11 },
});

export default StatsBar;
