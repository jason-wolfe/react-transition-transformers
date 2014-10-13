/** @jsx React.DOM */

var React = require('react');

var transformerUtil = require('./transformerUtil')
var interpolate = require('./interpolate');

var Transition = React.createClass({
  componentDidMount: function() {
    this.startTime = Date.now();
    this.interval = setInterval(this.tick, 1000 / (this.props._transitionProps.fps || 30));
  },
  componentWillUnmount: function() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  },
  getInitialState: function() {
    return {fraction: 0};
  },
  tick: function() {
    var time = Date.now();
    var fraction = (time - this.startTime) / this.props._transitionProps.duration;
    if (fraction >= 1) {
      this.setState({fraction:1});
      clearInterval(this.interval);
      delete this.interval;
    } else {
      this.setState({fraction:fraction});
    }
  },
  render: function() {
    var p = this.props._transitionProps;
    var Interpolated = interpolate(p.component, p.spec, p.start, p.end);
    var props = Object.create(this.props.props || {});
    props.fraction = this.state.fraction;
    return Interpolated(props, this.props.children);
  }
});

var transition = function(component, spec, duration, start, end, opts) {
  return function(props, children) {
    transformerUtil.warnKey(props, '_transitionProps', 'transition call', component.displayName);
    var newProps = {_transitionProps: {component:component, spec:spec, duration:duration, start:start, end:end, easeFn: opts && opts.easeFn, fps: opts && opts.fps}, props: props};
    transformerUtil.addKeyIfPresent(newProps, props);
    return Transition(newProps, children);
  };
}

module.exports = transition;
