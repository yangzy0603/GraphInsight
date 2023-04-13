import { Icon, useContext } from '@antv/gi-sdk';
import * as React from 'react';
import './index.less';
import SegmentedTabs from './SegmentedTabs';
import useComponents from './useComponents';

export interface UadLayoutProps {
  topItems: any[];
  sideItems: any[];
  tabPosition: 'left' | 'right' | 'top' | 'bottom';
  height: number;
  padding: string;
  containers: any[];
}

const SegmentedLayout: React.FunctionComponent<UadLayoutProps> = props => {
  const { children } = props;
  const context = useContext();

  const { containers } = props;
  const { config, assets } = context;

  const ComponentCfgMap = config.components.reduce((acc, curr) => {
    return {
      ...acc,
      [curr.id]: curr,
    };
  }, {});

  const { GI_CONTAINER: sideItems = [] } = containers[0] || {};

  const SideContent = useComponents(sideItems, ComponentCfgMap, assets.components);
  const items = SideContent.map((item: any) => {
    return {
      icon: <Icon type={item.icon} />,
      key: item.id,
      children: item.children,
    };
  });

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <div
        style={{
          width: '360px',
          flexBasis: '360px',
          marginRight: '12px',
          background: 'var(--background-color-transparent)',
          borderRadius: '8px',
        }}
      >
        <SegmentedTabs items={items} />
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
};

export default SegmentedLayout;
