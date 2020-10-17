import React, { useEffect } from 'react';
import G6 from '@antv/g6';

const Graph = (props) => {
  // const ref = React.useRef(null)
  let graph = null

  const dataOrEmpty = () => {
    if (Object.keys(props.data).length === 0) {
      return { nodes: [], edges: [] }
    } else {
      return props.data.json
    }
  }

  const graphData = dataOrEmpty();

  const nodeHistogram = function(graph) {
    const counts = {};
    const edges = graph.edges.flatMap(edge => [edge.source, edge.target]).sort()

    for (var i = 0; i < edges.length; i++) {
      var id = edges[i];
      counts[id] = counts[id] ? counts[id] + 1 : 1;
    }
    return counts;
  }

  const edgeCounts = nodeHistogram(graphData);

  const isLeaf = (node) => {
    return edgeCounts[node.id] === 1;
  }

  // Remove end arrow if reciprocal (undirected)
  const edgeStyle = (edge) => {
    if (edge.reciprocal) {
      const tempStyle = {...graph.cfg.defaultEdge.style}
      delete tempStyle.endArrow
      return tempStyle
    } else {
      return graph.cfg.defaultEdge.style
    }
  }

  const bindEvents = () => {
    function refreshDragedNodePosition(e) {
      const model = e.item.get('model');
      model.fx = e.x;
      model.fy = e.y;
    }
    graph.on('node:dragstart', function (e) {
      graph.layout();
      refreshDragedNodePosition(e);
    });
    graph.on('node:drag', function (e) {
      refreshDragedNodePosition(e);
    });
    graph.on('node:dragend', function (e) {
      e.item.get('model').fx = null;
      e.item.get('model').fy = null;
    });
  }

  useEffect(() => {

    const graphMount = document.getElementById('graphMountNode')
    if (graphMount) {
      const canvases = graphMount.getElementsByTagName('canvas')
      for (let canvas of canvases) { canvas.remove() };
    }

    if(!graph) {
      graph = new G6.Graph({
        container: 'graphMountNode',
        width: 800,
        height: 500,
        // modes: {
        //   default: ['drag-canvas', 'name']
        // },
        defaultNode: {
          color: '#5B8FF9',
          style: {
            lineWidth: 2,
            fill: '#C6E5FF',
          },
        },
        defaultEdge: {
          size: 1,
          color: '#e2e2e2',
          labelCfg: {
            autoRotate: true,
            style: {
              stroke: '#fff',
              lineWidth: 5,
              fontSize: 12,
            },
          },
          style: {
            endArrow: {
              path: 'M 0,0 L 8,4 L 8,-4 Z',
              fill: '#e2e2e2',
            },
          },
        },
        layout: {
          type: 'force',
          preventOverlap: true,
          linkDistance: (edge) => { return 100; },
          nodeStrength: (node) => { return node.isLeaf ? -50 : -10; },
          edgeStrength: (edge) => { return 0.5; },
        },
      })
    }

    const nodes = graphData.nodes.map(function (node, i) {
      const firstAttrKey = Object.keys(node.attributes)[0]
      node.label = node.attributes[firstAttrKey];
      node.isLeaf = isLeaf(node);
      node.size = 30 + edgeCounts[node.id];
      return Object.assign({}, node);
    });

    const edges = graphData.edges.map(function (edge, i) {
      edge.id = 'e' + i;
      edge.style = edgeStyle(edge);
      return Object.assign({}, edge);
    })

    const inData = { nodes: nodes, edges: edges }

    graph.data(inData);

    graph.render();

    bindEvents();
  }) //, []) <- remove first paren and uncomment to run only once

  return (
    <div id="graphMountNode"></div>
  );
}

export default Graph;