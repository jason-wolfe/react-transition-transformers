/** @jsx React.DOM */

var React = require('react');
var Interpolate = require('./Interpolate');
var transition = require('./transition');

var EasedToggle = React.createClass({
  componentDidMount: function() {
    this.setState({startTime:Date.now()});
  },
  getInitialState: function() {
    return {startFraction: 0, generation: 0};
  },
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.on != this.props.on) {
      var time = Date.now();
      var elapsed = time - this.state.startTime
      var fraction;
      if (nextProps.on) {
        fraction = Math.max(this.state.startFraction - elapsed / this.props.duration, 0);
      } else {
        fraction = Math.min(this.state.startFraction + elapsed / this.props.duration, 1.0);
      }
      this.setState({startFraction:fraction, startTime:time, generation: this.state.generation+1});
    }
  },
  render: function() {
    var startFraction = this.state.startFraction;
    var endFraction = this.props.on ? 1.0 : 0.0;
    var duration = this.props.duration * Math.abs(startFraction - endFraction);
    var Interpolator = transition(Interpolate, {fraction:'number'}, duration, {fraction:startFraction}, {fraction: endFraction});
    return (
        <Interpolator key={this.state.generation} component={this.props.component} _spec={this.props._spec} props={this.props.props} start={this.props.start} end={this.props.end} children={this.props.children}/>
    );
  },
});

module.exports = EasedToggle;
