/** @jsx React.DOM */

var React = require('react');
var Interpolate = require('./Interpolate');

var Transition = React.createClass({
  componentDidMount: function() {
    this.startTime = Date.now();
    this.interval = setInterval(this.tick, 1000 / (this.props.fps || 30));
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
    return <Interpolate component={this.props._transitionProps.component} _spec={this.props._transitionProps.spec} fraction={this.state.fraction} props={this.props.props} children={this.props.children} start={this.props._transitionProps.start} end={this.props._transitionProps.end} />;
  }
});

var transition = function(component, spec, duration, start, end, opts) {
  return function(props, children) {
    if (props && '_transitionProps' in props) {
      console.warn('key "' + '_transitionProps' + '" (=' + props._transitionProps + ') present in inertial call will be ignored and not passed to ' + component.displayName);
    }
    var newProps = extend({_transitionProps: {component:component, spec:spec, duration:duration, start:start, end:end, easeFn: opts.easeFn, fps: opts.fps}}, {props: props}, props && 'key' in props ? {key:props.key} : {});
    return Transition(newProps, children);
  };
}

module.exports = transition;
