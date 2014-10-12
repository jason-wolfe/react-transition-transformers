/** @jsx React.DOM */

var React = require('react');
var easedToggle = require('./easedToggle');

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
    var p = this.props._easeFocusedProps;
    var Toggleable = easedToggle(p.component, p.spec, p.duration, p.start, p.end);
    var props = {
      on: this.state.on,
      props: this.props.props
    };
    return (
      wrapper(
        {onMouseEnter:this.handleMouseEnter, onMouseLeave:this.handleMouseExit},
        Toggleable(props, this.props.children)
      )
    );
  }
});

function easeFocused(component, spec, duration, start, end) {
  return function(props, children) {
    if ('_easeFocusedProps' in props) {
      console.warn('key "' + '_easeFocusedProps' + '" (=' + props._easeFocusedProps + ') present in easeFocused call will be ignored and not passed to ' + component.displayName);
    }
    var newProps = {_easeFocusedProps: {component:component, spec:spec, duration:duration, easeFn: opts && opts.easeFn, fps: opts && opts.fps}, props: props};
    return EaseFocused(newProps, children);
  };
}

module.exports = easeFocused;
