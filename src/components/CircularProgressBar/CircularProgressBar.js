import React from 'react';
import './CircularProgressBar.css';

class CircularProgressBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        size: 55,
        value: 0,
        strokewidth: 3
      };
    }
  
    render() {
      
      const average = this.props.percentage ;
      const halfsize = this.state.size * 0.5;
      const radius = halfsize - this.state.strokewidth * 0.5;
      const circumference = 2 * Math.PI * radius;
      const strokeval = (average * circumference) / 100;
      const dashval = strokeval + " " + circumference;
  
      const trackstyle = { strokeWidth: this.state.strokewidth };
      const indicatorstyle = {
        strokeWidth: this.state.strokewidth,
        strokeDasharray: dashval
      };
      const rotateval = "rotate(-90 " + halfsize + "," + halfsize + ")";
  
      return (                  
        <svg
            width={63}
            height={63}
            >     
            <circle
              r={radius}
              cx={halfsize-2.5}
              cy={halfsize+3}
              transform={rotateval}
              style={trackstyle}
              className="circle-background"
            />
            <circle
              r={radius}
              cx={halfsize-2.5}
              cy={halfsize+3}
              transform={rotateval}
              style={indicatorstyle}
              className="circle-progress"
            />
            <text
              className="circle-text"
              x="46%"
              y="53%"
              dy=".3em"
              textAnchor="middle"
              style={{fontSize:'28px'}}
              >
              {this.props.percentage} 
            </text>
            <text
              className="circle-text-percent"
              x="76%"
              y="48%"
              textAnchor="middle"
              style={{fontSize:'10px'}}
              >
              %
            </text>
          
        </svg>
      );
    }
  }
 

  export default CircularProgressBar