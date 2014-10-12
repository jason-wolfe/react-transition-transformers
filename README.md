# [React](http://facebook.github.io/react) Transition Transformers

([Live Demo](https://rawgit.com/jason-wolfe/react-transition-transformers/master/examples/index.html))

## General

This is a very experimental package which provides component transformers that take a component and some other properties and yield a new component with transformed behavior.

## API

Example usage:

```js
var transformers = require('react-transition-transformers'); // Note: this isn't actually published on npm as I have no idea what I'm doing on that front.
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

Another example ([Live Demo](https://rawgit.com/jason-wolfe/react-transition-transformers/master/examples/index.html)) in the [examples/](examples/) folder demonstrates making a pie chart that does not know how to animate itself animated, simply by using a transformer to animate the data. The key part is this:

```js
  var InertialPieChart = transformers.inertial(PieChart, {data:[{value:'number'}]}, 750, {easeFn: transformers.easing.easeOutElastic});

  [...]

  return (
    <div>
      [...]
      <InertialPieChart data={data}/>
      [...]
    </div>
  );
```

Everything is pretty unstable and in a state of flux. The `inertial` transformer is the most mature of them all.

## Similar work

It looks like [@pirelenito](https://github.com/pirelenito) and I independently converged on similar component implementations (see: [react-transition](https://github.com/pirelenito/react-transition)). The main improvement here as far as I can tell is making a more developer-friendly API.

[@chenglou](https://github.com/chenglou) approaches things from a different angle, encapsulating the animation state in a mixin and giving more verbose but finer-grained control (see: [react-tween-state](https://github.com/chenglou/react-tween-state));
