/** @jsx React.DOM */

var React = require('react');
var PureRenderMixin = require('react/addons').PureRenderMixin;

var Slice = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
      var startAngle = this.props.startAngle;
      var endAngle = this.props.endAngle;
      var r = 0.5;
      var startX = r + r * Math.sin(startAngle);
      var startY = r - r * Math.cos(startAngle);
      var endX = r + r * Math.sin(endAngle);
      var endY = r - r * Math.cos(endAngle);
      var majorArc = endAngle - startAngle > Math.PI;
      var descriptor =  "M " + startX + " " + startY;
      descriptor += "\nA " + r + " " + r + " 0 " + (majorArc ? "1" : "0") + " 1 " + endX + " " + endY;
      descriptor += "\nL " + r + " " + r;
      descriptor += "\nZ";
      return this.transferPropsTo(<path d={descriptor}/>);
  }
});

var PieChart = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
      var slices = [];
      var valueSum = 0;
      for (var i = 0; i < this.props.data.length; i++) {
          var v = this.props.data[i].value;
          valueSum += v > 0 ? v : 0;
      }
      var runningSum = 0;
      for (var i = 0; i < this.props.data.length; i++) {
          var datum = this.props.data[i];
          if (datum.value < 0) {
            continue;
          }
          var startAngle = 2 * Math.PI * (runningSum / valueSum);
          runningSum += datum.value;
          var endAngle = 2 * Math.PI * (runningSum / valueSum);
          var slice = <Slice startAngle={startAngle} 
                             endAngle={endAngle} 
                             fill={datum.color || 'white'}
                             stroke="black"
                             strokeWidth={0.001}
                             key={i}
                             />
          slices.push(slice);
      }
      return <g>{slices}</g>;
  }
});

module.exports = PieChart;
