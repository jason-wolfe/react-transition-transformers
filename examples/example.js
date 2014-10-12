/** @jsx React.DOM */

var React = require('react');
var PieChart = require("./PieChart");
var Transformers = require("../");

var Demo = React.createClass({
  getInitialState: function() {
    return {data:this.uniformData()}
  },
  randomData: function() {
    var data = [];
    for (var i = 0; i < this.props.numSlices; i++) {
      data.push(Math.random());
    }
    return data;
  },
  randomizeData: function() {
    this.setState({data:this.randomData()});
  },
  uniformData: function() {
    var data = [];
    for (var i = 0; i < this.props.numSlices; i++) {
      data.push(1.0);
    }
    return data;
  },
  uniformizeData: function() {
    this.setState({data:this.uniformData()});
  },
  render: function() {
    var data = this.state.data.map(function(v,i) {
      return {value: v, color: this.props.colors[i % colors.length]};
    }.bind(this));
    var InertialPieChart = Transformers.inertial(PieChart, {data:[{value:'number'}]}, 750, {fps: 60, easeFn: Transformers.easing.easeOutElastic});
    return (
      <div>
        <svg height="250" width="250">
          <g transform="scale(245)">
            <InertialPieChart data={data}/>
          </g>
        </svg>
        <svg height="250" width="250">
          <g transform="scale(245)">
            <PieChart data={data}/>
          </g>
        </svg>
        <button onClick={this.uniformizeData}>Uniformize</button>
        <button onClick={this.randomizeData}>Randomize</button>
      </div>
    );
  }
});

var colors = ["hsl(207,100%,40%)", "hsl(24,100%,50%)", "hsl(162,100%,40%)", "hsl(360,100%,20%)", "hsl(335,100%,60%)", "hsl(69,100%,20%)", "hsl(266,100%,20%)", "hsl(107,100%,60%)", "hsl(251,100%,60%)", "hsl(293,100%,41%)"];

React.renderComponent(<Demo colors={colors} numSlices={8}/>, document.getElementById('ex1'));
