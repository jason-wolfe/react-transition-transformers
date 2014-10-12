/** @jsx React.DOM */

var transformers = require('../');
var React = require('react');

var PrintX = React.createClass({
  render: function() {
    return <div>{this.props.x}</div>;
  }
});

var App = React.createClass({
  render: function() {
    var SmoothPrintX = transformers.transition(PrintX, {x:'number'}, 1000, {x:0}, {x:100});
    return (
      <div>
        <SmoothPrintX f='fake'/>
      </div>
    );
  }
});

React.renderComponent(<App/>, document.getElementById('transition'));
