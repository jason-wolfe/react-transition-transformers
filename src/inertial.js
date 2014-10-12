/** @jsx React.DOM */

var React = require('react');
var merge = require('react/lib/merge');

var transformerUtil = require('./transformerUtil');
var interpolation = require('./interpolation');
var easing = require('./easing');

var Inertia = React.createClass({
  componentWillReceiveProps: function(nextProps) {
    if (interpolation.anyChanged(this.props._inertialProps.spec, this.props, nextProps)) {
      var time = Date.now();
      if (!this.interval) {
        this.interval = setInterval(this.tick, 1000 / (this.props.fps || 30));
      }
      this.setState({startTime:time,fraction:0,startValues:this.getProps()});
    }
  },
  getProps: function() {
    if (!this.state.startTime) {
      return this.props;
    } else {
      var fraction = this.state.fraction;
      return interpolation.interpolate(this.interpolate, this.props._inertialProps.spec, this.state.startValues, this.props, fraction);
    }
  },
  getInitialState: function() {
    return {startValues:null,startTime:null,fraction:0};
  },
  tick: function() {
    var time = Date.now();
    var fraction = (time - this.state.startTime) / this.props._inertialProps.duration;
    if (fraction >= 1) {
      clearInterval(this.interval);
      this.interval = null;
      this.setState({fraction:1.0});
    } else {
      this.setState({fraction:fraction});
    }
  },
  clearInterval: function() {
    if (this.interval) {
      clearInterval(this.interval);
      delete this.interval;
    }
  },
  interpolate: function(start, end, fraction) {
    var fn = this.props._inertialProps.easeFn || easing.linear;
    var change = end - start;
    return fn(fraction, start, change, 1.0);
  },
  render: function() {
    return this.props._inertialProps.component(this.getProps(), this.props.children);
  },
});

var inertial = function(component, spec, duration, opts) {
  return function(props, children) {
    transformerUtil.warnKey(props, '_inertialProps', 'inertial call', component.displayName);
    var newProps = merge({_inertialProps: {component:component, spec:spec, duration:duration, easeFn: opts && opts.easeFn, fps: opts && opts.fps}, children: children}, props);
    transformerUtil.addKeyIfPresent(newProps, props);
    return Inertia(newProps, children);
  };
}

module.exports = inertial;
