import { LayoutMap } from './const';
import { Graph, GraphData } from '@antv/g6';
import { ILayoutOption } from './typing';

export const cropGraphByNodes = (graphData: GraphData, targetNodes: { id: string }[]) => {
  const { edges, nodes } = graphData;
  const ids = targetNodes.map(node => node.id);
  const newEdges = edges!.filter(edge => {
    const { source, target } = edge;
    if (ids.indexOf(source!) !== -1 && ids.indexOf(target!) !== -1) {
      return true;
    }
    return false;
  });
  const newNodes = nodes!.filter(node => {
    return ids.indexOf(node.id) !== -1;
  });
  return {
    nodes: newNodes,
    edges: newEdges,
  };
};

export const getLayoutsByOptions = (
  layouts: ILayoutOption[],
  graph: Graph,
  gap: number,
  direction: 'vertical' | 'horizontal',
) => {
  const count = layouts.length;
  const source = graph.save();

  const width = graph.get('width') / count;
  const height = graph.get('height') / count;

  layouts
    //过滤掉节点为空的布局
    .filter(lay => {
      return lay.nodes.length !== 0;
    })
    .forEach((layout, index) => {
      const { type, options, nodes } = layout;

      let center: [number, number];
      if (direction === 'horizontal') {
        center = [gap / 2 + index * gap, height / 2];
      } else {
        center = [width / 2, gap + index * gap];
      }

      console.log('center:', center);

      const layoutOptions = {
        width,
        height,
        center,
        ...options,
      };
      const instance = new LayoutMap[type](layoutOptions);
      const newGraphData = cropGraphByNodes(source, nodes);
      instance.layout(newGraphData);
    });

  graph.positionsAnimate();
};