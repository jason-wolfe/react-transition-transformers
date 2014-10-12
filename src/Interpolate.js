/** @jsx React.DOM */

var React = require('react');
var interpolation = require('./interpolation');
var easing = require('./easing');

var Interpolate = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  interpolate: function(start, end, fraction) {
    var fn = this.props.easeFn || easing.linear;
    var change = end - start;
    return fn(fraction, start, change, 1.0);
  },
  render: function() {
    var props = Object.create(this.props.props);
    var other = interpolation.interpolate(this.interpolate, this.props._spec, this.props.start, this.props.end, this.props.fraction);
    for (var k in other) {
      if (other.hasOwnProperty(k)) {
        props[k] = other[k];
      }
    }
    return this.props.component(props, this.props.children);
  }
});

module.exports = Interpolate;
