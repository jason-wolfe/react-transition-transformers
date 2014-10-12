/** @jsx React.DOM */

var React = require('react');
var EasedToggle = require('./EasedToggle');

var EaseFocused = React.createClass({
  handleMouseEnter: function() {
    this.setState({on:true});
  },
  handleMouseExit: function() {
    this.setState({on:false});
  },
  getInitialState: function() {
    return {on:false};
  },
  render: function() {
    var wrapper = this.props.container || React.DOM.div;
    return (
      wrapper({onMouseEnter:this.handleMouseEnter, onMouseLeave:this.handleMouseExit},
        <EasedToggle on={this.state.on} _spec={this.props._spec} component={this.props.component} duration={this.props.duration} props={this.props.props} start={this.props.start} end={this.props.end}/>
    ));
  },
});

module.exports = EaseFocused;
