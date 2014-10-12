// Easing functions
var easing = require('./src/easing');

// Component transformers
var inertial = require('./src/inertial');
var interpolation = require('./src/interpolation');
var transition = require('./src/transition');
var interpolate = require('./src/interpolate');
var easeFocused = require('./src/easeFocused');
var easedToggle = require('./src/easedToggle');

module.exports = {
  easeFocused: easeFocused,
  easedToggle: easedToggle,
  interpolate: interpolate,
  easing: easing,
  inertial: inertial,
  interpolation: interpolation,
  transition: transition
}
