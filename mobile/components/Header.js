import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function Header(props) {
  var lastRefresh = props.lastRefresh;
  var countdown = props.countdown;
  var onRefresh = props.onRefresh;
  var onBack = props.onBack;
  var showBack = props.showBack;
  var insets = useSafeAreaInsets();

  function formatTime(date) {
    if (!date) return '--:--:--';
    return date.toLocaleTimeString();
  }

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.left}>
        {showBack && (
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        )}
        <View style={styles.logoSection}>
          <View style={styles.radarWrap}>
            <View style={[styles.radarRing, styles.ring1]} />
            <View style={[styles.radarRing, styles.ring2]} />
            <View style={[styles.radarRing, styles.ring3]} />
            <Text style={styles.radarIcon}>📡</Text>
          </View>
          <View style={styles.logoText}>
            <Text style={styles.logoTitle}>
              <Text style={styles.logoOpportunity}>Opportunity</Text>
              <Text style={styles.logoRadar}> Radar</Text>
            </Text>
            <Text style={styles.logoSubtitle}>Skills Intelligence Dashboard</Text>
          </View>
        </View>
      </View>

      <View style={styles.right}>
        <View style={styles.refreshInfo}>
          <View style={styles.liveBadge}>
            <View style={styles.pulseDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <View style={styles.refreshDetails}>
            <Text style={styles.lastUpdate}>Updated: {formatTime(lastRefresh)}</Text>
            <Text style={styles.nextUpdate}>Next: {countdown}s</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.refreshBtn} onPress={onRefresh}>
          <Text style={styles.refreshIcon}>⟳</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingBottom: 12, backgroundColor: 'rgba(2,6,23,0.95)', borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)', zIndex: 10 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  backBtn: { flexDirection: 'row', alignItems: 'center', marginRight: 8, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: 'rgba(99,102,241,0.1)', borderRadius: 8, borderWidth: 1, borderColor: 'rgba(99,102,241,0.2)' },
  backArrow: { color: '#a78bfa', fontSize: 16, marginRight: 4 },
  backText: { color: '#a78bfa', fontSize: 13, fontWeight: '600' },
  logoSection: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  radarWrap: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  radarRing: { position: 'absolute', borderRadius: 50, borderWidth: 1, borderColor: 'rgba(99,102,241,0.4)' },
  ring1: { width: 36, height: 36 },
  ring2: { width: 26, height: 26 },
  ring3: { width: 16, height: 16 },
  radarIcon: { fontSize: 14 },
  logoText: {},
  logoTitle: { fontSize: 14, fontWeight: '800' },
  logoOpportunity: { color: '#a78bfa' },
  logoRadar: { color: '#06b6d4' },
  logoSubtitle: { color: '#475569', fontSize: 10 },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  refreshInfo: { alignItems: 'flex-end', gap: 2 },
  liveBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(16,185,129,0.1)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)' },
  pulseDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10b981' },
  liveText: { color: '#10b981', fontSize: 10, fontWeight: '800', letterSpacing: 1 },
  refreshDetails: { alignItems: 'flex-end' },
  lastUpdate: { color: '#475569', fontSize: 10 },
  nextUpdate: { color: '#64748b', fontSize: 10 },
  refreshBtn: { width: 34, height: 34, borderRadius: 8, backgroundColor: 'rgba(99,102,241,0.1)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(99,102,241,0.2)' },
  refreshIcon: { color: '#a78bfa', fontSize: 18 },
});

export default Header;
