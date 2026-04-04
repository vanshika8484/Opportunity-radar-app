import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

function LoadingSpinner() {
  var spin1 = useRef(new Animated.Value(0)).current;
  var spin2 = useRef(new Animated.Value(0)).current;
  var spin3 = useRef(new Animated.Value(0)).current;
  var dot1 = useRef(new Animated.Value(0.3)).current;
  var dot2 = useRef(new Animated.Value(0.3)).current;
  var dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(function() {
    function makeLoop(val, duration, delay) {
      return Animated.loop(Animated.timing(val, { toValue: 1, duration: duration, delay: delay, useNativeDriver: true }));
    }
    makeLoop(spin1, 1200, 0).start();
    makeLoop(spin2, 1000, 200).start();
    makeLoop(spin3, 800, 400).start();

    Animated.loop(Animated.sequence([
      Animated.timing(dot1, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(dot2, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(dot3, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(dot1, { toValue: 0.3, duration: 400, useNativeDriver: true }),
      Animated.timing(dot2, { toValue: 0.3, duration: 400, useNativeDriver: true }),
      Animated.timing(dot3, { toValue: 0.3, duration: 400, useNativeDriver: true }),
    ])).start();
  }, []);

  var rotate1 = spin1.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  var rotate2 = spin2.interpolate({ inputRange: [0, 1], outputRange: ['360deg', '0deg'] });
  var rotate3 = spin3.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });

  return (
    <View style={styles.container}>
      <View style={styles.spinnerWrap}>
        <Animated.View style={[styles.ring, styles.ring1, { transform: [{ rotate: rotate1 }] }]} />
        <Animated.View style={[styles.ring, styles.ring2, { transform: [{ rotate: rotate2 }] }]} />
        <Animated.View style={[styles.ring, styles.ring3, { transform: [{ rotate: rotate3 }] }]} />
        <Text style={styles.icon}>📡</Text>
      </View>
      <Text style={styles.text}>Scanning opportunities...</Text>
      <View style={styles.dotsRow}>
        <Animated.View style={[styles.dot, { opacity: dot1 }]} />
        <Animated.View style={[styles.dot, { opacity: dot2 }]} />
        <Animated.View style={[styles.dot, { opacity: dot3 }]} />
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 80 },
  spinnerWrap: { width: 80, height: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  ring: { position: 'absolute', borderRadius: 50, borderWidth: 2, borderStyle: 'dashed' },
  ring1: { width: 80, height: 80, borderColor: '#6366f1' },
  ring2: { width: 60, height: 60, borderColor: '#a78bfa' },
  ring3: { width: 40, height: 40, borderColor: '#06b6d4' },
  icon: { fontSize: 20 },
  text: { color: '#94a3b8', fontSize: 14, marginBottom: 12 },
  dotsRow: { flexDirection: 'row', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#6366f1' },
});

export default LoadingSpinner;
