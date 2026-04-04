import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import CategoryCard from '../../components/CategoryCard';
import CategoryDetail from '../../components/CategoryDetail';
import StatsBar from '../../components/StatsBar';
import ParticleBackground from '../../components/ParticleBackground';
import LoadingSpinner from '../../components/LoadingSpinner';
import { fetchCategories } from '../../api/mockApi';
import { useAutoRefresh } from '../../hooks/useAutoRefresh';

var FEATURE_IMAGES = [
  { uri: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop', title: 'Real-time Analytics', desc: 'Data refreshes every 30 seconds with live market signals' },
  { uri: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=100&h=100&fit=crop', title: 'Trend Forecasting', desc: 'Interactive charts with historical data and growth trajectories' },
  { uri: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop', title: 'Career Intelligence', desc: 'Salary benchmarks, top employers and learning paths' },
  { uri: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=100&h=100&fit=crop', title: 'Global Coverage', desc: 'Track opportunities across industries worldwide' },
];

function App() {
  var catState = useState(null);
  var selectedCategory = catState[0]; var setSelectedCategory = catState[1];

  var fetchCats = useCallback(function() { return fetchCategories(); }, []);
  var hookResult = useAutoRefresh(fetchCats, 30000);
  var categories = hookResult.data;
  var loading = hookResult.loading;
  var lastRefresh = hookResult.lastRefresh;
  var countdown = hookResult.countdown;
  var refresh = hookResult.refresh;

  function handleCategoryClick(categoryId) { setSelectedCategory(categoryId); }
  function handleBack() { setSelectedCategory(null); }
  function getSelectedCategoryName() {
    if (!categories || !selectedCategory) return '';
    var cat = categories.find(function(c) { return c.id === selectedCategory; });
    return cat ? cat.fullName : '';
  }

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#020617" />
      <View style={styles.app}>
        <ParticleBackground />

        <Header lastRefresh={lastRefresh} countdown={countdown} onRefresh={refresh} onBack={handleBack} showBack={!!selectedCategory} />

        {!selectedCategory ? (
          <ScrollView style={styles.main} contentContainerStyle={styles.mainContent} showsVerticalScrollIndicator={false}>
            <View style={styles.heroSection}>
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>📡 POWERED BY REAL-TIME DATA</Text>
              </View>
              <Text style={styles.heroTitle}>
                Discover <Text style={styles.gradientText}>Trending Skills</Text>{'\n'}
                <Text style={styles.heroTitleSub}>Across Industries</Text>
              </Text>
              <Text style={styles.heroSubtitle}>
                Your intelligent career compass — tracking skill demand, salary trends, and growth opportunities in real-time.
              </Text>
              <View style={styles.heroCta}>
                {['⚡ Auto-refreshing', '📊 Interactive Charts', '🎯 12+ Skills'].map(function(f, i) {
                  return <View key={i} style={styles.heroFeature}><Text style={styles.heroFeatureText}>{f}</Text></View>;
                })}
              </View>
            </View>

            {loading && !categories ? (
              <LoadingSpinner />
            ) : (
              <>
                <StatsBar categories={categories} />
                <View style={styles.sectionTitle}>
                  <Text style={styles.sectionTitleText}>Choose a Category</Text>
                  <Text style={styles.sectionSubtitle}>Select a domain to explore in-demand skills</Text>
                </View>
                {categories && categories.map(function(category, index) {
                  return <CategoryCard key={category.id} category={category} onClick={handleCategoryClick} index={index} />;
                })}
              </>
            )}

            <View style={styles.featuresSection}>
              <Text style={styles.featuresTitle}>Why Opportunity Radar?</Text>
              <View style={styles.featuresGrid}>
                {FEATURE_IMAGES.map(function(f, i) {
                  return (
                    <View key={i} style={styles.featureCard}>
                      <View style={styles.featureImgWrap}>
                        <Image source={{ uri: f.uri }} style={styles.featureImg} />
                      </View>
                      <Text style={styles.featureTitle}>{f.title}</Text>
                      <Text style={styles.featureDesc}>{f.desc}</Text>
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.footer}>
              <View style={styles.footerBrand}>
                <Text style={styles.footerLogo}>📡</Text>
                <Text style={styles.footerName}>Opportunity Radar</Text>
              </View>
              <Text style={styles.footerText}>Empowering career decisions with data-driven insights</Text>
              <Text style={styles.footerLinks}>© 2024 Opportunity Radar • Skills Intelligence Platform</Text>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.main}>
            <CategoryDetail categoryId={selectedCategory} categoryName={getSelectedCategoryName()} />
          </View>
        )}
      </View>
    </SafeAreaProvider>
  );
}

var styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: '#020617' },
  main: { flex: 1, zIndex: 1 },
  mainContent: { paddingHorizontal: 16, paddingBottom: 40 },
  heroSection: { paddingVertical: 28, alignItems: 'center' },
  heroBadge: { backgroundColor: 'rgba(99,102,241,0.1)', borderWidth: 1, borderColor: 'rgba(99,102,241,0.2)', borderRadius: 30, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 20 },
  heroBadgeText: { color: '#a78bfa', fontSize: 10, fontWeight: '800', letterSpacing: 2 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: '#f1f5f9', textAlign: 'center', marginBottom: 14, lineHeight: 38 },
  gradientText: { color: '#a78bfa' },
  heroTitleSub: { fontSize: 26, color: '#94a3b8', fontWeight: '300' },
  heroSubtitle: { fontSize: 14, color: '#64748b', textAlign: 'center', lineHeight: 22, marginBottom: 20, maxWidth: 320 },
  heroCta: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  heroFeature: { backgroundColor: 'rgba(255,255,255,0.04)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 6 },
  heroFeatureText: { color: '#94a3b8', fontSize: 12, fontWeight: '600' },
  sectionTitle: { alignItems: 'center', marginBottom: 20 },
  sectionTitleText: { color: '#e2e8f0', fontSize: 20, fontWeight: '800', marginBottom: 4 },
  sectionSubtitle: { color: '#64748b', fontSize: 13 },
  featuresSection: { paddingTop: 32, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)', marginTop: 10 },
  featuresTitle: { color: '#e2e8f0', fontSize: 20, fontWeight: '800', textAlign: 'center', marginBottom: 20 },
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  featureCard: { width: '47%', backgroundColor: 'rgba(15,23,42,0.5)', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', alignItems: 'center' },
  featureImgWrap: { width: 60, height: 60, borderRadius: 30, overflow: 'hidden', marginBottom: 10, borderWidth: 2, borderColor: 'rgba(99,102,241,0.2)' },
  featureImg: { width: '100%', height: '100%' },
  featureTitle: { color: '#e2e8f0', fontSize: 13, fontWeight: '700', textAlign: 'center', marginBottom: 4 },
  featureDesc: { color: '#64748b', fontSize: 11, textAlign: 'center', lineHeight: 16 },
  footer: { alignItems: 'center', paddingTop: 32, marginTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.04)' },
  footerBrand: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  footerLogo: { fontSize: 22 },
  footerName: { color: '#a78bfa', fontSize: 16, fontWeight: '700' },
  footerText: { color: '#475569', fontSize: 12, marginBottom: 8 },
  footerLinks: { color: '#334155', fontSize: 11 },
});

export default App;
