/** @jsx React.DOM */

var React = require('react');

var interpolate = require('./interpolate');
var transition = require('./transition');
var transformerUtil = require('./transformerUtil');

var EasedToggle = React.createClass({
  componentDidMount: function() {
    this.setState({startTime:Date.now()});
  },
  getInitialState: function() {
    return {startFraction: 0, generation: 0};
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.props.on != this.props.props.on) {
      var time = Date.now();
      var elapsed = time - this.state.startTime
      var fraction;
      if (nextProps.props.on) {
        fraction = Math.max(this.state.startFraction - elapsed / this.props._easedToggleProps.duration, 0);
      } else {
        fraction = Math.min(this.state.startFraction + elapsed / this.props._easedToggleProps.duration, 1.0);
      }
      this.setState({startFraction:fraction, startTime:time, generation: this.state.generation+1});
    }
  },
  render: function() {
    var startFraction = this.state.startFraction;
    var endFraction = this.props.props.on ? 1.0 : 0.0;
    var p = this.props._easedToggleProps;
    var duration = p.duration * Math.abs(startFraction - endFraction);
    var Interpolator = interpolate(p.component, p.spec, p.start, p.end);
    var TransitioningInterpolator = transition(Interpolator, {fraction:'number'}, duration, {fraction:startFraction}, {fraction: endFraction});
    var props = Object.create(this.props.props);
    props.key = this.state.generation;
    return TransitioningInterpolator(props, this.props.children);
  },
});

var easedToggle = function(component, spec, duration, start, end, opts) {
  return function(props, children) {
    transformerUtil.warnKey(props, '_easedToggleProps', 'easedToggle call', component.displayName);
    var newProps = {_easedToggleProps: {component:component, spec:spec, duration:duration, start:start, end:end, easeFn: opts && opts.easeFn, fps: opts && opts.fps}, props:props};
    transformerUtil.addKeyIfPresent(newProps, props);
    return EasedToggle(newProps, children);
  };
}

module.exports = easedToggle;
