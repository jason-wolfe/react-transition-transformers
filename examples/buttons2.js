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
    var SmoothPrintX = transformers.easedToggle(PrintX, {x:'number'}, 1000, {x:0}, {x:100});
    return (
      <div>
        <SmoothPrintX on={this.state.on}/>
        <button onClick={this.turnOn}>On</button>
        <button onClick={this.turnOff}>Off</button>
      </div>
    );
  }
});

React.renderComponent(<App/>, document.getElementById('buttons2'));
