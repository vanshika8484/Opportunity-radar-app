import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

var COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#ec4899', '#10b981'];
var NUM_PARTICLES = 30;
var { width, height } = Dimensions.get('window');

function Particle() {
  var x = useRef(new Animated.Value(Math.random() * width)).current;
  var y = useRef(new Animated.Value(Math.random() * height)).current;
  var opacity = useRef(new Animated.Value(Math.random() * 0.4 + 0.1)).current;
  var color = COLORS[Math.floor(Math.random() * COLORS.length)];
  var size = Math.random() * 3 + 1;

  useEffect(function() {
    function animateParticle() {
      var newX = Math.random() * width;
      var newY = Math.random() * height;
      Animated.parallel([
        Animated.timing(x, { toValue: newX, duration: 8000 + Math.random() * 6000, useNativeDriver: false }),
        Animated.timing(y, { toValue: newY, duration: 8000 + Math.random() * 6000, useNativeDriver: false }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: Math.random() * 0.5 + 0.1, duration: 3000, useNativeDriver: false }),
          Animated.timing(opacity, { toValue: Math.random() * 0.2 + 0.05, duration: 3000, useNativeDriver: false }),
        ])
      ]).start(animateParticle);
    }
    animateParticle();
  }, []);

  return (
    <Animated.View style={[styles.particle, { width: size, height: size, borderRadius: size / 2, backgroundColor: color, opacity, left: x, top: y }]} />
  );
}

function ParticleBackground() {
  var particles = Array.from({ length: NUM_PARTICLES }, function(_, i) { return i; });
  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map(function(i) { return <Particle key={i} />; })}
    </View>
  );
}

var styles = StyleSheet.create({
  container: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 },
  particle: { position: 'absolute' },
});

export default ParticleBackground;
