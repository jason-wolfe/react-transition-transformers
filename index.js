// Components
var EaseFocused = require('./src/EaseFocused');
var EasedToggle = require('./src/EasedToggle');
var Interpolate = require('./src/Interpolate');

// Easing functions
var easing = require('./src/easing');

// Component transformers
var inertial = require('./src/inertial');
var interpolation = require('./src/interpolation');
var transition = require('./src/transition');

module.exports = {
  EaseFocused: EaseFocused,
  EasedToggle: EasedToggle,
  Interpolate: Interpolate,
  easing: easing,
  inertial: inertial,
  interpolation: interpolation,
  transition: transition
}
