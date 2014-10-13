/** @jsx React.DOM */
var React = require('react');
var transformers = require('../');

var App = React.createClass({
  getInitialState: function() {
    return {x: 0, y: 0};
  },
  handleClick: function(event) {
    var x = event.pageX - this.refs.div.getDOMNode().offsetLeft;
    var y = event.pageY - this.refs.div.getDOMNode().offsetTop;
    this.setState({x:x,y:y});
  },
  render: function() {
    var InertialSpan = transformers.inertial(React.DOM.span, {style:{top:'number',left:'number'}}, 1000);
    var style = {top:this.state.y,left:this.state.x,position:'absolute'};
    return (
      <div ref='div' style={{border:'1px solid black',width:'400px',height:'400px',position:'relative'}} onClick={this.handleClick}>
        <InertialSpan style={style}>o</InertialSpan>
        <span style={style}>x</span>
      </div>
    );
  }
});

React.renderComponent(<App/>, document.getElementById('click'));
