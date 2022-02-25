import { Toolbar } from '@antv/graphin-components';
import * as React from 'react';
import { getPositionStyles } from '../WrapContainer';

type direction = 'vertical' | 'horizontal';
export interface ToolbarProps {
  direction?: direction;
  components?: any;
  assets?: any;
  placement: string;
  offset: number[];
}

const ToolbarA: React.FunctionComponent<ToolbarProps> = props => {
  const { direction = 'horizontal', components, assets, placement, offset } = props;
  const positionStyles = getPositionStyles(placement, offset);

  const sortedComponents = components.sort((a, b) => a.props?.GI_CONTAINER_INDEX - b.props?.GI_CONTAINER_INDEX);
  return (
    <>
      <Toolbar direction={direction} style={positionStyles}>
        {sortedComponents.map(item => {
          if (!item) {
            return null;
          }
          const { props, id } = item;
          const { component: Component } = assets[id];
          return (
            <span key={id}>
              <Component {...props} />
            </span>
          );
        })}
      </Toolbar>
    </>
  );
};

export default ToolbarA;