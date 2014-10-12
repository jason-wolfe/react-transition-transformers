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
    var Interpolated = transformers.interpolate(PrintX, {x:'number'}, {x:0}, {x:100});
    return (
      <div>
        <Interpolated fraction={0.754321}/>
      </div>
    );
  }
});

React.renderComponent(<App/>, document.getElementById('interpolate'));
