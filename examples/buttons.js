/** @jsx React.DOM */

var transformers = require('../');
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

React.renderComponent(<App/>, document.getElementById('buttons'));
