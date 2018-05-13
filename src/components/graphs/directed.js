import {ReactCytoscape} from 'react-cytoscape';
import React, { Component } from 'react';

const style = {
  position: 'relative',
  width: '100%', // todo use props.width
  height: '340px', // todo use props.height
  backgroundColor: '#073369'
};

const isStyle = [
  {
    "selector" : "node",
    "css" : {
      "shape": "diamond",
      "transform": "rotate(15deg)",
      "background-color" : "#b7c3d9",
      "border-style": "solid",
      "height": "30px",
      "width": "30px",
      "border-width": "3px",
      "border-color": "#e1e6ef",
      "color": "#777",
      "content" : "data(id)",
    }
  },
  {
    "selector": 'edge',
    "css": {
      "color": "#b7c3d9",
      "width": "2",
//      "curve-style": "bezier",
      //'curve-style': 'unbundled-bezier',
      //'control-point-step-size': '25px', // distance between successive bezier edges.
      //'control-point-weight': '0.5', // '0': curve towards source node, '1': towards target node.
      /*
      'curve-style': 'unbundled-bezier',
      'control-point-distance': '20px',
      'control-point-weight': '0.7', // '0': curve towards source node, '1': towards target node.
      'line-color': 'gray',
      'line-style': 'solid',
      'target-arrow-shape': 'triangle',
      'target-arrow-color': 'gray',
      'display': 'element'

      "curve-style": 'unbundled-bezier',
      'control-point-distances': '20 -20',
      'control-point-weights': '0.25 0.75'
      */
    }
  }
];

export default class Directed extends Component {
  constructor(props) {
    super(props);

    this.getElements = this.getElements.bind(this);
    this.cyRef = this.cyRef.bind(this);
  }

  cyRef(cy) {
    this.cy = cy;
    cy.on('tap', 'node', function (evt) {
      var node = evt.target;
      console.log('tapped ' + node.id());
    });
  }

  getElements() {
    return {
      nodes: [
        { data: {id: 'a' } },
        { data: {id: 'b1' } },
        { data: {id: 'b2' } },
        { data: {id: 'b3' } },
        { data: {id: 'c1' } },
        { data: {id: 'c2' } }
        /*
        { data: { id: 'a' }, position: { x: 215, y: 85 } },
        { data: { id: 'b' } },
        { data: { id: 'c' }, position: { x: 300, y: 85 } },
        { data: { id: 'd' }, position: { x: 215, y: 175 } },
        { data: { id: 'e' } },
        { data: { id: 'f' }, position: { x: 300, y: 175 } }
        */
      ],
      edges: [
        { data: { id: 'e1', source: 'a', target: 'b1' } },
        { data: { id: 'e2', source: 'a', target: 'b3' } },
        { data: { id: 'e3', source: 'b1', target: 'b2' } },
        { data: { id: 'e4', source: 'b2', target: 'c1' } },
        { data: { id: 'e5', source: 'b2', target: 'b3' } },
        { data: { id: 'e6', source: 'b3', target: 'c2' } }
      ]
    };
  }

  render() {
    if(this.cy){
      this.cy.resize();
      this.cy.fit();
    }
    return (
      <div style={style}>
        <ReactCytoscape containerID="cy"
          elements={this.getElements()}
          style={isStyle}
          cyRef={(cy) => { this.cyRef(cy) }}
          layout={{name: 'dagre', 'rankDir': 'TB'}}/>
      </div>
    );
  }
}




