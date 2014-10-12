# [React](http://facebook.github.io/react) Transition Transformers

## General

This is a very experimental package which provides component transformers that take a component and some other properties and yield a new component with transformed behavior.

## API

Example usage:

```js
var transformers = require('react-transition-transformers');
var React = require('react');

var PrintX = React.createClass({
  render: function() {
    return <div>{this.props.x}</div>;
  }
});

var App = React.createClass({
  getInitialState: function() {
    return {on: 0};
  },
  turnOn: function() {
    this.setState({on:1});
  },
  turnOff: function() {
    this.setState({on:0});
  },
  render: function() {
    var SmoothPrintX = transformers.inertial(PrintX, {x:'number'}, 1000);
    return (
      <div>
        <SmoothPrintX x={this.state.on ? 100 : 0}/>
        <button onClick={this.turnOn}>On</button>
        <button onClick={this.turnOff}>Off</button>
      </div>
    );
  }
});
```

This yields a component displaying a value that can be transitioned between the values 0 and 100 by clicking the on or off buttons. When going up or down, 1 full second will elapse between when the button is clicked and when it reaches its destination value. An important caveat resulting from this is that it suffers from the ickiness of non-additive animations: if the value starts at 0, and you click 'On' and then immediately click 'Off', it will spend a full second transitioning from however far it had gotten back down to zero. This can be fixed by either providing a constant slope or by using a special purpose transformer when this behavior is not desired.

Another example in the [examples/](examples/) folder demonstrates making a pie chart that does not know how to animate itself animated, simply by using a transformer to animate the data.
