import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { LineChart, BarChart } from 'react-native-gifted-charts';

var screenWidth = Dimensions.get('window').width - 64;

function TrendChart(props) {
  var skill = props.skill;
  var allSkills = props.allSkills;
  var chartState = useState('area');
  var chartType = chartState[0]; var setChartType = chartState[1];
  var viewState = useState('single');
  var viewMode = viewState[0]; var setViewMode = viewState[1];

  var data = (skill.monthlyTrend || []).map(function(d) {
    return { value: d.value, label: d.month, dataPointText: '' };
  });

  function renderSingleChart() {
    if (chartType === 'bar') {
      return (
        <BarChart
          data={data}
          width={screenWidth - 20}
          height={200}
          barWidth={18}
          barBorderRadius={4}
          frontColor={skill.color}
          backgroundColor="transparent"
          xAxisColor="rgba(255,255,255,0.1)"
          yAxisColor="rgba(255,255,255,0.1)"
          xAxisLabelTextStyle={{ color: '#64748b', fontSize: 9 }}
          yAxisTextStyle={{ color: '#64748b', fontSize: 9 }}
          noOfSections={4}
          isAnimated
        />
      );
    }
    return (
      <LineChart
        data={data}
        width={screenWidth - 20}
        height={200}
        color={skill.color}
        thickness={chartType === 'line' ? 3 : 2}
        startFillColor={chartType === 'area' ? skill.color : 'transparent'}
        endFillColor={chartType === 'area' ? 'transparent' : 'transparent'}
        startOpacity={chartType === 'area' ? 0.3 : 0}
        endOpacity={0}
        backgroundColor="transparent"
        xAxisColor="rgba(255,255,255,0.1)"
        yAxisColor="rgba(255,255,255,0.1)"
        xAxisLabelTextStyle={{ color: '#64748b', fontSize: 9 }}
        yAxisTextStyle={{ color: '#64748b', fontSize: 9 }}
        noOfSections={4}
        curved
        isAnimated
        hideDataPoints={chartType === 'area'}
        dataPointsColor={skill.color}
        areaChart={chartType === 'area'}
      />
    );
  }

  function renderComparisonChart() {
    var datasets = (allSkills || []).slice(0, 4).map(function(s) {
      return {
        data: (s.monthlyTrend || []).map(function(d) { return { value: d.value }; }),
        color: s.id === skill.id ? s.color : s.color + '60',
        thickness: s.id === skill.id ? 3 : 1.5,
      };
    });
    var labels = (skill.monthlyTrend || []).map(function(d) { return d.month; });

    if (!datasets.length) return null;

    return (
      <LineChart
        data={datasets[0].data}
        data2={datasets[1] ? datasets[1].data : undefined}
        data3={datasets[2] ? datasets[2].data : undefined}
        data4={datasets[3] ? datasets[3].data : undefined}
        color={datasets[0] ? datasets[0].color : skill.color}
        color2={datasets[1] ? datasets[1].color : undefined}
        color3={datasets[2] ? datasets[2].color : undefined}
        color4={datasets[3] ? datasets[3].color : undefined}
        thickness={datasets[0] ? datasets[0].thickness : 2}
        thickness2={datasets[1] ? datasets[1].thickness : 1.5}
        thickness3={datasets[2] ? datasets[2].thickness : 1.5}
        thickness4={datasets[3] ? datasets[3].thickness : 1.5}
        width={screenWidth - 20}
        height={220}
        backgroundColor="transparent"
        xAxisColor="rgba(255,255,255,0.1)"
        yAxisColor="rgba(255,255,255,0.1)"
        xAxisLabelTextStyle={{ color: '#64748b', fontSize: 9 }}
        yAxisTextStyle={{ color: '#64748b', fontSize: 9 }}
        noOfSections={4}
        curved
        isAnimated
        hideDataPoints
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <View style={styles.viewToggle}>
          {['single', 'comparison'].map(function(mode) {
            return (
              <TouchableOpacity key={mode} style={[styles.toggleBtn, viewMode === mode && styles.toggleBtnActive]} onPress={function() { setViewMode(mode); }}>
                <Text style={[styles.toggleText, viewMode === mode && styles.toggleTextActive]}>
                  {mode === 'single' ? '📊 Single' : '📈 Compare'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {viewMode === 'single' && (
          <View style={styles.typeToggle}>
            {['area', 'line', 'bar'].map(function(type) {
              return (
                <TouchableOpacity key={type} style={[styles.typeBtn, chartType === type && styles.typeBtnActive]} onPress={function() { setChartType(type); }}>
                  <Text style={[styles.typeText, chartType === type && styles.typeTextActive]}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
      <View style={styles.chartWrap}>
        {viewMode === 'single' ? renderSingleChart() : renderComparisonChart()}
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: { backgroundColor: 'rgba(15,23,42,0.8)', borderRadius: 16, padding: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  controls: { gap: 8, marginBottom: 8 },
  viewToggle: { flexDirection: 'row', gap: 6 },
  toggleBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  toggleBtnActive: { backgroundColor: 'rgba(99,102,241,0.2)', borderColor: 'rgba(99,102,241,0.4)' },
  toggleText: { color: '#64748b', fontSize: 12, fontWeight: '600' },
  toggleTextActive: { color: '#a78bfa' },
  typeToggle: { flexDirection: 'row', gap: 6 },
  typeBtn: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 6, backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  typeBtnActive: { backgroundColor: 'rgba(6,182,212,0.15)', borderColor: 'rgba(6,182,212,0.3)' },
  typeText: { color: '#475569', fontSize: 11 },
  typeTextActive: { color: '#22d3ee' },
  chartWrap: { marginTop: 8 },
});

export default TrendChart;
