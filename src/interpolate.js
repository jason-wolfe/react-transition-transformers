/** @jsx React.DOM */

var React = require('react');
var merge = require('react/lib/merge');
var interpolation = require('./interpolation');
var easing = require('./easing');
var transformerUtil = require('./transformerUtil');

var Interpolate = React.createClass({
  interpolate: function(start, end, fraction) {
    var fn = this.props.easeFn || easing.linear;
    var change = end - start;
    return fn(fraction, start, change, 1.0);
  },
  render: function() {
    var props = merge(this.props.props);
    delete props._interpolateProps;
    var p = this.props._interpolateProps;
    var other = interpolation.interpolate(this.interpolate, p.spec, p.start, p.end, props.fraction);
    for (var k in other) {
      if (other.hasOwnProperty(k)) {
        props[k] = other[k];
      }
    }
    return p.component(props);
  }
});

function interpolate(component, spec, start, end, opts) {
  return function(props, children) {
    transformerUtil.warnKey(props, '_interpolateProps', 'interpolate call', component.displayName);
    var newProps = {_interpolateProps: {component:component, spec:spec, start:start, end:end, easeFn: opts && opts.easeFn, fps: opts && opts.fps}, props:props};
    transformerUtil.addKeyIfPresent(newProps, props);
    return Interpolate(newProps, children);
  };
}

module.exports = interpolate;
