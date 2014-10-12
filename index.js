// Components
var EaseFocused = require('./src/EaseFocused');
var easedToggle = require('./src/easedToggle');

// Easing functions
var easing = require('./src/easing');

// Component transformers
var inertial = require('./src/inertial');
var interpolation = require('./src/interpolation');
var transition = require('./src/transition');
var interpolate = require('./src/interpolate');

module.exports = {
  EaseFocused: EaseFocused,
  easedToggle: easedToggle,
  interpolate: interpolate,
  easing: easing,
  inertial: inertial,
  interpolation: interpolation,
  transition: transition
}
